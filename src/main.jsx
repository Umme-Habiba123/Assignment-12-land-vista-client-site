import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router";
import AuthProvider from './context/Provider/AuthProvider';
import { router } from './routes/router';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';

Aos.init()
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>

     <HelmetProvider>
      <div className='urbanist-font '>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  //  </ThemeProvider>
  // </StrictMode>,
)
