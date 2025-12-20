import { useRouteError, isRouteErrorResponse, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * RouteErrorBoundary - Catches routing errors in React Router
 * This is different from React's ErrorBoundary - it's specifically for router errors
 * 
 * Used as errorElement in route configuration
 */
const RouteErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Log error for debugging
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  // Handle different types of errors
  if (isRouteErrorResponse(error)) {
    // Router-specific errors (404, 401, etc.)
    if (error.status === 404) {
      return (
        <div className="min-h-screen bg-[hsl(148,38%,91%)] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            {/* Icon */}
            <div className="mb-4">
              <svg 
                className="w-24 h-24 mx-auto text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-[hsl(187,24%,22%)] mb-2">404</h1>
            <h2 className="text-xl font-semibold text-[hsl(187,24%,22%)] mb-4">
              Page Not Found
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for.
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <Link
                to="/"
                className="px-6 py-2 bg-[hsl(169,82%,27%)] text-white rounded-lg hover:bg-[hsl(187,24%,22%)] transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (error.status === 401) {
      return (
        <div className="min-h-screen bg-[hsl(148,38%,91%)] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 mx-auto text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-[hsl(187,24%,22%)] mb-4">
              Unauthorized
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-[hsl(169,82%,27%)] text-white rounded-lg hover:bg-[hsl(187,24%,22%)] transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      );
    }

    if (error.status === 503) {
      return (
        <div className="min-h-screen bg-[hsl(148,38%,91%)] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-xl font-semibold text-[hsl(187,24%,22%)] mb-4">
              Service Unavailable
            </h2>
            <p className="text-gray-600 mb-6">
              The service is temporarily unavailable. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-2 bg-[hsl(169,82%,27%)] text-white rounded-lg hover:bg-[hsl(187,24%,22%)] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
  }

  // Generic error fallback (including JavaScript errors)
  return (
    <div className="min-h-screen bg-[hsl(148,38%,91%)] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
        {/* Error Icon */}
        <div className="mb-4">
          <svg 
            className="w-24 h-24 mx-auto text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[hsl(187,24%,22%)] mb-4">
          Oops! Something went wrong
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {error instanceof Error 
            ? error.message 
            : "An unexpected error occurred. Please try again."}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reload Page
          </button>
          <Link
            to="/"
            className="px-6 py-2 bg-[hsl(169,82%,27%)] text-white rounded-lg hover:bg-[hsl(187,24%,22%)] transition-colors"
          >
            Go Home
          </Link>
        </div>

        {/* Development mode - show error details */}
        {import.meta.env.DEV && error instanceof Error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-4 bg-gray-50 rounded text-xs overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default RouteErrorBoundary;