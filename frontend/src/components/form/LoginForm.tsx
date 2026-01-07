import { type FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/auth/AuthContext';
import { useLocation } from 'react-router-dom';
import { handleYiiErrors, getYiiErrorMessage } from '../../utils/YiiErrorHandler';

// Zod schema for login
const loginSchema = z.object({
  email: z.email("Invalid email address format").nonempty("Email cannot be empty"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm: FC = () => {
  type FormValues = z.infer<typeof loginSchema>;
  
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  
  const location = useLocation();
  const successMessage = location.state?.message;


  const { register, control, handleSubmit, formState, setError } = form;
  const { errors,  isSubmitting } = formState;
  
  const { login, isLoggingIn } = useAuth();
  
  async function onSubmit(data: FormValues) {
    try {
      setGeneralError(null);
       login(data.email, data.password);
      
      // Success - redirect handled by AuthProvider/Router
      
    } catch (error) {
      // Use utility to handle Yii backend errors
      const handled = handleYiiErrors<FormValues>(
        error,
        setError,
        setGeneralError,
        ['email', 'password'] // Valid form fields
      );
      
      // If no specific errors were handled, show generic message
      if (!handled) {
        setGeneralError(
          getYiiErrorMessage(error, "Login failed. Please check your credentials and try again.")
        );
      }
    }
  }


  return (
    <div className="min-h-screen bg- py-8 px-4">
      <div className="max-w-md mx-auto bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold  mb-6">
          Sign In
        </h1>

        {/* Success Message Display */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
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
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email <span className="text-red-800">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
                errors.email ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
              }`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

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
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a 
              href="/forgot-password" 
              className="text-sm text-[#f68b1e] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={ isSubmitting || isLoggingIn}
              className="w-full bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgb(246,139,97)] transition-colors"
            >
              {isSubmitting || isLoggingIn ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p className="text-sm  mt-4 text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-[#f68b1e] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
}

export default LoginForm;