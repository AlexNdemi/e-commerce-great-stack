import type { user } from "../../constants/auth"

export type AccessToken = { token: string; expires_in: number }

export interface AuthContextType {
  token: AccessToken | null;
  user: user | null;
  loading: boolean; 
  isSigningUp: boolean; 
  isLoggingIn: boolean; 
  isRefreshing: boolean; 
  login: (email: string, password: string,redirectPath:string | undefined
  ) => void;
  signup: (firstname:string,lastname:string,email: string, password: string,repeatPassword:string, uuid: string) => void;
  logout: () => Promise<void>;
}