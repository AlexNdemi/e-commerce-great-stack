import axios, { AxiosError } from 'axios';
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';

export interface YiiErrorResponse {
  name: string;
  message: string;
  code: number;
  status: number;
  error_type?: string; // Added for your 'inactive_account' check
  errors?: {
    [key: string]: string[];
  };
}

export function handleYiiErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  setGeneralError?: (message: string | null) => void,
  validFields?: string[]
): boolean {
  // Type Guard for Axios Errors
  if (!axios.isAxiosError(error)) {
    if (setGeneralError && error instanceof Error) setGeneralError(error.message);
    return false;
  }

  const axiosError = error as AxiosError<YiiErrorResponse>;
  const responseData = axiosError.response?.data;

  if (!responseData) {
    setGeneralError?.('An unexpected network error occurred.');
    return false;
  }

  let hasErrors = false;

  // 1. Handle Field Validation Errors
  if (responseData.errors) {
    Object.entries(responseData.errors).forEach(([field, messages]) => {
      const errorMessage = Array.isArray(messages) ? messages[0] : messages;
      const isValidField = !validFields || validFields.includes(field);
      
      if (isValidField) {
        setError(field as Path<T>, { type: 'server', message: errorMessage });
        hasErrors = true;
      }
    });
  }
  
  // 2. Handle General Message
  if (responseData.message && setGeneralError) {
    setGeneralError(responseData.message);
    hasErrors = true;
  }

  return hasErrors;
}

export function getYiiErrorMessage(error: unknown, defaultMessage: string = 'An error occurred.'): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : defaultMessage;
  }
  return error.response?.data?.message || defaultMessage;
}