import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useProject } from '@/queries/useProjects';
import Loader from '@/components/ui/Loader';
import Card from '@/components/ui/Card';

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');
  const { project, relatedProjects, isLoading, error } = useProject(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{t('errors.notFound')}</p>
          </div>
          <Link href="/projects" className="text-blue-600 hover:underline">
            {t('common.backToProjects')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={project.title}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <Link href="/projects" className="text-blue-600 hover:underline mb-4 inline-block">
            ← {t('common.backToProjects')}
          </Link>
        </div>
        
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-2">
              {project.category || project.serviceSlug}
            </span>
            {project.location && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                {project.location}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {project.title}
          </h1>

          {project.client && (
            <p className="text-xl text-gray-700 mb-6">
              {t('projects.client')}: <span className="font-medium">{project.client}</span>
            </p>
          )}
        </div>

        {/* Featured Image */}
        {project.imageUrl && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-2">
            {/* Project Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('projects.overview')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Challenge */}
            {project.challenge && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('projects.challenge')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{project.challenge}</p>
                </div>
              </div>
            )}

            {/* Approach */}
            {project.approach && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('projects.approach')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{project.approach}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('projects.results')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{project.results}</p>
                </div>
              </div>
            )}

            {/* Project Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('projects.gallery')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={image.url} 
                        alt={image.caption || `${project.title} - ${index + 1}`}
                        className="w-full h-auto"
                      />
                      {image.caption && (
                        <div className="p-3 bg-gray-50">
                          <p className="text-sm text-gray-600">{image.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('projects.projectDetails')}
              </h3>
              <div className="space-y-3">
                {project.date && (
                  <div>
                    <p className="text-sm text-gray-500">{t('projects.date')}</p>
                    <p className="text-gray-700 font-medium">{project.date}</p>
                  </div>
                )}
                {project.location && (
                  <div>
                    <p className="text-sm text-gray-500">{t('projects.location')}</p>
                    <p className="text-gray-700 font-medium">{project.location}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <p className="text-sm text-gray-500">{t('projects.client')}</p>
                    <p className="text-gray-700 font-medium">{project.client}</p>
                  </div>
                )}
                {project.services && project.services.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">{t('projects.services')}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.services.map((service, index) => (
                        <span 
                          key={index}
                          className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Map (Placeholder) */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('projects.projectLocation')}
              </h3>
              <div className="bg-gray-200 rounded h-48 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  {t('projects.mapPlaceholder')}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t('projects.mapDescription')}
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('projects.contactTitle')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('projects.contactDescription')}
              </p>
              <Link
                href="/contact"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t('projects.contactButton')}
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {project.testimonial && (
          <div className="my-16 p-8 bg-gray-50 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <svg 
                className="h-12 w-12 text-gray-300 mb-6" 
                fill="currentColor" 
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="text-xl text-gray-700 italic mb-4">
                "{project.testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                {project.testimonial.avatarUrl && (
                  <img 
                    src={project.testimonial.avatarUrl} 
                    alt={project.testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{project.testimonial.name}</p>
                  <p className="text-gray-600">{project.testimonial.title}, {project.testimonial.organization}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('projects.relatedProjects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Card key={relatedProject.slug} className="flex flex-col h-full">
                  {relatedProject.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedProject.imageUrl} 
                        alt={relatedProject.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {relatedProject.shortDescription}
                    </p>
                    <Link 
                      href={`/projects/${relatedProject.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t('common.viewDetails')}
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

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

export async function getStaticPaths({ locales }) {
  // This would usually fetch all project slugs from the API
  // For now, we'll return an empty array which means all pages will be generated on-demand
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale, params }) {
  // This would usually fetch the project data for prerendering
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
