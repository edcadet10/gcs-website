import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';

import Layout from '../components/layout/Layout';
import Mission from '../components/sections/about/Mission';
import Team from '../components/sections/about/Team';
import Values from '../components/sections/about/Values';

export default function AboutPage() {
  const { t } = useTranslation('about');

  return (
    <Layout title={t('meta.title')} description={t('meta.description')}>
      <div className="py-16 md:py-24 bg-primary text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl max-w-3xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
      
      <Mission />
      <Values />
      <Team />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
}