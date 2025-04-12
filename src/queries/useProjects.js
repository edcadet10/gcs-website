import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProjects, getProjectBySlug } from '../lib/supabase';

// Hook to get all projects
export const useProjects = () => {
  return useQuery('projects', async () => {
    const { projects, error } = await getProjects();
    
    if (error) {
      throw new Error(error);
    }
    
    return projects;
  });
};

// Hook to get a single project by slug
export const useProject = (slug) => {
  return useQuery(['project', slug], async () => {
    const { project, error } = await getProjectBySlug(slug);
    
    if (error) {
      throw new Error(error);
    }
    
    return project;
  }, {
    // Don't run the query if no slug is provided
    enabled: !!slug,
  });
};