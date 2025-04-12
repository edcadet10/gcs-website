// Login function using Netlify Functions
const { supabase } = require('../../utils/supabase-client');

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
    const { email, password } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' }),
      };
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: error.message }),
      };
    }

    // Return the session data
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: data.user,
        session: data.session,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred during authentication',
      }),
    };
  }
};