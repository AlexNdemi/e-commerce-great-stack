import { type ReactNode, useState, type FC, useLayoutEffect, useCallback } from "react";
import { type AccessToken } from "./AuthTypes";
import { useLoginUser, useRefreshAuto } from "../../hooks/api/useUserData";
import api from "../../hooks/api/axios-utils";
import type { user } from "../../constants/auth";
import { AuthContext } from "./AuthContext";
import { type AuthContextType } from "./AuthTypes";
import axios, { type InternalAxiosRequestConfig } from "axios";

type ExtendedInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<AccessToken | null>(null);
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { mutate: mutateLogin } = useLoginUser({
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      // Handle login error
    }
  });

  const login = useCallback((email: string, password: string) => {
    setLoading(true);
    mutateLogin({ email, password });
  }, [mutateLogin]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const { mutateAsync: mutateRefreshAsync } = useRefreshAuto({
    onSuccess: (data) => {
      setToken(data.token);
      setIsRefreshing(false);
    },
    onError: () => {
      setToken(null);
      setUser(null);
      setIsRefreshing(false);
    }
  });

  // Request interceptor to add token to headers
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config) => {
        const extendedConfig = config as ExtendedInternalAxiosRequestConfig;
        
        if (token && !extendedConfig._retry) {
          extendedConfig.headers.Authorization = `Bearer ${token.token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Response interceptor to handle token refresh
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;
        
        if (axios.isAxiosError(error) && 
            error.response?.status === 401 && 
            !originalRequest._retry &&
            token &&
            !isRefreshing) {
          
          originalRequest._retry = true;
          setIsRefreshing(true);
          
          try {
            const newTokens = await mutateRefreshAsync(token);
            originalRequest.headers.Authorization = `Bearer ${newTokens.token.token}`;
            return api(originalRequest);
          } catch (refreshError) {
            logout(); // Clear auth state on refresh failure
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token, mutateRefreshAsync, isRefreshing, logout]);

  const contextValue: AuthContextType = {
    token,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};