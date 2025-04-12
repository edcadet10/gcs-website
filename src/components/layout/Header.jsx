import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import LanguageSwitch from './LanguageSwitch';
import Navigation from './Navigation';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex justify-between items-center">
        <div className="hidden md:flex items-center justify-center flex-1">
          <Navigation isScrolled={isScrolled} />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitch />
          
          {user ? (
            <Button 
              href="/account/profile" 
              variant={isScrolled ? 'primary' : 'outline-white'}
            >
              {t('header.account')}
            </Button>
          ) : (
            <Button 
              href="/account/login" 
              variant={isScrolled ? 'primary' : 'outline-white'}
            >
              {t('header.login')}
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden rounded-md p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg 
            className={`w-6 h-6 ${isScrolled ? 'text-primary' : 'text-white'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
          <div className="container-custom py-4">
            <nav className="space-y-4">
              <Navigation mobile closeMobileMenu={closeMobileMenu} />
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitch />
              </div>
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <Button 
                    href="/account/profile" 
                    variant="primary"
                    className="w-full text-center"
                    onClick={closeMobileMenu}
                  >
                    {t('header.account')}
                  </Button>
                ) : (
                  <Button 
                    href="/account/login" 
                    variant="primary"
                    className="w-full text-center"
                    onClick={closeMobileMenu}
                  >
                    {t('header.login')}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}