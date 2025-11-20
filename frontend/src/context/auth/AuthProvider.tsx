import { type ReactNode,useState,type FC, useLayoutEffect} from "react";
import { type AccessToken } from "./AuthTypes";
import { useLoginUser, useRefreshAuto } from "../../hooks/api/useUserData";
import api from "../../hooks/api/axios-utils";
import type { user } from "../../constants/auth";
import { AuthContext } from "./AuthContext";
import { type AuthContextType } from "./AuthTypes";
import axios, { type InternalAxiosRequestConfig } from "axios";

// TypeScript Augmentation (must create the .d.ts file)

type ExtendedInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

export const AuthProvider:FC<{children:ReactNode}>=({children})=>{
  const [token,setToken]=useState<AccessToken | null>(null);
  const [user, setUser] = useState<user | null >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {mutate:mutateLogin}= useLoginUser({
    onSuccess:(data)=>{
      setToken(data.token);
      setUser(data.user);

    },
    onError:()=>{
      // Handle login error
    }
  })
  const logout=()=>{
    setToken(null);
    setUser(null);
    setLoading(false);
  } 

  const {mutateAsync:mutateRefreshAsync}=useRefreshAuto({
    onSuccess:(data)=>{
      setToken(data.token);
    },
    onError:()=>{
      setToken(null);
      setUser(null);
    }
  })

  useLayoutEffect(()=>{
    const authInterceptor = api.interceptors.request.use((config) => {
     const extendedConfig = config as ExtendedInternalAxiosRequestConfig;
     
     // Prevent adding token on a retry attempt AND if no token exists
     extendedConfig.headers.Authorization = 
        !extendedConfig._retry && token 
          ? `Bearer ${token.token}` 
          : extendedConfig.headers.Authorization;
      return config;
    });
    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  },[token]);

  useLayoutEffect(()=>{
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error)=>{
        const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;
        
        if (axios.isAxiosError(error) && error.response?.status === 401 && !originalRequest._retry) {
            
            originalRequest._retry = true;
            
            try {
                setLoading(true);
                const newTokens = await mutateRefreshAsync(token!);
                setLoading(false);
                originalRequest.headers.Authorization = `Bearer ${newTokens.token.token}`;
                return api(originalRequest); 
            } catch (refreshError) {
                setToken(null);
                setLoading(false);
                return Promise.reject(refreshError);
            }
        }
        
        // For all other errors (including 401s that have been retried)
        return Promise.reject(error);
    });
    return () =>{
      api.interceptors.response.eject(refreshInterceptor)
    };
  },[token, mutateRefreshAsync]) 

  return <AuthContext.Provider value={{token,user,loading,login:(email:string,password:string)=>mutateLogin({email,password}),logout} as AuthContextType}>
    {children}
  </AuthContext.Provider>
}