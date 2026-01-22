import { 
  type ReactNode, 
  useState, 
  type FC, 
  useEffect, 
  useCallback, 
  useRef, 
  useMemo 
} from "react";
import type { NavigateFunction, Location } from "react-router-dom";
import { type AccessToken } from "./AuthTypes";
import { 
  useLoginUser, 
  useRefreshAuto, 
  useSignupUser, 
  useVerifyToken,
  useLogoutUser 
} from "../../hooks/api/useUserData";
import { 
  setAccessToken, 
  clearAccessToken,
  setRefreshTokenFunction,
  clearRefreshTokenFunction,
  setSessionExpiredCallback,
  clearSessionExpiredCallback
} from "../../utils/axios-utils";
import type { user } from "../../constants/auth";
import { AuthContext } from "./AuthContext";
import { type AuthContextType } from "./AuthTypes";
import { SessionExpiredModal } from "../../components/ui/modals/SessionExpiredModal";
import { ROUTES, isAuthPage } from "../../components/config/routes";

interface AuthProviderProps {
  children: ReactNode;
  navigate: NavigateFunction;
  location: Location;
}

export const AuthProvider: FC<AuthProviderProps> = ({ 
  children,
  navigate,
  location 
}) => {
  const [token, setToken] = useState<AccessToken | null>(null);
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const [returnPath, setReturnPath] = useState<string>(ROUTES.HOME);

  const hasInitialized = useRef(false);

  // --- API Hooks ---
  const { refetch: triggerRefresh, isFetching: isRefreshing } = useRefreshAuto(false);

  const { 
    data: verifyData, 
    isSuccess: isVerifySuccess, 
    isError: isVerifyError,
    isLoading: isVerifyingInitial 
  } = useVerifyToken({
    enabled: !hasInitialized.current,
    retry: false 
  });

  const loginMutation = useLoginUser();
  const signupMutation = useSignupUser();
  const logoutMutation = useLogoutUser();

  // --- Session Management ---
  const handleSessionExpired = useCallback(() => {
    if (!isAuthPage(location.pathname)) {
      setReturnPath(location.pathname);
    }
    setToken(null);
    setUser(null);
    clearAccessToken();
    setShowSessionExpiredModal(true);
  }, [location.pathname]);

  

  const handleRefreshToken = useCallback(async (): Promise<string> => {
    try {
      const { data } = await triggerRefresh();
      if (data?.token) {
        setToken(data.token);
        setAccessToken(data.token.token);
        return data.token.token;
      }
      throw new Error("Refresh failed");
    } catch (error) {
      handleSessionExpired();
      console.error(error)
      return "";
    }
  }, [triggerRefresh, handleSessionExpired]);

  // --- Effects ---

  // 1. Sync Callbacks with Axios Interceptors
  useEffect(() => {
    setRefreshTokenFunction(handleRefreshToken);
    setSessionExpiredCallback(handleSessionExpired);

    return () => {
      clearRefreshTokenFunction();
      clearSessionExpiredCallback();
    };
  }, [handleRefreshToken, handleSessionExpired]);

  // 2. Handle Initial Verification Load
  useEffect(() => {
    if (hasInitialized.current) return;

    if (isVerifySuccess) {
      if (verifyData?.token && verifyData?.user) {
        setToken(verifyData.token);
        setUser(verifyData.user);
        setAccessToken(verifyData.token.token);
      }
      setLoading(false);
      hasInitialized.current = true;
    } else if (isVerifyError) {
      clearAccessToken();
      setLoading(false);
      hasInitialized.current = true;
      if (!isAuthPage(location.pathname)) {
      navigate(ROUTES.LOGIN);
  }
    }
  }, [isVerifySuccess, isVerifyError, verifyData,navigate,location.pathname]);

  // 3. Proactive Token Refresh Timer
  useEffect(() => {
    if (!token?.expires_in) return;

    const refreshBuffer = 5 * 60 * 1000; // 5 mins
    const waitTime = (token.expires_in * 1000) - refreshBuffer;

    if (waitTime <= 0) return;

    const timer = setTimeout(() => {
      handleRefreshToken();
    }, waitTime);

    return () => clearTimeout(timer);
  }, [token, handleRefreshToken]);

  // --- Auth Actions ---

  // Update the function signature to accept redirectPath
const login = useCallback(async (email: string, password: string, redirectPath?: string) => {
  const response = await loginMutation.mutateAsync({ email, password });
  
  setToken(response.token);
  setUser(response.user);
  setAccessToken(response.token.token);
  
  const destination = redirectPath || (returnPath !== ROUTES.LOGIN ? returnPath : ROUTES.HOME);

  navigate(destination, { replace: true });
  
  // Reset the returnPath state so it doesn't affect future logins
  setReturnPath(ROUTES.HOME);
}, [loginMutation, navigate, returnPath]);

  const signup = useCallback(async (
    firstname: string,
    lastname: string,
    email: string, 
    password: string, 
    repeatPassword: string, 
    uuid: string
  ) => {
     const response =await signupMutation.mutateAsync({
      firstname, lastname, email, password, repeatPassword, uuid,
    });
    // If your backend is set up to require activation:
    navigate(ROUTES.ACTIVATION_LINK_SENT_TO_EMAIL, { 
        state: { message: response.message ,
        email:response.email           
        }
        
    });
  }, [signupMutation, navigate]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      setToken(null);
      setUser(null);
      clearAccessToken();
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [logoutMutation, navigate]);

  // --- Context Value & UI ---

  const contextValue: AuthContextType = useMemo(() => ({
    token,
    user,
    loading: loading ||(isVerifyingInitial && !hasInitialized.current),
    isSigningUp: signupMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isRefreshing,
    login,
    signup,
    logout
  }), [
        token, 
        user, 
        loading, 
        isVerifyingInitial, 
        signupMutation.isPending, loginMutation.isPending, 
        isRefreshing,
        login, 
        signup, 
        logout
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <SessionExpiredModal
        isOpen={showSessionExpiredModal}
        onClose={() => setShowSessionExpiredModal(false)}
        onRedirectToLogin={() => {
          setShowSessionExpiredModal(false);
          navigate(ROUTES.LOGIN, { 
           state: { 
              message: "Your session has expired. Please log in again.",
              returnTo: returnPath 
            },
            replace: true 
          });
        }}
      />
    </AuthContext.Provider>
  );
};