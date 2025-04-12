import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('fr'); // Default to French
  
  useEffect(() => {
    // Update the language state when the router locale changes
    if (router.locale) {
      setCurrentLanguage(router.locale);
    }
    
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      // Check if there's a saved language preference in localStorage
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && savedLanguage !== router.locale) {
        // If there is a saved preference, update the router
        router.push(router.pathname, router.asPath, { locale: savedLanguage });
      }
    }
  }, [router.locale, router.pathname, router.asPath, router]);
  
  const changeLanguage = (languageCode) => {
    if (languageCode !== currentLanguage) {
      setCurrentLanguage(languageCode);
      // Save the language preference (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', languageCode);
      }
      // Update the router to reflect the new language
      router.push(router.pathname, router.asPath, { locale: languageCode });
    }
  };
  
  const value = {
    currentLanguage,
    changeLanguage,
    isRTL: false, // French and Haitian Creole are LTR languages
  };
  
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  return useContext(LanguageContext);
};