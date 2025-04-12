import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { signUp, error: authError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);
    
    // Validate form
    if (!email || !password || !confirmPassword) {
      setError(t('register.errorEmptyFields'));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('register.errorPasswordMismatch'));
      return;
    }
    
    if (password.length < 8) {
      setError(t('register.errorPasswordLength'));
      return;
    }
    
    // Submit form
    try {
      setIsLoading(true);
      const user = await signUp(email, password);
      
      if (user) {
        setSuccess(true);
        // Redirect to login after success
        setTimeout(() => {
          router.push('/account/login');
        }, 3000);
      } else {
        setError(authError || t('register.errorGeneric'));
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(t('register.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout title={t('register.title')} description={t('register.description')}>
      <section className="section bg-white">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 text-center">
              {t('register.title')}
            </h1>
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 text-green-600 p-3 rounded-md text-sm">
                {t('register.successMessage')}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  {t('register.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || success}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('register.emailPlaceholder')}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  {t('register.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || success}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('register.passwordPlaceholder')}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t('register.passwordRequirements')}
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                  {t('register.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || success}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('register.confirmPasswordPlaceholder')}
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading || success}
              >
                {isLoading ? t('register.registering') : t('register.register')}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  {t('register.haveAccount')}{' '}
                  <Link 
                    href="/account/login"
                    className="text-secondary hover:underline"
                  >
                    {t('register.login')}
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