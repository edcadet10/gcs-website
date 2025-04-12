import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '../components/layout/Layout';
import Hero from '../components/sections/home/Hero';
import ServicePreview from '../components/sections/home/ServicePreview';
import Testimonials from '../components/sections/home/Testimonials';
import LatestProjects from '../components/sections/home/LatestProjects';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <Layout title={t('meta.title')} description={t('meta.description')}>
      <Hero />
      <ServicePreview />
      <LatestProjects />
      <Testimonials />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}