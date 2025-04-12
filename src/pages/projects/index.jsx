import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useProjects } from '@/queries/useProjects';
import { useServices } from '@/queries/useServices';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';

export default function Projects() {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjects();
  const { services, isLoading: servicesLoading } = useServices();

  const isLoading = projectsLoading || servicesLoading;

  // Filter projects based on selected service
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects?.filter(project => project.serviceSlug === activeFilter);

  if (isLoading) {
    return (
      <Layout title={t('projects.title')}>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (projectsError) {
    return (
      <Layout title={t('projects.title')}>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{t('errors.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('projects.title')}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {t('projects.allProjects')}
          </button>
          
          {services && services.map((service) => (
            <button
              key={service.slug}
              onClick={() => setActiveFilter(service.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === service.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col h-full overflow-hidden">
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {project.category || project.serviceSlug}
                    </span>
                    {project.location && (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full ml-2">
                        {project.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-gray-700 font-medium mb-2">
                      {t('projects.client')}: {project.client}
                    </p>
                  )}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {project.shortDescription}
                  </p>
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center mt-auto"
                  >
                    {t('common.viewDetails')}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {t('projects.noProjects')}
            </p>
          </div>
        )}

        {/* Map View Toggle (Placeholder) */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
              />
            </svg>
            {t('projects.viewMap')}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            {t('projects.mapDescription')}
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('projects.ctaTitle')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('projects.ctaDescription')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('projects.ctaButton')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
