import Link from 'next/link';
import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Determine button styling based on variant
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white',
    accent: 'bg-accent hover:bg-accent-dark text-white',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    'outline-white': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary',
    'outline-secondary': 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // Determine button size
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
    xl: 'py-4 px-8 text-xl',
  };

  // Combine all styles
  const buttonStyles = `
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    rounded-md font-medium transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link 
        href={href}
        className={buttonStyles}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;