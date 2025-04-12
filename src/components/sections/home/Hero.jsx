import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Button from '../../ui/Button';

// This is a simplified version. In a real implementation, you would use Leaflet
// for interactive map background, but for now we'll use a static image
export default function Hero() {
  const { t } = useTranslation('home');
  const router = useRouter();
  const mapContainerRef = useRef(null);
  
  // In a full implementation, you would initialize Leaflet map here
  useEffect(() => {
  // Check if we're in the browser
  if (typeof window === 'undefined' || !mapContainerRef.current) return;
  
  // Simply let the body background show through
  const container = mapContainerRef.current;
  container.classList.add('bg-transparent');
  
  return () => {};
  }, []);
  
  // Navigate to services
  const handleDiscoverServices = () => {
    router.push('/services');
  };
  
  // Navigate to workshops
  const handleWorkshopSignup = () => {
    router.push('/workshops');
  };
  
  return (
    <div className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Map background */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* No overlay gradient, just transparent background */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50"></div> */}
      
      {/* Hero content */}
      <div className="relative h-full container-custom flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline-white"
              size="lg"
              onClick={handleDiscoverServices}
              className="btn-transparent"
            >
              {t('hero.discoverServices')}
            </Button>
            <Button
              variant="accent"
              size="lg"
              onClick={handleWorkshopSignup}
              className="btn-theme"
            >
              {t('hero.workshopSignup')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Down arrow for scrolling */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}