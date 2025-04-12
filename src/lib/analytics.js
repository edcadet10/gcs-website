// Simple analytics implementation for the GCS website
// This can be replaced with a more robust solution like Google Analytics if needed

// Initialize analytics
export const initAnalytics = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Create or retrieve the analytics ID
  let analyticsId = localStorage.getItem('gcs_analytics_id');
  if (!analyticsId) {
    analyticsId = generateUniqueId();
    localStorage.setItem('gcs_analytics_id', analyticsId);
  }

  // Log page view on init
  logPageView();
  
  // Add event listeners for navigation
  if (typeof window.history !== 'undefined') {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      logPageView();
    };

    window.addEventListener('popstate', logPageView);
  }
};

// Generate a unique ID for the user
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

// Log page view
export const logPageView = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  const path = window.location.pathname;
  const referrer = document.referrer;
  const timestamp = new Date().toISOString();
  
  const pageViewData = {
    path,
    referrer,
    timestamp,
    analyticsId: localStorage.getItem('gcs_analytics_id'),
    userAgent: navigator.userAgent,
    screenWidth: window.innerWidth,
    language: navigator.language,
    // Add any other data points you want to track
  };
  
  // In a real implementation, you would send this data to your analytics endpoint
  // For now, we'll just log it to the console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', pageViewData);
  } else {
    // In production, send to your analytics API
    sendAnalyticsData('pageView', pageViewData);
  }
};

// Log custom events
export const logEvent = (eventName, eventData = {}) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  const timestamp = new Date().toISOString();
  const path = window.location.pathname;
  
  const fullEventData = {
    ...eventData,
    eventName,
    path,
    timestamp,
    analyticsId: localStorage.getItem('gcs_analytics_id'),
  };
  
  // In a real implementation, you would send this data to your analytics endpoint
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', fullEventData);
  } else {
    // In production, send to your analytics API
    sendAnalyticsData('event', fullEventData);
  }
};

// Send data to analytics API
const sendAnalyticsData = async (type, data) => {
  try {
    // This would be your analytics API endpoint
    // Use Netlify functions to handle the data and store in Supabase
    const response = await fetch('/.netlify/functions/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Analytics API error');
    }
  } catch (error) {
    // Silently fail - analytics should never break the user experience
    console.error('Analytics error:', error);
  }
};

// Common events
export const events = {
  CLICK_LINK: 'click_link',
  DOWNLOAD_RESOURCE: 'download_resource',
  WORKSHOP_REGISTER: 'workshop_register',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  LANGUAGE_CHANGE: 'language_change',
  SEARCH: 'search',
  FILTER: 'filter',
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  SIGN_OUT: 'sign_out',
};

// Usage examples:
// initAnalytics() - Call this in _app.jsx
// logEvent(events.CLICK_LINK, { destination: url }) - Track link clicks
// logEvent(events.DOWNLOAD_RESOURCE, { resourceId, resourceName }) - Track downloads