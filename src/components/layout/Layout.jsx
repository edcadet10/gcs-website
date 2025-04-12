import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  const { t } = useTranslation('common');
  
  const pageTitle = title ? `${title} | GCS` : 'Geolink Consulting and Services (GCS)';
  const pageDescription = description || t('meta.defaultDescription');

  // No need to force background image via DOM manipulation as it's set in globals.css

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <div>
        {/* Main content */}
        <div className="flex flex-col min-h-screen relative z-10">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}