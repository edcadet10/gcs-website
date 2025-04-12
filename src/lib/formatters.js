// Date formatting utilities
export const formatDate = (dateString, locale = 'fr-FR') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString, locale = 'fr-FR') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatRelativeTime = (dateString, locale = 'fr-FR') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return locale === 'fr-FR' ? 'À l\'instant' : 'Just now';
  }
  
  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return locale === 'fr-FR' 
      ? `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}` 
      : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return locale === 'fr-FR' 
      ? `Il y a ${hours} heure${hours > 1 ? 's' : ''}` 
      : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return locale === 'fr-FR' 
      ? `Il y a ${days} jour${days > 1 ? 's' : ''}` 
      : `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  // Otherwise use standard date format
  return formatDate(dateString, locale);
};

// Currency formatting utilities
export const formatCurrency = (amount, currency = 'HTG', locale = 'fr-FR') => {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (number, locale = 'fr-FR') => {
  if (number === undefined || number === null) return '';
  
  return new Intl.NumberFormat(locale).format(number);
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

export const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .normalize('NFD') // Split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word characters except hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen
};