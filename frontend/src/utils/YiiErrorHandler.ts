import type { AxiosError } from 'axios';
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';

// Yii backend error response structure
export interface YiiErrorResponse {
  name: string;
  message: string;
  code: number;
  status: number;
  type?: string;
  errors?: {
    [key: string]: string[]; // field name -> array of error messages
  };
}

/**
 * Handle Yii backend validation errors and map them to React Hook Form
 * @param error - The axios error from the API call
 * @param setError - React Hook Form's setError function
 * @param setGeneralError - Optional callback to set general/non-field errors
 * @param validFields - Optional array of valid form field names to filter against
 * @returns true if errors were handled, false otherwise
 */
export function handleYiiErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  setGeneralError?: (message: string | null) => void,
  validFields?: string[]
): boolean {
  const axiosError = error as AxiosError<YiiErrorResponse>;
  
  // No response data, cannot handle
  if (!axiosError.response?.data) {
    if (setGeneralError) {
      setGeneralError('An unexpected error occurred. Please try again.');
    }
    return false;
  }

  const responseData = axiosError.response.data;
  let hasErrors = false;

  // Handle field-specific validation errors
  if (responseData.errors && Object.keys(responseData.errors).length > 0) {
    Object.entries(responseData.errors).forEach(([field, messages]) => {
      const errorMessage = Array.isArray(messages) ? messages[0] : messages;
      
      // Check if this field is valid for the form
      const isValidField = !validFields || validFields.includes(field);
      
      if (isValidField) {
        setError(field as Path<T>, {
          type: 'server',
          message: errorMessage
        });
        hasErrors = true;
      } else if (setGeneralError) {
        // Field doesn't match form, show as general error
        setGeneralError(errorMessage);
        hasErrors = true;
      }
    });
  }
  
  // Handle general message from backend (if no field errors or in addition to them)
  if (responseData.message && setGeneralError) {
    setGeneralError(responseData.message);
    hasErrors = true;
  }

  return hasErrors;
}

/**
 * Extract general error message from Yii response
 * @param error - The axios error from the API call
 * @param defaultMessage - Fallback message if no specific error found
 * @returns Error message string
 */
export function getYiiErrorMessage(
  error: unknown,
  defaultMessage: string = 'An error occurred. Please try again.'
): string {
  const axiosError = error as AxiosError<YiiErrorResponse>;
  
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }
  
  // If there are field errors but no general message, create one
  if (axiosError.response?.data?.errors) {
    const errorCount = Object.keys(axiosError.response.data.errors).length;
    return `Please fix ${errorCount} validation ${errorCount === 1 ? 'error' : 'errors'}.`;
  }
  
  // Extract status for cleaner checks
  const status = axiosError.response?.status;
  
  // Handle specific HTTP status codes
  if (status === 401) {
    return 'Authentication failed. Please check your credentials.';
  }
  
  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }
  
  if (status === 404) {
    return 'The requested resource was not found.';
  }
  
  // ✅ Fixed: Check for undefined before comparison
  if (status !== undefined && status >= 500) {
    return 'A server error occurred. Please try again later.';
  }
  
  return defaultMessage;
}

/**
 * Check if an error is a Yii validation error
 * @param error - The error to check
 * @returns true if the error is a Yii validation error
 */
export function isYiiValidationError(error: unknown): boolean {
  const axiosError = error as AxiosError<YiiErrorResponse>;
  return !!(
    axiosError.response?.data?.errors &&
    Object.keys(axiosError.response.data.errors).length > 0
  );
}

/**
 * Get all validation error messages as a flat array
 * @param error - The axios error from the API call
 * @returns Array of error messages
 */
export function getYiiValidationMessages(error: unknown): string[] {
  const axiosError = error as AxiosError<YiiErrorResponse>;
  const messages: string[] = [];
  
  if (axiosError.response?.data?.errors) {
    Object.values(axiosError.response.data.errors).forEach((fieldErrors) => {
      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      } else {
        messages.push(fieldErrors);
      }
    });
  }
  
  return messages;
}