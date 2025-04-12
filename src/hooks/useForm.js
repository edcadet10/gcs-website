import { useState } from 'react';

export const useForm = (initialValues = {}, validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : value;
    
    setValues({
      ...values,
      [name]: inputValue,
    });
    
    setTouched({
      ...touched,
      [name]: true,
    });
    
    // Validate on change if needed
    if (validateOnChange) {
      validate({ ...values, [name]: inputValue });
    }
  };
  
  // Handle form blur
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true,
    });
    
    // Validate the field on blur
    validate({ ...values }, [name]);
  };
  
  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };
  
  // Set specific field value
  const setFieldValue = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };
  
  // Set specific field error
  const setFieldError = (field, error) => {
    setErrors({
      ...errors,
      [field]: error,
    });
  };
  
  // Set form to submitting
  const setSubmitting = (submitting) => {
    setIsSubmitting(submitting);
  };
  
  // Validate form or specific fields
  const validate = (data = values, fields = null) => {
    // This is a placeholder for validation logic
    // You would implement your own validation rules here
    // or use a validation library
    
    // Example validation for required fields
    const newErrors = {};
    
    Object.keys(data).forEach((key) => {
      // Only validate specified fields or all if not specified
      if (!fields || fields.includes(key)) {
        if (data[key] === '' || data[key] === null || data[key] === undefined) {
          newErrors[key] = 'This field is required';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (submitFn) => {
    setIsSubmitting(true);
    
    // Validate all fields before submission
    const isValid = validate();
    
    if (isValid) {
      try {
        await submitFn(values);
      } catch (error) {
        console.error('Form submission error:', error);
        
        // Handle submission error
        if (error.fieldErrors) {
          setErrors(error.fieldErrors);
        }
      }
    }
    
    setIsSubmitting(false);
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setSubmitting,
    validate,
  };
};