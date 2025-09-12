import { ThemeProvider } from "./context/theme/ThemeProvider"

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
function App() {
  


  return (
    <ThemeProvider>
       <ShopProvider>
         <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense fallback={<Loader/>}>
              <div className="px-4 sm:px-[5vw] md:px-[7w] lg:px-[9vw]">
                <Navbar/>
                <SearchBar/>
                <Routes>
                  {appRoutes.map(({ path, element:Component }) => (
                    <Route
                      key={path}
                      path={path}
                      element={<Component/>} />
                  ))}
                </Routes>
                <Footer/>
              </div>
            </Suspense>
          </Router>
          <ReactQueryDevtools initialIsOpen={false}/>
         </QueryClientProvider>
       </ShopProvider>
    </ThemeProvider>
  )
}

export default App
