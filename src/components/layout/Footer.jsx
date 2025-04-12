import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: 'SIG', href: '/services/gis' },
    { name: 'Cartographie', href: '/services/cartography' },
    { name: 'Télédétection', href: '/services/remote-sensing' },
    { name: 'Analyse spatiale', href: '/services/spatial-analysis' },
    { name: 'Imagerie par drone', href: '/services/drone-imagery' },
    { name: 'MEAL/GAR', href: '/services/meal-gar' },
    { name: 'Data Analytics', href: '/services/data-analytics' },
  ];
  
  const quickLinks = [
    { name: t('footer.about'), href: '/about' },
    { name: t('footer.workshops'), href: '/workshops' },
    { name: t('footer.resources'), href: '/resources' },
    { name: t('footer.blog'), href: '/blog' },
    { name: t('footer.contact'), href: '/contact' },
  ];
  
  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/geolinkservices', icon: 'facebook' },
    { name: 'Twitter', href: 'https://twitter.com/geolinkservices', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/geolinkservices', icon: 'linkedin' },
    { name: 'Instagram', href: 'https://instagram.com/geolinkservices', icon: 'instagram' },
  ];
  
  return (
    <footer className="text-white pt-16 pb-8 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-accent mb-2">GEOLINK</h2>
              <p className="text-lg font-semibold mb-2">{t('footer.tagline')}</p>
            </div>
            <address className="not-italic text-white opacity-80">
              <p className="mb-2">{t('footer.address')}</p>
              <p className="mb-2">{t('footer.phone')}: +509 4747-4747</p>
              <p>Email: info@geolinkservices.com</p>
            </address>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-accent">{t('footer.services')}</h3>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-white hover:text-secondary transition-colors duration-200">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-accent">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white hover:text-secondary transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4 text-white">{t('footer.newsletterText')}</p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">{t('footer.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-white bg-transparent border border-white"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full footer-button py-2 px-4 rounded"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section with social links and copyright */}
        <div className="pt-8 footer-bottom flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0 footer-social">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-colors duration-200"
                aria-label={social.name}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {social.icon === 'facebook' && (
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  )}
                  {social.icon === 'twitter' && (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  )}
                  {social.icon === 'linkedin' && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )}
                  {social.icon === 'instagram' && (
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-white">
            © {currentYear} Geolink Consulting and Services. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}