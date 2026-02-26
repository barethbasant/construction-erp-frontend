import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.css";
import App from './App.tsx'
import { LoaderProvider } from './app/providers/LoaderProvider.tsx';
import { SnackbarProvider } from './app/providers/SnackBarProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <LoaderProvider>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </LoaderProvider>
  </StrictMode>,
)
