import { ThemeProvider } from "./context/theme/ThemeProvider"
import {RouterProvider} from 'react-router-dom';
import router from "./components/config/router.tsx";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { ShopProvider } from "./context/shop/ShopProvider.tsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./pages/ErrorBoundary.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (

    <ErrorBoundary fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Application Error
            </h1>
            <p className="text-gray-600 mb-4">
              Something went wrong with the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Application
            </button>
          </div>
        </div>
    }>
    <ThemeProvider>
      <ShopProvider>
        <QueryClientProvider client={queryClient}>
          <div className="px-4 sm:px-[5vw] md:px-[7w] lg:px-[9vw] max-w-[1280px]">
            <ToastContainer/>
              <RouterProvider router={router} />
            
          </div>
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </ShopProvider>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
