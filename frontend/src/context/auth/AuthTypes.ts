import type { UseMutationOptions } from "@tanstack/react-query"
import {type AuthResponse } from "../../hooks/api/useUserData";
import type { user } from "../../constants/auth"

export type AccessToken = {token:string,expires_in:number}

export interface AuthContextType{
 token:AccessToken | null,
 user:user | null,
 loading:boolean,
 login:UseMutationOptions<AuthResponse, Error, { email: string; password: string }>,
 logout:()=>void
}