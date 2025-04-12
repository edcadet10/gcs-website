// Generate signed URL for resource download
const { getResourceSignedUrl, trackResourceDownload } = require('../../utils/supabase-admin');

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
    const { resourceId, filePath, userId } = JSON.parse(event.body);

    // Validate required fields
    if (!resourceId || !filePath) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Resource ID and file path are required' }),
      };
    }

    // Get the signed URL for the resource
    const { signedUrl, error: urlError } = await getResourceSignedUrl(filePath);

    if (urlError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: urlError }),
      };
    }

    // Track the download (async - don't wait for completion)
    trackResourceDownload(resourceId, userId, {
      ip: event.headers['client-ip'] || '',
      referrer: event.headers.referer || '',
      userAgent: event.headers['user-agent'] || '',
    }).catch(error => {
      console.error('Error tracking download:', error);
    });

    // Return success response with signed URL
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: signedUrl,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An error occurred processing your download request',
      }),
    };
  }
};