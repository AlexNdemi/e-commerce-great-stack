import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { appRoutes, ROUTES, isAuthPage } from "./routes";
import ProtectedRoute from "../../components/ProtectedRoute";
import Loader from "../../components/loader/Loader";
import RootLayout from "../../layouts/RootLayout";
import AuthLayout from "../../layouts/AuthLayout";
import MainLayout from "../../layouts/MainLayout";
import RouteErrorBoundary from "../../components/RouterErrorBoundary";

/**
 * Wrap component with Suspense for lazy loading
 */
const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // ==========================================
      // AUTH LAYOUT (login, register, etc.)
      // ==========================================
      {
        element: <AuthLayout />,
        children: appRoutes
          .filter(route => isAuthPage(route.path))
          .map(({ path, element: Component, title }) => ({
            path,
            element: withSuspense(Component),
            handle: {
              title,
              protected: false,
            },
          })),
      },

      // ==========================================
      // MAIN LAYOUT (rest of the app)
      // ==========================================
      {
        element: <MainLayout />,
        children: [
          ...appRoutes
            .filter(route => !isAuthPage(route.path))
            .map(({ path, element: Component, protected: isProtected, title }) => ({
              path,
              element: isProtected ? (
                <ProtectedRoute>
                  {withSuspense(Component)}
                </ProtectedRoute>
              ) : (
                withSuspense(Component)
              ),
              handle: {
                title,
                protected: isProtected,
              },
            })),

          // Catch-all
          {
            path: "*",
            element: <Navigate to={ROUTES.HOME} replace />,
            handle: { title: "Not Found", protected: false },
          },
        ],
      },
    ],
  },
]);

export default router;
