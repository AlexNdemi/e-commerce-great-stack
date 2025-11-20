import { useMutation,type UseMutationOptions } from "@tanstack/react-query";
import api from "./axios-utils";
import type { user } from "../../constants/auth";
import type { AccessToken } from "../../context/auth/AuthTypes";


export interface AuthResponse{
  'username':string,
  'token':AccessToken,
  'user':user
}
interface refreshResponse{
  'token':AccessToken,
}

 const loginUser = async (email:string,password:string):Promise<AuthResponse> =>{
  const response = await api.post<AuthResponse>('/auth/login',{
    email,
    password
  })
  return response.data;
}

const refreshAuto = async (tokenData: AccessToken):Promise<refreshResponse> => {
  const response = await api.post<refreshResponse>('/auth/refresh-auto',{
    token:tokenData.token,
    expires_in:tokenData.expires_in
  });
  return response.data
}

export const useRefreshAuto =(
  options?:UseMutationOptions<refreshResponse,Error,AccessToken>
)=>{
  return useMutation<refreshResponse,Error,AccessToken>({
    mutationFn:(tokenData)=>refreshAuto(tokenData),
    ...options
  })
}

export const useLoginUser = (
    options?: UseMutationOptions<AuthResponse, Error, { email: string; password: string }>
) => {
  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    ...options
  });
};
