import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useService } from '../../queries/useServices';
import { useProjects } from '../../queries/useProjects';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

export default function ServiceDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');
  
  const { service, isLoading: serviceLoading, error: serviceError } = useService(slug);
  const { projects, isLoading: projectsLoading } = useProjects({ 
    serviceSlug: slug,
    limit: 3 
  });

  if (serviceLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (serviceError || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{t('errors.notFound')}</p>
          </div>
          <Link href="/services" className="text-blue-600 hover:underline">
            {t('common.backToServices')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={service.name}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <Link href="/services" className="text-blue-600 hover:underline mb-4 inline-block">
            ← {t('common.backToServices')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {service.name}
          </h1>
          <p className="text-xl text-gray-600">
            {service.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.details || '' }} />
            </div>

            {/* Service Process */}
            {service.process && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('services.processTitle')}
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Key Benefits */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('services.benefitsTitle')}
              </h3>
              <ul className="space-y-3">
                {service.benefits && service.benefits.map((benefit, index) => (
                  <li key={index} className="flex">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-green-500 flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="ml-2 text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('services.contactTitle')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('services.contactDescription')}
              </p>
              <Link
                href="/contact"
                className="block text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t('services.contactButton')}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('services.relatedProjects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.slug} className="flex flex-col h-full">
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.client}</p>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {project.shortDescription}
                    </p>
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      {t('common.viewProject')}
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
          </div>
        )}

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('services.faqTitle')}
            </h2>
            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('services.ctaDescription')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('services.ctaButton')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  // This would usually fetch all service slugs from the API
  // For now, we'll return an empty array which means all pages will be generated on-demand
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale, params }) {
  // This would usually fetch the service data for prerendering
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
