import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getWorkshops, getWorkshopBySlug, registerForWorkshop } from '../lib/supabase';

// Hook to get all upcoming workshops
export const useWorkshops = () => {
  return useQuery('workshops', async () => {
    const { workshops, error } = await getWorkshops();
    
    if (error) {
      throw new Error(error);
    }
    
    return workshops;
  });
};

// Hook to get a single workshop by slug
export const useWorkshop = (slug) => {
  return useQuery(['workshop', slug], async () => {
    const { workshop, error } = await getWorkshopBySlug(slug);
    
    if (error) {
      throw new Error(error);
    }
    
    return workshop;
  }, {
    // Don't run the query if no slug is provided
    enabled: !!slug,
  });
};

// Hook to register for a workshop
export const useWorkshopRegistration = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ workshopId, userId, registrationData }) => {
      const { success, registration, error } = await registerForWorkshop(
        workshopId,
        userId,
        registrationData
      );
      
      if (error) {
        throw new Error(error);
      }
      
      return registration;
    },
    {
      // On success, invalidate the workshops query to refresh data
      onSuccess: () => {
        queryClient.invalidateQueries('workshops');
      },
    }
  );
};