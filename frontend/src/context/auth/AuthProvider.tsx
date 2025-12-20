import { type ReactNode, useState, type FC, useEffect, useCallback, useRef } from "react";
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

  // Use ref to track if initialization has been attempted
  const hasInitialized = useRef(false);

  // Mutations
  const loginMutation = useLoginUser();
  const signupMutation = useSignupUser();
  const logoutMutation = useLogoutUser();
  const verifyTokenMutation = useVerifyToken();
  const refreshMutation = useRefreshAuto();

  // Handle session expiration
  const handleSessionExpired = useCallback(() => {
    // Save current path to return after login (except if already on auth pages)
    if (!isAuthPage(location.pathname)) {
      setReturnPath(location.pathname);
    }

    // Clear auth state
    setToken(null);
    setUser(null);
    clearAccessToken();

    // Show modal
    setShowSessionExpiredModal(true);
  }, [location.pathname]);

  // Redirect to login page
  const redirectToLogin = useCallback(() => {
    setShowSessionExpiredModal(false);
    
    // Navigate to login with return path as state
    navigate(ROUTES.LOGIN, { 
      state: { 
        from: returnPath,
        sessionExpired: true 
      },
      replace: true 
    });
  }, [navigate, returnPath]);

  // Close modal without redirecting
  const handleCloseModal = useCallback(() => {
    setShowSessionExpiredModal(false);
  }, []);

  // Create refresh token function that uses React Query mutation
  const handleRefreshToken = useCallback(async (): Promise<string> => {
      const response = await refreshMutation.mutateAsync();
      
      // Update local state
      setToken(response.token);
      setAccessToken(response.token.token);
      
      return response.token.token;
  }, [refreshMutation]);

  // Set up interceptors once on mount
  useEffect(() => {
    // Register callbacks with axios utils
    setRefreshTokenFunction(handleRefreshToken);
    setSessionExpiredCallback(handleSessionExpired);

    return () => {
      // Cleanup
      clearRefreshTokenFunction();
      clearSessionExpiredCallback();
    };
  }, [handleRefreshToken, handleSessionExpired]);

  // Initialize auth state on mount - ONLY ONCE
  // Initialize auth state on mount - ONLY ONCE
useEffect(() => {
  if (hasInitialized.current) {
    return;
  }

  hasInitialized.current = true;

  const initializeAuth = async () => {
    try {
      // Just call verify - it will use the refresh token cookie if no access token
      const response = await verifyTokenMutation.mutateAsync();
      
      setToken(response.token);
      setUser(response.user);
      setAccessToken(response.token.token);
    } catch (error) {
      // No valid session - this is normal on first visit
      console.log("No valid session found",error);
      clearAccessToken();
    } finally {
      setLoading(false);
    }
  };

  initializeAuth();
}, [verifyTokenMutation]); 

  // Auto-refresh token before it expires
  useEffect(() => {
    if (!token) return;

    // Calculate when to refresh (e.g., 5 minutes before expiry)
    const refreshBuffer = 5 * 60 * 1000; // 5 minutes in milliseconds
    const expiryTime = token.expires_in * 1000; // Convert to milliseconds
    const refreshTime = expiryTime - refreshBuffer;

    // Don't set timer if refresh time is negative or zero
    if (refreshTime <= 0) return;

    const timer = setTimeout(async () => {
      try {
        const response = await refreshMutation.mutateAsync();
        setToken(response.token);
        setAccessToken(response.token.token);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Session expired will be handled by axios interceptor
      }
    }, refreshTime);

    return () => clearTimeout(timer);
  }, [token, refreshMutation]);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      
      setToken(response.token);
      setUser(response.user);
      setAccessToken(response.token.token);

      // If there's a return path from session expiry, navigate there
      if (returnPath && returnPath !== ROUTES.HOME && returnPath !== ROUTES.LOGIN) {
        navigate(returnPath, { replace: true });
        setReturnPath(ROUTES.HOME);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, [loginMutation, navigate, returnPath]);

  const signup = useCallback(async (
    firstname:string,
    lastname:string,
    email: string,
    password: string,
    repeatPassword: string,
    uuid: string
  ): Promise<void> => {
    try {
      const response = await signupMutation.mutateAsync({
        firstname,
        lastname,
        email,
        password,
        repeatPassword,
        uuid,
      });
      
      setToken(response.token);
      setUser(response.user);
      setAccessToken(response.token.token);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }, [signupMutation]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Clear state regardless of API call success
      setToken(null);
      setUser(null);
      clearAccessToken();
      
      // Navigate to login
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [logoutMutation, navigate]);

  const contextValue: AuthContextType = {
    token,
    user,
    loading,
    isSigningUp: signupMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isRefreshing: refreshMutation.isPending,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <SessionExpiredModal
        isOpen={showSessionExpiredModal}
        onClose={handleCloseModal}
        onRedirectToLogin={redirectToLogin}
      />
    </AuthContext.Provider>
  );
};