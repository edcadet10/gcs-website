import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Navigation({ isScrolled = true, mobile = false, closeMobileMenu }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.workshops'), href: '/workshops' },
    { name: t('nav.resources'), href: '/resources' },
    { name: t('nav.blog'), href: '/blog' },
  ];
  
  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };
  
  const linkStyles = (path) => {
    const active = isActive(path);
    
    if (mobile) {
      return active 
        ? 'block py-2 text-primary font-semibold whitespace-nowrap'
        : 'block py-2 text-gray-700 hover:text-primary transition-colors duration-200 whitespace-nowrap';
    }
    
    return active 
      ? `font-semibold whitespace-nowrap ${isScrolled ? 'text-primary' : 'text-white'}`
      : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:${isScrolled ? 'text-primary' : 'text-gray-200'} transition-colors duration-200 whitespace-nowrap`;
  };
  
  const navItems = navigation.map((item) => (
    <li key={item.name}>
      <Link 
        href={item.href}
        className={linkStyles(item.href)}
        onClick={mobile && closeMobileMenu ? closeMobileMenu : undefined}
      >
        {item.name}
      </Link>
    </li>
  ));
  
  if (mobile) {
    return <ul className="space-y-1">{navItems}</ul>;
  }
  
  return <ul className="flex justify-center space-x-6 md:space-x-8 lg:space-x-10">{navItems}</ul>;
}