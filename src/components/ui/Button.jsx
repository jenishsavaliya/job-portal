import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    link: 'text-primary hover:text-primary-hover underline-offset-4 hover:underline focus:ring-primary',
    success: 'bg-success text-white hover:bg-green-700 focus:ring-success',
    warning: 'bg-warning text-white hover:bg-amber-600 focus:ring-warning',
    error: 'bg-error text-white hover:bg-red-700 focus:ring-error',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-4 py-2 text-sm rounded-lg',
    large: 'px-6 py-3 text-base rounded-lg',
    icon: 'p-2 rounded-lg',
  };

  const iconSizeMap = {
    small: 16,
    medium: 18,
    large: 20,
    icon: 20,
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const iconSize = iconSizeMap[size];

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <Icon 
          name="Loader2" 
          size={iconSize} 
          className={`animate-spin ${children ? 'mr-2' : ''}`} 
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={iconSize} 
          className={children ? 'mr-2' : ''} 
        />
      )}
      
      {children && <span>{children}</span>}
      
      {!loading && icon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={iconSize} 
          className={children ? 'ml-2' : ''} 
        />
      )}
    </button>
  );
};

export default Button;