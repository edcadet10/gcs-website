import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function Mission() {
  const { t } = useTranslation('about');
  
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              {t('mission.title')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                {t('mission.paragraph1')}
              </p>
              <p className="mb-4">
                {t('mission.paragraph2')}
              </p>
              <p>
                {t('mission.paragraph3')}
              </p>
            </div>
          </div>
          
          <div className="relative h-80 lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/images/about/mission.jpg"
              alt={t('mission.imageAlt')}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stats */}
          <div>
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-lg text-gray-600">{t('stats.years')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-lg text-gray-600">{t('stats.projects')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-lg text-gray-600">{t('stats.organizations')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-lg text-gray-600">{t('stats.trainees')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}