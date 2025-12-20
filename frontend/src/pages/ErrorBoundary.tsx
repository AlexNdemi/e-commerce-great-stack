import { Component, type ErrorInfo, type ReactNode } from 'react';

// 1. Define the types for the component's props
interface ErrorBoundaryProps {
  children: ReactNode; // The content the ErrorBoundary wraps
  fallback: ReactNode; // The content to display when an error occurs
}

// 2. Pass the props type to Component
// The type arguments for Component are <Props, State>
export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  // Define initial state
  state = { hasError: false };

  // Static method to update state on error
  static getDerivedStateFromError() {
    return { hasError: true };
}

  // Lifecycle method for side effects on error (e.g., logging)
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  // Render method
  render() {
    // Now this.state and this.props are correctly typed.
    if (this.state.hasError) {
      return this.props.fallback; // 'fallback' is correctly typed
    }
    return this.props.children; // 'children' is correctly typed
  }
}

export default ErrorBoundary;