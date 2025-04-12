import { createClient } from '@supabase/supabase-js';
import mockServices from '../data/mock/services';
import mockProjects from '../data/mock/projects';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client
let supabase;

// Check if Supabase URL and key are defined
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase URL or Anon Key not provided. Using mock data for development.');
  // Create a minimal mock supabase client with auth methods
  supabase = {
    auth: {
      getSession: () => ({ data: { session: null }, error: null }),
      getUser: () => ({ data: { user: null }, error: null }),
      onAuthStateChange: (callback) => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      signUp: () => ({ data: { user: null }, error: null }),
      signInWithPassword: () => ({ data: { user: null }, error: null }),
      signOut: () => ({ error: null }),
      resetPasswordForEmail: () => ({ error: null }),
      updateUser: () => ({ data: { user: null }, error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({ data: null, error: null }),
          neq: () => ({
            limit: () => ({ data: [], error: null })
          }),
          limit: () => ({ data: [], error: null })
        }),
        order: () => ({
          limit: () => ({ data: [], error: null })
        }),
        gte: () => ({
          order: () => ({ data: [], error: null })
        })
      }),
      insert: () => ({ data: [], error: null }),
      update: () => ({
        eq: () => ({ data: null, error: null })
      })
    })
  };
}

// Environment check
const isDevelopment = process.env.NODE_ENV === 'development';

// Export the supabase client to be used in other files
export { supabase };

// Helper function to handle errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error.message);
  return {
    error: error.message || 'An unexpected error occurred',
  };
};

// Check if using mock data
const useMockData = isDevelopment && (!supabase || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true');

// Get user profile data
export async function getUserProfile(userId) {
  try {
    if (useMockData) {
      return { profile: {
        id: userId,
        full_name: 'Test User',
        organization: 'Test Organization',
        bio: 'This is a test user profile for development purposes.'
      }};
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return { profile: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Update user profile data
export async function updateProfile(userId, updates) {
  try {
    if (useMockData) {
      return { success: true, data: { id: userId, ...updates } };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get services
export async function getServices() {
  try {
    if (useMockData) {
      return { services: mockServices };
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id', { ascending: true });
      
    if (error) throw error;
    return { services: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get service by slug
export async function getServiceBySlug(slug) {
  try {
    if (useMockData) {
      const service = mockServices.find(s => s.slug === slug);
      return { service };
    }
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    return { service: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get projects
export async function getProjects(options = {}) {
  try {
    if (useMockData) {
      let filteredProjects = [...mockProjects];
      
      // Apply filters
      if (options.serviceSlug) {
        filteredProjects = filteredProjects.filter(p => p.serviceSlug === options.serviceSlug);
      }
      
      // Apply limit
      if (options.limit) {
        filteredProjects = filteredProjects.slice(0, options.limit);
      }
      
      return { projects: filteredProjects };
    }
    
    let query = supabase
      .from('projects')
      .select('*');
      
    // Apply filters
    if (options.serviceSlug) {
      query = query.eq('service_slug', options.serviceSlug);
    }
    
    // Apply order
    query = query.order('date', { ascending: false });
    
    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return { projects: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get project by slug
export async function getProjectBySlug(slug) {
  try {
    if (useMockData) {
      const project = mockProjects.find(p => p.slug === slug);
      
      // Get related projects (same service)
      const relatedProjects = project 
        ? mockProjects
            .filter(p => p.serviceSlug === project.serviceSlug && p.slug !== slug)
            .slice(0, 3)
        : [];
        
      return { project, relatedProjects };
    }
    
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    
    // Get related projects (same service)
    const { data: relatedProjects, error: relatedError } = await supabase
      .from('projects')
      .select('*')
      .eq('service_slug', project.service_slug)
      .neq('slug', slug)
      .limit(3);
      
    if (relatedError) throw relatedError;
    
    return { project, relatedProjects };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get workshops
export async function getWorkshops() {
  try {
    if (useMockData) {
      return { workshops: [] }; // Add mock workshops if needed
    }
    
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });
      
    if (error) throw error;
    return { workshops: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get workshop by slug
export async function getWorkshopBySlug(slug) {
  try {
    if (useMockData) {
      return { workshop: null }; // Add mock workshop if needed
    }
    
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    return { workshop: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Register for workshop
export async function registerForWorkshop(workshopId, userId, registrationData) {
  try {
    if (useMockData) {
      return { 
        success: true, 
        registration: {
          id: 1,
          workshop_id: workshopId,
          user_id: userId,
          payment_status: 'pending',
          ...registrationData,
          registration_date: new Date().toISOString()
        } 
      };
    }
    
    const { data, error } = await supabase
      .from('workshop_registrations')
      .insert([
        {
          workshop_id: workshopId,
          user_id: userId,
          payment_status: 'pending',
          ...registrationData
        }
      ]);
      
    if (error) throw error;
    return { success: true, registration: data[0] };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get resources
export async function getResources(isPublic = true) {
  try {
    if (useMockData) {
      return { resources: [] }; // Add mock resources if needed
    }
    
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (isPublic) {
      query = query.eq('is_public', true);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    return { resources: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get resource by ID
export async function getResourceById(id) {
  try {
    if (useMockData) {
      return { resource: null }; // Add mock resource if needed
    }
    
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { resource: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Track resource download
export async function trackResourceDownload(resourceId, userId) {
  try {
    if (useMockData) {
      return { success: true };
    }
    
    const { data, error } = await supabase
      .from('resource_downloads')
      .insert([
        {
          resource_id: resourceId,
          user_id: userId,
          download_date: new Date().toISOString()
        }
      ]);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get blog posts
export async function getBlogPosts() {
  try {
    if (useMockData) {
      return { posts: [] }; // Add mock blog posts if needed
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author_id(full_name)')
      .order('published_date', { ascending: false });
      
    if (error) throw error;
    return { posts: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug) {
  try {
    if (useMockData) {
      return { post: null }; // Add mock blog post if needed
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author_id(full_name)')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    return { post: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Submit contact form
export async function submitContactForm(formData) {
  try {
    if (useMockData) {
      console.log('Mock contact form submission:', formData);
      return { success: true };
    }
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          submission_date: new Date().toISOString()
        }
      ]);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
}