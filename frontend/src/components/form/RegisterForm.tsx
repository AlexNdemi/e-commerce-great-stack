import { type FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/auth/AuthContext';
import { handleYiiErrors, getYiiErrorMessage } from '../../utils/YiiErrorHandler';
import { useRateLimitTimer } from '../../hooks/useRateLimitTimer';
import axios from 'axios';



// Create unique ID outside component
const uniqueId = uuidv4();

// Zod schema
const registerSchema = z.object({
  firstname:z.string().min(1,"name must be atleast 2 characters").nonempty("firstName").max(255),
  lastname:z.string().min(1,"name must be atleast 2 characters").nonempty("firstName").max(255),
  email: z.email("Invalid email address format").nonempty("Email cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters").nonempty("Password is required"),
  repeatPassword: z.string().nonempty("Please confirm your password"),
  uuid: z.string().nonempty("UUID is required")
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "Invalid UUID v4 format")
}).refine((data) => data.password === data.repeatPassword, {
  // Refine the schema at the object level
  message: "Passwords do not match",
  path: ["repeatPassword"],          
});

const RegisterForm: FC = () => {
  type FormValues = z.infer<typeof registerSchema>;

  const { isLocked, displayText, startCooldown } = useRateLimitTimer('resend-activation', 60);
  
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      firstname:"",
      lastname:"",
      email: "",
      password: "",
      repeatPassword:"",
      uuid: uniqueId
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { register, control, handleSubmit, formState, setError } = form;
  const { errors,  isSubmitting } = formState;
  
  const { signup, isSigningUp } = useAuth();
 

  
  async function onSubmit(data: FormValues) {
    try {
      setGeneralError(null);
      await signup(data.firstname,data.lastname,data.email, data.password,data.repeatPassword, data.uuid);
      
      
    } catch (error:unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] as string) || 60;
        startCooldown(retryAfter);
      }
      // Use utility to handle Yii backend errors
      const handled = handleYiiErrors<FormValues>(
        error,
        setError,
        setGeneralError,
        ['email', 'password', 'uuid','firstname','lastname'] // Valid form fields
      );
      
      // If no specific errors were handled, show generic message
      if (!handled) {
        setGeneralError(getYiiErrorMessage(error, "Registration failed. Please try again."));
      }
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Register Account
        </h1>

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
            <label htmlFor="firstname" className="font-medium">
              First Name <span className="text-red-800">*</span>
            </label>
            <input
              id="firstname"
              {...register("firstname")}
              className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
                errors.firstname ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
              }`}
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">{errors.firstname.message}</span>)
            }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-medium">
              Last Name <span className="text-red-800">*</span>
            </label>
            <input
              id="lastname"
              {...register("lastname")}
              className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
                errors.lastname ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
              }`}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm">{errors.lastname.message}</span>
            )}
         </div>        
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
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="repeatPassword" className="font-medium">
              Repeat Password <span className="text-red-800">*</span>
            </label>
            <input
              type="password"
              id="repeatPassword"
              {...register("repeatPassword")}
              className={`bg-[var(--background)] border-none outline-none focus:shadow-[0px_0px_2px_1px_var(--inputAccent)] rounded-lg px-6 py-3 ${
                errors.repeatPassword ? "shadow-[0px_0px_2px_1px_rgb(251,44,54)]" : ""
              }`}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            {errors.repeatPassword && (
              <span className="text-red-500 text-sm">{errors.repeatPassword?.message}</span>
            )}
          </div>

          {/* UUID Field - Hidden but validated */}
          <input
            type="hidden"
            {...register("uuid")}
          />
          {errors.uuid && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-700 text-sm">{errors.uuid.message}</span>
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={ isSubmitting || isSigningUp || isLocked}
              className="w-full bg-[#f68b1e] hover:bg-[#e07a0e] text-white rounded-lg px-6 py-3 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgb(246,139,97)] transition-colors"
            >
              {isSubmitting || isSigningUp ? 'Creating Account...':isLocked ? displayText: 'Create Account'}
            </button>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-[#f68b1e] hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
}

export default RegisterForm;