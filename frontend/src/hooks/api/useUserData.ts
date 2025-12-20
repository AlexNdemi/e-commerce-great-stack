import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import api from "../../utils/axios-utils";
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

interface VerifyTokenResponse {
  token: AccessToken;
  user: user;
}

const signupUser = async (firstname:string,lastname:string,email: string,password: string,repeatPassword: string,uuid:string):Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup',{
    email,
    password,
    repeatPassword,
    uuid,
    firstname,
    lastname,
  });
  return response.data;
}

const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', {
    email,
    password
  });
  return response.data;
}

const refreshAuto = async (): Promise<RefreshResponse> => {
  const response = await api.get<RefreshResponse>('/auth/refresh'); // Changed to GET
  return response.data;
}

const verifyToken = async (): Promise<VerifyTokenResponse> => {
  const response = await api.get<VerifyTokenResponse>('/auth/verify'); // Changed to GET
  return response.data;
}

const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
}

export const useVerifyToken = (
  options?: UseMutationOptions<VerifyTokenResponse, Error, void>
) => {
  return useMutation<VerifyTokenResponse, Error, void>({
    mutationFn: () => verifyToken(),
    ...options
  });
}

export const useRefreshAuto = (
  options?: UseMutationOptions<RefreshResponse, Error, void>
) => {
  return useMutation<RefreshResponse, Error, void>({
    mutationFn: () => refreshAuto(),
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

export const useSignupUser = (
  options?: UseMutationOptions<AuthResponse,Error,{firstname:string,lastname:string,email:string,password:string,repeatPassword:string,uuid:string}>
)=>{
    return useMutation<AuthResponse,Error,{firstname:string,lastname:string,email:string,password:string,repeatPassword:string,uuid:string}>({
      mutationFn:({firstname,lastname,email,password,repeatPassword,uuid}) => signupUser(firstname,lastname,email,password,repeatPassword,uuid),
      ...options
    });
  };

export const useLogoutUser = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation<void, Error, void>({
    mutationFn: () => logoutUser(),
    ...options
  });
};