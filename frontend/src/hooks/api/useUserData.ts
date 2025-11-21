import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import api from "./axios-utils";
import type { user } from "../../constants/auth";
import type { AccessToken } from "../../context/auth/AuthTypes";

export interface AuthResponse {
  username: string;
  token: AccessToken;
  user: user;
}

interface RefreshResponse {
  token: AccessToken;
}

const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', {
    email,
    password
  });
  return response.data;
}

const refreshAuto = async (tokenData: AccessToken): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>('/auth/refresh-auto', {
    token: tokenData.token,
    expires_in: tokenData.expires_in
  });
  return response.data;
}

export const useRefreshAuto = (
  options?: UseMutationOptions<RefreshResponse, Error, AccessToken>
) => {
  return useMutation<RefreshResponse, Error, AccessToken>({
    mutationFn: (tokenData) => refreshAuto(tokenData),
    ...options
  });
}

export const useLoginUser = (
  options?: UseMutationOptions<AuthResponse, Error, { email: string; password: string }>
) => {
  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    ...options
  });
};