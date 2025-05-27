import React, { useState, forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  error,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  showClearButton = false,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
    if (onClear) {
      onClear();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = value && value.length > 0;
  const showClear = showClearButton && hasValue && !disabled;
  const isPassword = type === 'password';

  const baseInputClasses = `
    block w-full px-3 py-2 border rounded-lg text-sm placeholder-gray-500 
    transition-colors duration-200 focus:outline-none focus:ring-1 
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error 
      ? 'border-error focus:border-error focus:ring-error' 
      : isFocused 
        ? 'border-primary focus:border-primary focus:ring-primary' :'border-gray-300 hover:border-gray-400'
    }
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${(showClear || isPassword) ? 'pr-10' : ''}
    ${icon && iconPosition === 'right' && !showClear && !isPassword ? 'pr-10' : ''}
    ${inputClassName}
  `.trim();

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon 
              name={icon} 
              size={18} 
              className={error ? 'text-error' : 'text-gray-400'} 
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputClasses}
          {...props}
        />

        {/* Right Side Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {/* Clear Button */}
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none mr-1"
              tabIndex={-1}
            >
              <Icon name="X" size={16} />
            </button>
          )}

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          )}

          {/* Right Icon (when not password or clear) */}
          {icon && iconPosition === 'right' && !showClear && !isPassword && (
            <Icon 
              name={icon} 
              size={18} 
              className={error ? 'text-error' : 'text-gray-400'} 
            />
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;