import { type FC, useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useActivateAccount } from '../../hooks/api/useUserData';
import { getYiiErrorMessage } from '../../utils/YiiErrorHandler';

const ActivateAccountComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [generalError, setGeneralError] = useState<string | null>(null);

  const { 
    isSuccess: activateAccountSuccessful,
    isError: activateAccountFailed,
    data: activateAccountData,
    isLoading: isValidating,
    error: apiError // Capture the actual error object
  } = useActivateAccount(token);
  
  useEffect(() => {
    if (!token) {
      setGeneralError("Invalid activation link");
      return;
    }

    // Check if the request finished but the backend says the token is invalid
    if (activateAccountSuccessful && activateAccountData?.valid === false) {
      setGeneralError('This account activation link is invalid or has expired');
    } 
    // Handle actual request failure
    else if (activateAccountFailed) {
      setGeneralError(getYiiErrorMessage(apiError, 'Activation failed. Please try again.'));
    }
  }, [token, activateAccountData, activateAccountSuccessful, activateAccountFailed, apiError]);

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg text-center">
        
        {/* Loading State */}
        {isValidating && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f68b1e] mb-4"></div>
            <p className="font-medium text-lg">Activating your account...</p>
          </div>
        )}

        {/* Success State - Only show if data.valid is true */}
        {activateAccountSuccessful && activateAccountData?.valid && (
          <div>
            <div className="mb-4 text-green-500">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Account Activated!</h1>
            <p className="mb-6">{activateAccountData?.message || "You can now log in to your account."}</p>
            <Link 
              to="/login" 
              className="block w-full bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error State - Show if request failed OR generalError is set */}
        {(activateAccountFailed || generalError) && !isValidating && (
          <div>
            <div className="mb-4 text-red-500">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Activation Failed</h1>
            <p className="text-red-600 mb-6">
              {generalError}
            </p>
            <Link 
              to="/signup" 
              className="text-[#f68b1e] hover:underline font-medium"
            >
              Back to Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateAccountComponent;