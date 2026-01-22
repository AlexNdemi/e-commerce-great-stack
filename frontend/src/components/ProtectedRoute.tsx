import { Navigate } from "react-router-dom";
import { type ReactNode,type FC} from "react"
import { useAuth } from "../context/auth/AuthContext";
import Loader from "./loader/Loader";
import { ROUTES } from "../constants/routes";

 const ProtectedRoute:FC<{children:ReactNode}>=({ children }) =>{
  const { token, loading } = useAuth();

  if (loading) return <Loader/>;

  return token ? children : <Navigate to={ROUTES.LOGIN} state={{from:location}} replace />;
}
export default ProtectedRoute