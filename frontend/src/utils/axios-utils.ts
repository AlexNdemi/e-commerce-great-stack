import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


let accessToken: string | null = null;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];


let refreshTokenFn: (() => Promise<string>) | null = null;


let onSessionExpired: (() => void) | null = null;

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


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    
    if (error.response?.status === 401 && !originalRequest._retry) {
     
      if (originalRequest.url?.includes('/auth/')) {
        return Promise.reject(error);
      }

      if (!refreshTokenFn) {
        console.error('Refresh token function not set');
        return Promise.reject(error);
      }

      if (isRefreshingToken) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
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

        const newToken = await refreshTokenFn();
        
        accessToken = newToken;
        
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        
        processQueue(null);
        
        
        return api(originalRequest);
      } catch (refreshError) {
        
        processQueue(refreshError as Error);
        
        accessToken = null;
        
        if (onSessionExpired) {
          onSessionExpired();
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshingToken = false;
      }
    }

    return Promise.reject(error);
  }
);


export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};


export const setRefreshTokenFunction = (fn: () => Promise<string>) => {
  refreshTokenFn = fn;
};


export const clearRefreshTokenFunction = () => {
  refreshTokenFn = null;
};


export const setSessionExpiredCallback = (callback: () => void) => {
  onSessionExpired = callback;
};

export const clearSessionExpiredCallback = () => {
  onSessionExpired = null;
};

export default api;