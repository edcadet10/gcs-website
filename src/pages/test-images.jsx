import React from 'react';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loader from '../components/ui/Loader';

export default function TestImages() {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Test Images Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo Images */}
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Logo Images</h2>
            <div className="bg-white p-4 mb-4">
              <div className="relative h-16 w-48" style={{ position: 'relative', height: '4rem', width: '12rem' }}>
                <Image 
                  src="/logo.svg" 
                  alt="GCS Logo" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="bg-primary p-4">
              <div className="relative h-16 w-48" style={{ position: 'relative', height: '4rem', width: '12rem' }}>
                <Image 
                  src="/logo-white.svg" 
                  alt="GCS Logo White" 
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          
          {/* Project Images */}
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Project Images</h2>
            <div className="space-y-4">
              <div className="aspect-video relative" style={{ position: 'relative', minHeight: '200px' }}>
                <Image
                  src="/assets/images/projects/vulnerability-mapping-1.jpg"
                  alt="Vulnerability Mapping"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="aspect-video relative" style={{ position: 'relative', minHeight: '200px' }}>
                <Image
                  src="/assets/images/projects/solar-mapping-1.jpg"
                  alt="Solar Mapping"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="aspect-video relative" style={{ position: 'relative', minHeight: '200px' }}>
                <Image
                  src="/assets/images/projects/agricultural-monitoring-1.jpg"
                  alt="Agricultural Monitoring"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          
          {/* Testimonial Images */}
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Testimonial Images</h2>
            <div className="flex space-x-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300" style={{ position: 'relative', height: '5rem', width: '5rem' }}>
                <Image 
                  src="/assets/images/testimonials/pnud.jpg" 
                  alt="PNUD" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300" style={{ position: 'relative', height: '5rem', width: '5rem' }}>
                <Image 
                  src="/assets/images/testimonials/usaid.jpg" 
                  alt="USAID" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300" style={{ position: 'relative', height: '5rem', width: '5rem' }}>
                <Image 
                  src="/assets/images/testimonials/digicel.jpg" 
                  alt="Digicel" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          
          {/* Map Images */}
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Map Images</h2>
            <div className="space-y-4">
              <div className="h-40 relative" style={{ position: 'relative', height: '10rem' }}>
                <Image
                  src="/assets/images/map-placeholder.jpg"
                  alt="Map Placeholder"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="h-40 relative" style={{ position: 'relative', height: '10rem' }}>
                <Image
                  src="/assets/images/map-background.jpg"
                  alt="Map Background"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          
          {/* UI Images */}
          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">UI Images</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">GCS Loader Image</h3>
                <div className="relative h-40 bg-gray-100 p-4 flex items-center justify-center" style={{ position: 'relative' }}>
                  <div className="relative w-20 h-20" style={{ position: 'relative', height: '5rem', width: '5rem' }}>
                    <Image
                      src="/assets/images/ui/gcs-loader-image.png"
                      alt="GCS Loader"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Loader Component</h4>
                  <div className="flex items-center space-x-6">
                    <Loader size="sm" />
                    <Loader size="md" />
                    <Loader size="lg" />
                    <Loader size="xl" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Website Background</h3>
                <div className="h-40 relative" style={{ position: 'relative', height: '10rem' }}>
                  <Image
                    src="/assets/images/ui/gcs-website-bg.png"
                    alt="Website Background"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
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