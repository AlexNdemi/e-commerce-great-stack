import type { user } from "../../constants/auth"

export type AccessToken = { token: string; expires_in: number }

export interface AuthContextType {
  token: AccessToken | null;
  user: user | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}