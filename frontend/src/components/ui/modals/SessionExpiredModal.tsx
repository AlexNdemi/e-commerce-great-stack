import { type FC, useEffect, useState } from 'react';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirectToLogin: () => void;
}

export const SessionExpiredModal: FC<SessionExpiredModalProps> = ({
  isOpen,
  onClose,
  onRedirectToLogin,
}) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10);
      return;
    }

    // Auto-redirect after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRedirectToLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onRedirectToLogin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[hsl(187,24%,22%)] mb-2">
          Session Expired
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Your session has expired due to inactivity. Please log in again to continue.
        </p>

        {/* Countdown */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Redirecting to login in{' '}
            <span className="font-bold text-[hsl(169,82%,27%)]">{countdown}</span> seconds...
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Stay Here
          </button>
          <button
            onClick={onRedirectToLogin}
            className="flex-1 px-4 py-2 bg-[hsl(169,82%,27%)] text-white rounded-lg hover:bg-[hsl(187,24%,22%)] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};