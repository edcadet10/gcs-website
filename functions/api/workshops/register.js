// Workshop registration function using Netlify Functions
const { registerForWorkshop } = require('../../utils/supabase-admin');

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
    const { workshopId, userId, registrationData } = JSON.parse(event.body);

    // Validate required fields
    if (!workshopId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Workshop ID and user ID are required' }),
      };
    }

    // Register for workshop
    const { success, registration, error } = await registerForWorkshop(
      workshopId,
      userId,
      registrationData
    );

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error }),
      };
    }

    // Initialize payment process (in a real implementation)
    // Here we'd typically generate a payment link or redirect to payment service
    
    // For now, we'll just return success with a mocked payment URL
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        registration,
        paymentUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/workshops/registration/payment?regId=${registration.id}`,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred processing your registration',
      }),
    };
  }
};