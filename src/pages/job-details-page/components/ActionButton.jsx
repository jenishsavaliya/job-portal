import React from 'react';
import Icon from '../../../components/AppIcon';

const ActionButton = ({ 
  children, 
  variant = 'primary', 
  icon, 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm",
    secondary: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500",
    outline: "border border-primary text-primary bg-white hover:bg-primary-light focus:ring-primary"
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={18} 
          className={children ? "mr-2" : ""} 
        />
      )}
      {children}
    </button>
  );
};

export default ActionButton;