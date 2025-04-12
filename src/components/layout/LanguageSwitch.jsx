import { useRouter } from 'next/router';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitch() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { currentLanguage, changeLanguage } = useLanguage();
  
  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'ht', name: 'Kreyòl Ayisyen' },
  ];
  
  const handleLanguageChange = (languageCode) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
    changeLanguage(languageCode);
  };
  
  return (
    <div className="flex items-center space-x-4">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          className={`text-sm font-medium ${
            currentLanguage === language.code
              ? 'text-primary font-semibold'
              : 'text-gray-500 hover:text-primary'
          }`}
          aria-label={t('language.switch', { language: language.name })}
        >
          {language.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}