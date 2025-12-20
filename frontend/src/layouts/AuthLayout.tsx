import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { ROUTES } from "../components/config/routes";

/**
 * AuthLayout - Layout wrapper for authentication pages
 * 
 * Features:
 * - Redirects to home if user is already authenticated
 * - Provides consistent styling/structure for auth pages
 * - Optional: Can add auth-specific header, footer, background, etc.
 * 
 * Use this to wrap login, register, forgot-password pages
 */
const AuthLayout = () => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(148,38%,91%)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(169,82%,27%)]"></div>
          <p className="mt-4 text-[hsl(187,24%,22%)]">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, redirect to home
  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Render auth pages with optional styling
  return (
    <div className="auth-layout min-h-screen">
      {/* Optional: Add auth-specific header */}
      {/* <header className="py-4">
        <div className="container mx-auto">
          <h1>Your Brand</h1>
        </div>
      </header> */}

      {/* Render matched auth route (Login, Register, etc.) */}
      <Outlet />

      {/* Optional: Add auth-specific footer */}
      {/* <footer className="py-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2024 Your Company. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default AuthLayout;