import { type FC, useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { handleYiiErrors, getYiiErrorMessage } from '../../utils/YiiErrorHandler';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useValidateResetToken } from '../../hooks/api/useUserData';
import { useResetPassword } from '../../hooks/api/useUserData';
import { useRateLimitTimer } from '../../hooks/useRateLimitTimer';
import axios from 'axios';



// Zod schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  selector: z.string().min(1, "selector is required"),
  password: z.string().min(8, "Password must be at least 8 characters").nonempty("Password is required"),
  password_confirm: z.string().nonempty("Please confirm your password"),

}).refine((data) => data.password === data.password_confirm, {
  // Refine the schema at the object level
  message: "Passwords do not match",
  path: ["repeatPassword"],          
});

const ResetPasswordForm: FC = () => {
  type FormValues = z.infer<typeof resetPasswordSchema>;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const selector = searchParams.get('selector');

  const { isLocked, displayText, startCooldown } = useRateLimitTimer('resend-activation', 60);
  
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    isSuccess: validateResetTokenSuccessful,
    isError: validateResetTokenFailed,
    data: validateResetTokenData,
    isLoading: isValidating
  } = useValidateResetToken(token, selector);

  // Simplified useEffect that responds to query state changes
  useEffect(() => {
    if (!token || !selector) {
      setGeneralError("Invalid reset link");
      return;
    }

    if (validateResetTokenSuccessful && validateResetTokenData?.valid) {
      setGeneralError(null);
    } else if (validateResetTokenFailed) {
      setGeneralError('This password reset link is invalid or has expired');
    }
  }, [token, selector, validateResetTokenData, validateResetTokenSuccessful, validateResetTokenFailed]);

  const resetPasswordMutation = useResetPassword();
  
  const form = useForm<FormValues>({
    defaultValues: {
      token: token || "",
      selector: selector || "",
      password: "",
      password_confirm: "",
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const { register, control, handleSubmit, formState, setError } = form;
  const { errors, isSubmitting } = formState;

  async function onSubmit(data: FormValues) {
    try {
      setGeneralError(null);
      const { token, selector, password, password_confirm } = data;
      await resetPasswordMutation.mutateAsync({ token, selector, password, password_confirm });

      navigate('/login', { 
        state: { message: "Your password has been reset successfully. Please log in." } 
      });
    } catch (error:unknown) {
       if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] as string) || 60;
        startCooldown(retryAfter);
      }

      const handled = handleYiiErrors<FormValues>(
        error,
        setError,
        setGeneralError,
        ['token', 'selector', 'password', 'password_confirm']
      );
       
      if (!handled) {
        setGeneralError(getYiiErrorMessage(error, "Reset password failed. Please try again."));
      }
    }
  }

  // Show loading state while validating
  if (isValidating || (!token || !selector)) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f68b1e] mx-auto"></div>
          <p className="mt-4 text-[var(--surfaceElementText)]">
            {(!token || !selector) ? "Invalid reset link" : "Validating reset link..."}
          </p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (validateResetTokenFailed || (validateResetTokenData && !validateResetTokenData.valid)) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm">
              {generalError  || "Invalid or expired reset link"}
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/forgot-password" 
              className="text-[#f68b1e] hover:text-[#e07a0e] font-medium"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen py-8 px-4">
    <div className="max-w-4xl mx-auto bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Reset your password
      </h1>
      <p>enter your new password below</p>

      {/* General Error Message */}
      {generalError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{generalError}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 gap-4"
      >
          {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password <span className="text-red-800">*</span>
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
              errors.password ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
            }`}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Password_Confirm*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="repeatPassword" className="font-medium">
            Repeat Password <span className="text-red-800">*</span>
          </label>
          <input
            type="password"
            id="password_confirm"
            {...register("password_confirm")}
            className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
              errors.password_confirm ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
            }`}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          {errors.password_confirm && (
            <span className="text-red-500 text-sm">{errors.password_confirm?.message}</span>
          )}
        </div>
        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={ isSubmitting || isLocked}
            className="w-full bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgb(246,139,97)] transition-colors"
          >
            {isSubmitting ? 'Reseting your password...' :isLocked? displayText: 'Reset your password'}
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </div>
  </div>
);
}

export default ResetPasswordForm;