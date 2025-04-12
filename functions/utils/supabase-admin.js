// Server-side Supabase client with admin privileges
const { createClient } = require('@supabase/supabase-js');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    'Missing Supabase environment variables. Check your .env file.'
  );
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to handle errors
const handleSupabaseError = (error) => {
  console.error('Supabase admin error:', error.message);
  return {
    error: error.message || 'An unexpected error occurred',
  };
};

// Get user by ID
const getUserById = async (userId) => {
  try {
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
};

// Create or update user profile
const upsertProfile = async (profile) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'id' });
      
    if (error) throw error;
    return { profile: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    // First, delete user's profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
      
    if (profileError) throw profileError;
    
    // Then delete the auth user (if we have admin access)
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) throw authError;
    
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Get resource signed URL (for protected downloads)
const getResourceSignedUrl = async (filePath) => {
  try {
    const { data, error } = await supabase
      .storage
      .from('resources')
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry
      
    if (error) throw error;
    return { signedUrl: data.signedUrl };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Track resource download
const trackResourceDownload = async (resourceId, userId, metadata = {}) => {
  try {
    const { data, error } = await supabase
      .from('resource_downloads')
      .insert([
        {
          resource_id: resourceId,
          user_id: userId || null, // Allow anonymous downloads
          download_date: new Date().toISOString(),
          metadata,
        },
      ]);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Register for workshop
const registerForWorkshop = async (workshopId, userId, registrationData) => {
  try {
    // Check if already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from('workshop_registrations')
      .select('id')
      .eq('workshop_id', workshopId)
      .eq('user_id', userId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') {
      // Error other than "no rows returned"
      throw checkError;
    }
    
    if (existingRegistration) {
      return { 
        error: 'User already registered for this workshop',
        registration: existingRegistration,
      };
    }
    
    // Register for workshop
    const { data, error } = await supabase
      .from('workshop_registrations')
      .insert([
        {
          workshop_id: workshopId,
          user_id: userId,
          payment_status: 'pending',
          ...registrationData,
          registration_date: new Date().toISOString(),
        },
      ]);
      
    if (error) throw error;
    return { success: true, registration: data[0] };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Update workshop registration
const updateWorkshopRegistration = async (registrationId, updates) => {
  try {
    const { data, error } = await supabase
      .from('workshop_registrations')
      .update(updates)
      .eq('id', registrationId);
      
    if (error) throw error;
    return { success: true, registration: data[0] };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Handle contact form submission
const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          submission_date: new Date().toISOString(),
        },
      ]);
      
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Export the supabase client and utility functions
module.exports = {
  supabase,
  getUserById,
  upsertProfile,
  deleteUser,
  getResourceSignedUrl,
  trackResourceDownload,
  registerForWorkshop,
  updateWorkshopRegistration,
  submitContactForm,
};