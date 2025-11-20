import { useContext,createContext, type FC, useState, type ReactNode } from "react";

const AuthContext = createContext(undefined);
export const useAuth = () => {
  const authContext =useContext(AuthContext);
  if (!authContext){
    throw new Error('useAuth must be used within AuthProvider');
    return 
  }
  return authContext;
}

export const AuthProvider : FC<{children:ReactNode}> = ({children}) => {
  const [token,setToken] = useState<string>('');

  
}