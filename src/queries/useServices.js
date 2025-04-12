import { useQuery } from 'react-query';
import { getServices, getServiceBySlug } from '../lib/supabase';

// Hook to get all services
export const useServices = () => {
  return useQuery('services', async () => {
    const { services, error } = await getServices();
    
    if (error) {
      throw new Error(error);
    }
    
    return services;
  });
};

// Hook to get a single service by slug
export const useService = (slug) => {
  return useQuery(['service', slug], async () => {
    const { service, error } = await getServiceBySlug(slug);
    
    if (error) {
      throw new Error(error);
    }
    
    return service;
  }, {
    // Don't run the query if no slug is provided
    enabled: !!slug,
  });
};