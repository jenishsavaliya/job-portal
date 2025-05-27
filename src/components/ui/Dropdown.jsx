import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'single',
  searchable = false,
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  maxHeight = '200px',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(
    variant === 'multi' ? (Array.isArray(value) ? value : []) : value
  );
  
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        (typeof option === 'string' ? option : option.label)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : options;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleOptionClick = (option) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    
    if (variant === 'multi') {
      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      
      setSelectedValues(newSelectedValues);
      if (onChange) {
        onChange(newSelectedValues);
      }
    } else {
      setSelectedValues(optionValue);
      setIsOpen(false);
      setSearchTerm('');
      if (onChange) {
        onChange(optionValue);
      }
    }
  };

  const handleRemoveValue = (valueToRemove, e) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(v => v !== valueToRemove);
    setSelectedValues(newSelectedValues);
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const getDisplayValue = () => {
    if (variant === 'multi') {
      return selectedValues.length > 0 
        ? `${selectedValues.length} selected`
        : placeholder;
    }
    
    if (selectedValues) {
      const selectedOption = options.find(option => 
        (typeof option === 'string' ? option : option.value) === selectedValues
      );
      return typeof selectedOption === 'string' 
        ? selectedOption 
        : selectedOption?.label || selectedValues;
    }
    
    return placeholder;
  };

  const isSelected = (option) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    return variant === 'multi' 
      ? selectedValues.includes(optionValue)
      : selectedValues === optionValue;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative w-full bg-white border rounded-lg px-3 py-2 text-left cursor-pointer
          focus:outline-none focus:ring-1 transition-colors duration-200
          ${error 
            ? 'border-error focus:border-error focus:ring-error' 
            : isOpen 
              ? 'border-primary focus:border-primary focus:ring-primary' :'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-50' : ''}
        `}
        {...props}
      >
        <span className={`block truncate ${
          (variant === 'single' && !selectedValues) || 
          (variant === 'multi' && selectedValues.length === 0)
            ? 'text-gray-500' :'text-gray-900'
        }`}>
          {getDisplayValue()}
        </span>
        
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-gray-400" 
          />
        </span>
      </button>

      {/* Multi-select Tags */}
      {variant === 'multi' && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedValues.map((value) => {
            const option = options.find(opt => 
              (typeof opt === 'string' ? opt : opt.value) === value
            );
            const displayLabel = typeof option === 'string' ? option : option?.label || value;
            
            return (
              <span
                key={value}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-light text-primary"
              >
                {displayLabel}
                <button
                  type="button"
                  onClick={(e) => handleRemoveValue(value, e)}
                  className="ml-1 text-primary hover:text-primary-hover"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-200 rounded-lg">
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={16} className="text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchTerm ? 'No options found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionLabel = typeof option === 'string' ? option : option.label;
                const selected = isSelected(option);
                
                return (
                  <button
                    key={optionValue || index}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 
                      focus:outline-none transition-colors duration-150
                      ${selected ? 'bg-primary-light text-primary' : 'text-gray-900'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{optionLabel}</span>
                      {variant === 'multi' && selected && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;