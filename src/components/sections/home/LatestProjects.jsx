import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import initialProjects from '../../../data/initialProjects';
import { formatDate } from '../../../lib/formatters';
import Button from '../../ui/Button';

export default function LatestProjects() {
  const { t, i18n } = useTranslation('home');
  const router = useRouter();
  const mapContainerRef = useRef(null);
  
  // Get 3 latest projects
  const latestProjects = initialProjects
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  
  // State for selected project (for map focus)
  const [selectedProject, setSelectedProject] = useState(latestProjects[0]);
  
  // In a full implementation, you would initialize Leaflet map here
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined' || !mapContainerRef.current) return;
    
    // This is where you would initialize Leaflet
    // For now, we'll just add a simple placeholder
    const container = mapContainerRef.current;
    container.classList.add('bg-cover', 'bg-center');
    // Let the body background show through by using a transparent background
    container.classList.add('bg-transparent');
    
    // In a real implementation, you would update the map center when selectedProject changes
  }, [selectedProject]);
  
  // Navigate to all projects
  const handleViewAllProjects = () => {
    router.push('/projects');
  };
  
  // Handle project selection for map focus
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };
  
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 section-title">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto section-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map column (shown on lg screens and up) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div 
              ref={mapContainerRef}
              className="h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-md mb-6"
            />
            
            <div className="hidden lg:block">
              <h3 className="text-xl font-semibold mb-2 text-white">
                {selectedProject?.title}
              </h3>
              <p className="text-white mb-4">
                {selectedProject?.shortDescription}
              </p>
              <Link 
                href={`/projects/${selectedProject?.slug}`}
                className="text-white font-medium flex items-center hover:underline"
              >
                {t('projects.viewDetails')}
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Projects column */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestProjects.map((project) => (
                <div 
                  key={project.id}
                  className={`
                    rounded-lg shadow-md overflow-hidden project-card
                    hover:shadow-lg transition-shadow duration-300
                    ${selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''}
                  `}
                  onMouseEnter={() => handleProjectSelect(project)}
                >
                  <div className="image-container-landscape">
                    <Image
                      src={project.image_urls[0]}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <span className="text-white text-sm">
                        {formatDate(project.date, i18n.language)}
                      </span>
                    </div>
                    <p className="text-white mb-3 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.services.slice(0, 3).map((serviceSlug) => {
                        const serviceData = initialProjects.find(p => p.slug === serviceSlug);
                        return (
                          <span 
                            key={serviceSlug}
                            className="text-xs bg-primary bg-opacity-50 text-white px-2 py-1 rounded-full"
                          >
                            {serviceData?.shortName || serviceSlug}
                          </span>
                        );
                      })}
                    </div>
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="text-white font-medium flex items-center hover:underline text-sm"
                    >
                      {t('projects.viewDetails')}
                      <svg 
                        className="ml-1 w-4 h-4" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAllProjects}
          >
            {t('projects.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}