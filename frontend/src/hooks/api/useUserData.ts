import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import api from "../../utils/axios-utils";
import type { user } from "../../constants/auth";
import type { AccessToken } from "../../context/auth/AuthTypes";

export interface AuthResponse {
  username: string;
  token: AccessToken;
  user: user;
}

interface ResendActivationResponse{
  success:string;
  message:string;
} 
interface PasswordResponse{
  success:string;
  message:string;

}
interface RefreshResponse {
  token: AccessToken;
}

interface VerifyTokenResponse {
  token: AccessToken;
  user: user;
}
interface SignUpResponse {
  success:boolean;
  message:string;
  email?:string
}
interface ResetPasswordTokenResponse {
  valid:boolean,
  message?:string;
}

interface ActivationTokenResponse {
  valid:boolean,
  message?:string;
}

const signupUser = async (
  firstname:string,
  lastname:string,
  email: string,
  password: string,
  repeatPassword: string,
  uuid:string
):Promise<SignUpResponse> => {
  const response = await api.post<SignUpResponse>('/auth/signup',{
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

const resetPasswordRequest = async (email:string):Promise<PasswordResponse>=>{
  const response = await api.post<PasswordResponse>('/auth/request-password-reset',{
    email
  })
  return response.data;
}
const resendActivation = async (email:string):Promise<ResendActivationResponse>=>{
  const response = await api.post<ResendActivationResponse>('auth/resend-activation',{email}
  )
  return response.data;
}

const resetPassword = async (
  token:string,
  selector:string,
  password:string,
  password_confirm:string
):Promise<PasswordResponse>=>{
  const response = await api.post<PasswordResponse>('/auth/reset-password',{
    token,
    selector,
    password,
    password_confirm

  })
  return response.data
 }

 const validateResetToken = async (token: string, selector: string): Promise<ResetPasswordTokenResponse> => {
  const response = await api.get<ResetPasswordTokenResponse>(
    `/auth/validate-reset-token?token=${encodeURIComponent(token)}&selector=${encodeURIComponent(selector)}`
  );
  return response.data;
}

 const activateAccountToken = async (token: string): Promise<ResetPasswordTokenResponse> => {
  const response = await api.get<ActivationTokenResponse>(
    `/auth/activate-account?token=${encodeURIComponent(token)}`
  );
  return response.data;
}



const refreshAuto = async (): Promise<RefreshResponse> => {
  const response = await api.get<RefreshResponse>('/auth/refresh'); 
  return response.data;
}

const verifyToken = async (): Promise<VerifyTokenResponse> => {
  const response = await api.get<VerifyTokenResponse>('/auth/verify'); 
  return response.data;
}

const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
}

export const useResetPassword = (
   options?: UseMutationOptions <
    PasswordResponse, 
    Error, 
    {
      token:string,
      selector:string,
      password:string,
      password_confirm:string
    }
   >
) =>{
  return useMutation<
    PasswordResponse, 
    Error, 
    {
      token:string,
      selector:string,
      password:string,
      password_confirm:string
    }>({
    mutationFn: ({token,selector,password,password_confirm}) => 
      resetPassword(token,selector,password,password_confirm),
    ...options
  });

} 
export const useResendActivation = (
  options?:UseMutationOptions < 
  ResendActivationResponse,
  Error,
  {email:string}
  >
)=>{
  return useMutation<
    ResendActivationResponse,
    Error,
    {email:string}>({
      mutationFn:({email}) => resendActivation(email),
      ...options
    })

}
export const useRequestResetPassword = (
   options?: UseMutationOptions <
    PasswordResponse, 
    Error, 
    {email:string}
   >
)=>{
  return useMutation<
    PasswordResponse, 
    Error, 
    {
      email:string
    }>({
    mutationFn: ({email}) => resetPasswordRequest(email),
    ...options
  });
}

export const useValidateResetToken = (
  token: string | null,
  selector: string | null,
  options?:Omit<UseQueryOptions<ResetPasswordTokenResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<ResetPasswordTokenResponse, Error>({
    queryKey: ['validateResetToken', token,selector],
    queryFn: () => validateResetToken(token!,selector!),
    enabled: !!token && !!selector, 
    retry: false, 
    staleTime: 0, 
    gcTime: 0, 
    ...options
  });
}

export const useActivateAccount = (
  token: string | null,
  options?:Omit<UseQueryOptions<ActivationTokenResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<ActivationTokenResponse, Error>({
    queryKey: ['activateAccountToken', token],
    queryFn: () => activateAccountToken(token!),
    enabled: !!token, 
    retry: false, 
    staleTime: 0, 
    gcTime: 0, 
    ...options
  });
}

export const useVerifyToken = (
  options?:Omit<UseQueryOptions<VerifyTokenResponse, Error>, 'queryKey' | 'queryFn'>, 
) => {
  return useQuery<VerifyTokenResponse, Error>({
    queryKey: ['verifyToken'],
    queryFn: () => verifyToken(), 
    retry: false, 
    staleTime: 0, 
    gcTime: 0, 
    ...options
  });
}

export const useRefreshAuto = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['refreshToken'],
    queryFn: refreshAuto,
    enabled, // Control when it runs
    retry: 1,
    staleTime: 0,
    gcTime: 0,
  });
}

export const useLoginUser = (
  options?: UseMutationOptions<
  AuthResponse, 
  Error, 
  { 
    email: string; 
    password: string 
  }>
) => {
  return useMutation<
    AuthResponse, 
    Error, 
    { 
      email: string; 
      password: string 
    }>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    ...options
  });
};

export const useSignupUser = (
  options?: UseMutationOptions<
    SignUpResponse,
    Error,
    {
      firstname:string,
      lastname:string,
      email:string,
      password:string,
      repeatPassword:string,
      uuid:string
    }>
)=>{
    return useMutation<
    SignUpResponse,
    Error,
    {
      firstname:string,
      lastname:string,
      email:string,
      password:string,
      repeatPassword:string,
      uuid:string
    }>({
      mutationFn:({
        firstname,
        lastname,
        email,
        password,
        repeatPassword,
        uuid
      }) => signupUser(
        firstname,
        lastname,
        email,
        password,
        repeatPassword,
        uuid),
      ...options
    });
  };


export const useLogoutUser = (
  options?: UseMutationOptions<
      void, 
      Error, 
      void
    >
) => {
  return useMutation<
      void, 
      Error, 
      void
    >({
    mutationFn: () => logoutUser(),
    ...options
  });
};