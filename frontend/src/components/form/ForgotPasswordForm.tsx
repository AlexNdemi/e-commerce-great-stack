import { type FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate} from 'react-router-dom';
import { handleYiiErrors, getYiiErrorMessage } from '../../utils/YiiErrorHandler';
import { useRequestResetPassword } from '../../hooks/api/useUserData';
import { useLocation } from 'react-router-dom';
import { useRateLimitTimer } from '../../hooks/useRateLimitTimer';
import axios from 'axios';



// Zod schema
const requestResetSchema = z.object({
  
  email: z.email("Invalid email address format").nonempty("Email cannot be empty")
});

const ForgotPasswordForm: FC = () => {
  const navigate = useNavigate();
  type FormValues = z.infer<typeof requestResetSchema>;
  
  const { isLocked, displayText, startCooldown } = useRateLimitTimer('resend-activation', 60);


  const [generalError, setGeneralError] = useState<string | null>(null);

  const requestResetPasswordMutation= useRequestResetPassword();
  
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(requestResetSchema),
    mode: "onChange",
  });
  const location = useLocation();
    const successMessage = location.state?.message;

  const { register, control, handleSubmit, formState, setError } = form;
  const { errors,  isSubmitting } = formState;
  
  
  async function onSubmit(data: FormValues) {
    try {
      setGeneralError(null);
      await requestResetPasswordMutation.mutateAsync({email:data.email});
      navigate('/login', { 
        state: { message: "An email has  been sent to you with instructions on how to reset your password.please check your email" } 
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
        ['email',] // Valid form fields
      );
      
      if (!handled) {
        setGeneralError(getYiiErrorMessage(error, "ResetPassword failed. Please try again."));
      }
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          request to reset your password
        </h1>
        <p>An email will be sent to you with instructions on how to reset your password</p>

        {/* Success Message Display */}
        {successMessage && (
          <div className="mb-4 p-4 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">{successMessage}</p>
          </div>
        )}

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
          <div className="flex flex-col gap-1">
            <label 
              htmlFor="email" className="font-medium">
              email 
              <span className="text-red-800">*</span>
            </label>
            <input
              type='email'
              id="email"
              {...register("email")}
              className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
                errors.email? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>)
            }
          </div>
          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={ isSubmitting || isLocked}
              className="w-full bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgb(246,139,97)] transition-colors"
            >
              {isSubmitting ? 'Sending...' :isLocked ?displayText: 'Send reset link'}
            </button>
          </div>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
}

export default ForgotPasswordForm;