import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE = 'http://localhost/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store for access token
let accessToken: string | null = null;

// Queue for failed requests during token refresh
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

// Refresh token function reference (set by AuthProvider)
let refreshTokenFn: (() => Promise<string>) | null = null;

// Session expired callback
let onSessionExpired: (() => void) | null = null;

// Flag to track if refresh is in progress
let isRefreshingToken = false;

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Request Interceptor - Add token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Don't add token to auth endpoints
    const authEndpoints = ['/auth/login', '/auth/signup', '/auth/refresh'];
    const isAuthEndpoint = authEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );

    if (accessToken && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry auth endpoints
      if (originalRequest.url?.includes('/auth/')) {
        return Promise.reject(error);
      }

      // Check if we have a refresh function
      if (!refreshTokenFn) {
        console.error('Refresh token function not set');
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshingToken) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Update the request with new token
            if (accessToken) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshingToken = true;

      try {
        // Attempt to refresh the token using the provided function
        // This calls refreshMutation.mutateAsync() in AuthProvider
        const newToken = await refreshTokenFn();
        
        // Update the stored token
        accessToken = newToken;
        
        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Process queued requests with success
        processQueue(null);
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - both access and refresh tokens are expired
        processQueue(refreshError as Error);
        
        // Clear token
        accessToken = null;
        
        // Trigger session expired callback
        if (onSessionExpired) {
          onSessionExpired();
        }
        
        return Promise.reject(refreshError);
      } finally {
        // Always reset the flag
        isRefreshingToken = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper functions to manage token
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// Set the refresh token function (called by AuthProvider)
export const setRefreshTokenFunction = (fn: () => Promise<string>) => {
  refreshTokenFn = fn;
};

// Clear the refresh token function
export const clearRefreshTokenFunction = () => {
  refreshTokenFn = null;
};

// Set callback for session expiration
export const setSessionExpiredCallback = (callback: () => void) => {
  onSessionExpired = callback;
};

// Clear the session expired callback
export const clearSessionExpiredCallback = () => {
  onSessionExpired = null;
};

export default api;