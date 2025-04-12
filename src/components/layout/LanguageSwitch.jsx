import { useRouter } from 'next/router';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'next-i18next';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitch() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'ht', name: 'Kreyòl Ayisyen' },
  ];
  
  const currentLanguageObj = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  const handleLanguageChange = (languageCode) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium px-3 py-1 rounded-md border border-gray-300 hover:border-primary transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={`${isOpen ? 'text-primary' : ''}`}>
          {currentLanguageObj.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-primary' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                currentLanguage === language.code
                  ? 'bg-gray-100 text-primary font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
              }`}
              aria-label={t('language.switch', { language: language.name })}
            >
              <span className="font-medium mr-2">{language.code.toUpperCase()}</span>
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}