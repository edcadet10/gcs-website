// Registration function using Netlify Functions
const { supabase } = require('../../utils/supabase-client');
const { upsertProfile } = require('../../utils/supabase-admin');

// Simple email validation
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Password strength validation
const isStrongPassword = (password) => {
  // Password should be at least 8 characters with at least one uppercase, lowercase, number and special character
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return strongPasswordPattern.test(password);
};

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { email, password, full_name, organization } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !password || !full_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email, password, and full name are required' }),
      };
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' 
        }),
      };
    }

    // Register with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Additional user metadata
        data: {
          full_name,
          organization,
        },
      },
    });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    // Create or update user profile in profiles table
    const { profile, error: profileError } = await upsertProfile({
      id: data.user.id,
      email: data.user.email,
      full_name,
      organization,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Not returning error as user was created successfully
    }

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Registration successful',
        user: data.user,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred during registration',
      }),
    };
  }
};