import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <Layout title={t('notFound.title')} description={t('notFound.description')}>
      <section className="section bg-white">
        <div className="container-custom max-w-2xl text-center py-12 md:py-24">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-700 mb-6">
            {t('notFound.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            {t('notFound.message')}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Button 
              variant="primary" 
              href="/"
              size="lg"
            >
              {t('notFound.backToHome')}
            </Button>
            <Button 
              variant="outline-primary" 
              href="/contact"
              size="lg"
            >
              {t('notFound.contactUs')}
            </Button>
          </div>
        </div>
      </section>
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