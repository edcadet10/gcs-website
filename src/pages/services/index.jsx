import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { useServices } from '../../queries/useServices';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

export default function Services() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <Layout title={t('services.title')}>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={t('services.title')}>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{t('errors.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t('services.title')}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <span className="text-lg font-bold">{service.icon || '📊'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {t('common.learnMore')}
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
