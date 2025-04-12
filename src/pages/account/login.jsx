import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { signIn, error: authError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error states
    setError('');
    
    // Validate form
    if (!email || !password) {
      setError(t('login.errorEmptyFields'));
      return;
    }
    
    // Submit form
    try {
      setIsLoading(true);
      const user = await signIn(email, password);
      
      if (user) {
        // Redirect to dashboard or homepage
        router.push('/');
      } else {
        setError(authError || t('login.errorInvalidCredentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t('login.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout title={t('login.title')} description={t('login.description')}>
      <section className="section bg-white">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 text-center">
              {t('login.title')}
            </h1>
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  {t('login.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('login.emailPlaceholder')}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  {t('login.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('login.passwordPlaceholder')}
                />
              </div>
              
              <div className="flex justify-end">
                <Link 
                  href="/account/reset-password"
                  className="text-sm text-secondary hover:underline"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t('login.loggingIn') : t('login.login')}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  {t('login.noAccount')}{' '}
                  <Link 
                    href="/account/register"
                    className="text-secondary hover:underline"
                  >
                    {t('login.register')}
                  </Link>
                </p>
              </div>
            </form>
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