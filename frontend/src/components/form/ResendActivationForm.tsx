import { type FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRateLimitTimer } from '../../hooks/useRateLimitTimer'; 
import { ROUTES } from '../config/routes';
import { useResendActivation } from '../../hooks/api/useUserData';
import { handleYiiErrors, getYiiErrorMessage } from '../../utils/YiiErrorHandler';

const resendSchema = z.object({
  email: z.email("Invalid email format").nonempty("Email is required"),
});

type FormValues = z.infer<typeof resendSchema>;

const ResendActivationComponent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState<string | null>(null);

  // 1. Hook initialization
  const { isLocked, displayText, startCooldown } = useRateLimitTimer('resend-activation', 60);
  
  // 2. Leverage the mutation's internal state: isSuccess, isPending, and data
  const resendMutation = useResendActivation();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: { email: location.state?.email || "" } 
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setGeneralError(null);
      // We still use mutateAsync to handle the try/catch flow for rate limiting
      await resendMutation.mutateAsync({ email: data.email });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] as string) || 60;
        startCooldown(retryAfter);
      }

      const handled = handleYiiErrors<FormValues>(error, setError, setGeneralError, ['email']);
      if (!handled) {
        setGeneralError(getYiiErrorMessage(error, "Could not resend link."));
      }
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg">
        
        {/* Toggle UI using the mutation's native isSuccess state */}
        {!resendMutation.isSuccess ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Resend Activation</h1>
            <p className="text-gray-500 mb-6 text-sm">
              {location.state?.message || "Verify your email to continue."}
            </p>

            {generalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  {...register("email")}
                  className={`bg-[var(--background)] rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-[#f68b1e] ${
                    errors.email ? "ring-1 ring-red-500" : ""
                  }`}
                  placeholder="name@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              <button
                type="submit"
                disabled={resendMutation.isPending || isLocked}
                className="w-full bg-[#f68b1e] text-white rounded-lg py-3 font-medium transition-opacity disabled:opacity-50"
              >
                {resendMutation.isPending ? "Sending..." : isLocked ? displayText : "Send Activation Link"}
              </button>
            </form>
          </>
        ) : (
          /* SUCCESS VIEW: Triggered automatically by mutation state */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6 text-sm">
               {/* Access message directly from the mutation's response data */}
               {resendMutation.data?.message}
            </div>
            <button 
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-[#f68b1e] font-medium hover:underline"
            >
              Return to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendActivationComponent;