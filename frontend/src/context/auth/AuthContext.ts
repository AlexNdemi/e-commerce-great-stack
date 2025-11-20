import { createContext, useContext} from "react"
import { type AuthContextType } from "./AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext =useContext(AuthContext);

  if (!authContext){
    throw new Error ('useAuth must be used within an AuthProvider')
  }
  return authContext;
}