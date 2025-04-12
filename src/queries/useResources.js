import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getResources, getResourceById, trackResourceDownload } from '../lib/supabase';

// Hook to get all resources (public or all if authenticated)
export const useResources = (isPublic = true) => {
  return useQuery(['resources', { isPublic }], async () => {
    const { resources, error } = await getResources(isPublic);
    
    if (error) {
      throw new Error(error);
    }
    
    return resources;
  });
};

// Hook to get a single resource by ID
export const useResource = (id) => {
  return useQuery(['resource', id], async () => {
    const { resource, error } = await getResourceById(id);
    
    if (error) {
      throw new Error(error);
    }
    
    return resource;
  }, {
    // Don't run the query if no ID is provided
    enabled: !!id,
  });
};

// Hook to track resource downloads
export const useTrackDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ resourceId, userId }) => {
      const { success, error } = await trackResourceDownload(resourceId, userId);
      
      if (error) {
        throw new Error(error);
      }
      
      return success;
    },
    {
      // On success, invalidate the specific resource query to refresh data
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['resource', variables.resourceId]);
      },
    }
  );
};