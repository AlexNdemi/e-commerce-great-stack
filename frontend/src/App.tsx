import { ThemeProvider } from "./context/theme/ThemeProvider"

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Loader from './components/loader/Loader.tsx'
import {Suspense} from 'react';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { appRoutes } from "./constants/routes.ts";
const queryClient = new QueryClient();
function App() {
  


  return (
    <ThemeProvider>

       <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<Loader/>}>
            <div className="px-4 sm:px-[5vw] md:px-[7w] lg:px-[9vw]">
              <Routes>
                {appRoutes.map(({ path, element:Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Component/>} />
                ))}
              </Routes>
            </div>
          </Suspense>
        </Router>
        <ReactQueryDevtools initialIsOpen={false}/>
       </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
