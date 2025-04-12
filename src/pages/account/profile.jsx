import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, signOut } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/account/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router, isLoading]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <Layout title={t('profile.title')} description={t('profile.description')}>
        <section className="section">
          <div className="container-custom">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  
  // Show profile if logged in
  return (
    <Layout title={t('profile.title')} description={t('profile.description')}>
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                {t('profile.title')}
              </h1>
              <Button 
                variant="outline-primary"
                onClick={handleSignOut}
              >
                {t('profile.signOut')}
              </Button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('profile.accountInfo')}</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">{t('profile.email')}</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.memberSince')}</p>
                  <p className="font-medium">
                    {user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('profile.yourWorkshops')}</h2>
                <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-gray-500">{t('profile.noWorkshops')}</p>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="secondary"
                    href="/workshops"
                  >
                    {t('profile.browseWorkshops')}
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('profile.recentDownloads')}</h2>
                <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
                  <p className="text-gray-500">{t('profile.noDownloads')}</p>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="secondary"
                    href="/resources"
                  >
                    {t('profile.browseResources')}
                  </Button>
                </div>
              </div>
            </div>
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