import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider } from "../context/auth/AuthProvider";

/**
 * RootLayout - The top-level layout component
 * 
 * Responsibilities:
 * - Wraps all routes with AuthProvider
 * - Provides router hooks (navigate, location) to AuthProvider
 * - Renders child routes via <Outlet />
 * 
 * This component exists because:
 * 1. AuthProvider needs access to router hooks (useNavigate, useLocation)
 * 2. Router hooks can only be used inside <RouterProvider>
 * 3. So we create this layout component that sits inside the router
 */
const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AuthProvider navigate={navigate} location={location}>
      {/* Outlet renders the matched child route */}
      <Outlet />
    </AuthProvider>
  );
};

export default RootLayout;