// Contact form handler using Netlify Functions
const { supabase } = require('../utils/supabase-admin');

// Simple email validation
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Create a new contact submission in Supabase
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          subject: subject || 'Contact Form Submission',
          message,
          submission_date: new Date().toISOString(),
          ip_address: event.headers['client-ip'] || '',
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Error saving to database');
    }

    // In a real implementation, you would also send an email notification
    // using a service like SendGrid, AWS SES, or a similar service
    
    // Example of email sending code (commented out)
    /*
    const emailService = require('../utils/email-service');
    await emailService.sendEmail({
      to: 'info@geolinkservices.com',
      subject: `New Contact Form Submission: ${subject || 'Contact Form'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred when processing your request',
        error: error.message,
      }),
    };
  }
};