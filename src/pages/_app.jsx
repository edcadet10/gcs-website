import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { useEffect } from 'react';

// Import the global CSS file
import '../styles/globals.css';

// Create a client for React Query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Handle client-side initialization here if needed
    const handleClientInit = () => {
      // Add any client-side-only initializations here
      console.log('Client-side initialization complete');
    };
    
    handleClientInit();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);