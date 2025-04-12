import { createContext, useContext } from 'react';
import { useTranslation } from 'next-i18next';

// Form context to share form state
const FormContext = createContext({});

// Custom hook to access form context
export const useFormContext = () => useContext(FormContext);

// Main Form component
export function Form({
  children,
  onSubmit,
  className = '',
  formValues,
  formErrors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting,
  ...props
}) {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };
  
  // Form context value
  const formContextValue = {
    values: formValues,
    errors: formErrors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
  };
  
  return (
    <FormContext.Provider value={formContextValue}>
      <form
        onSubmit={handleSubmit}
        className={className}
        noValidate
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Form Field component
export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  helpText,
  options,
  disabled = false,
  ...props
}) {
  const { t } = useTranslation('common');
  const { values, errors, touched, handleChange, handleBlur } = useFormContext();
  
  // Determine if field has an error
  const hasError = touched?.[name] && errors?.[name];
  
  // Base input style
  const baseInputClass = `
    w-full px-3 py-2 rounded-md border
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${hasError 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300'}
    ${inputClassName}
  `;
  
  // Render different field types
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={values?.[name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${baseInputClass} min-h-[100px]`}
            required={required}
            disabled={disabled}
            {...props}
          />
        );
        
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={values?.[name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={baseInputClass}
            required={required}
            disabled={disabled}
            {...props}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={values?.[name] || false}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`
                w-4 h-4 text-primary 
                focus:ring-primary focus:ring-2 
                ${hasError ? 'border-red-500' : 'border-gray-300'}
              `}
              disabled={disabled}
              {...props}
            />
            <label 
              htmlFor={name} 
              className={`ml-2 text-gray-700 ${labelClassName}`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        );
        
      case 'radio':
        return options?.map((option) => (
          <div key={option.value} className="flex items-center mt-1">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={values?.[name] === option.value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
              disabled={disabled}
              {...props}
            />
            <label 
              htmlFor={`${name}-${option.value}`} 
              className="ml-2 text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ));
        
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={values?.[name] || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={baseInputClass}
            required={required}
            disabled={disabled}
            {...props}
          />
        );
    }
  };
  
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label (except for checkbox which has label after the input) */}
      {label && type !== 'checkbox' && (
        <label 
          htmlFor={name} 
          className={`block mb-1 text-gray-700 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Field */}
      {renderField()}
      
      {/* Help text */}
      {helpText && !hasError && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      
      {/* Error message */}
      {hasError && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
}

// Form Actions component for buttons
export function FormActions({ children, className = '' }) {
  return (
    <div className={`mt-6 flex justify-end space-x-3 ${className}`}>
      {children}
    </div>
  );
}

// Submit Button component
export function SubmitButton({
  children,
  isSubmitting,
  className = '',
  ...props
}) {
  const { t } = useTranslation('common');
  const { isSubmitting: contextSubmitting } = useFormContext();
  
  // Use local prop or context value
  const loading = isSubmitting !== undefined ? isSubmitting : contextSubmitting;
  
  return (
    <button
      type="submit"
      className={`
        bg-primary hover:bg-primary-dark text-white font-medium
        py-2 px-4 rounded-md transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {t('form.submitting')}
        </span>
      ) : (
        children || t('form.submit')
      )}
    </button>
  );
}