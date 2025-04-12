import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function ResetPassword() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { resetPassword, error: authError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);
    
    // Validate form
    if (!email) {
      setError(t('resetPassword.errorEmptyEmail'));
      return;
    }
    
    // Submit form
    try {
      setIsLoading(true);
      const result = await resetPassword(email);
      
      if (result) {
        setSuccess(true);
      } else {
        setError(authError || t('resetPassword.errorGeneric'));
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(t('resetPassword.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout title={t('resetPassword.title')} description={t('resetPassword.description')}>
      <section className="section bg-white">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 text-center">
              {t('resetPassword.title')}
            </h1>
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="mb-6 bg-green-50 text-green-600 p-3 rounded-md">
                <p className="mb-4">{t('resetPassword.successMessage')}</p>
                <Link href="/account/login" className="text-secondary hover:underline">
                  {t('resetPassword.backToLogin')}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    {t('resetPassword.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('resetPassword.emailPlaceholder')}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t('resetPassword.instructions')}
                  </p>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? t('resetPassword.sending') : t('resetPassword.send')}
                </Button>
                
                <div className="text-center mt-4">
                  <Link 
                    href="/account/login"
                    className="text-secondary hover:underline"
                  >
                    {t('resetPassword.backToLogin')}
                  </Link>
                </div>
              </form>
            )}
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