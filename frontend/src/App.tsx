import { ThemeProvider } from "./context/theme/ThemeProvider"
import { AuthProvider } from "./components/AuthProvider.tsx";

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Loader from './components/loader/Loader.tsx'
import {Suspense} from 'react';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { appRoutes } from "./constants/routes.ts";
const queryClient = new QueryClient();
import { ShopProvider } from "./context/shop/ShopProvider.tsx";
import Navbar from "./components/ui/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {



  return (
    <ThemeProvider>
       <ShopProvider>
         <QueryClientProvider client={queryClient}>
          
          <AuthProvider>
            <Router>
              <Suspense fallback={<Loader/>}>
                <div className="px-4 sm:px-[5vw] md:px-[7w] lg:px-[9vw] max-w-[1280px]">
                  <ToastContainer/>
                  <Navbar/>
                  <SearchBar/>
                  <Routes>
                    {appRoutes.map(({ path, element: Component, protected: isProtected }) => {
                      const pageElement = isProtected ? (
                        <ProtectedRoute>
                          <Component />
                        </ProtectedRoute>
                      ): <Component />;return (
                      <Route
                        key={path}
                        path={path}
                        element={pageElement}
                      />);
                    })}
                  </Routes>
                  <Footer/>
                </div>
              </Suspense>
            </Router>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false}/>
         </QueryClientProvider>
       </ShopProvider>
    </ThemeProvider>
  )
}

export default App
