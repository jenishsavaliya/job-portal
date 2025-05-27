import React from "react";
import Icon from "components/AppIcon";
import ValidationMessages from "./ValidationMessages";

const FormFields = ({ data, onChange, errors, onFieldBlur }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Personal Information
        </h3>
        <p className="text-text-secondary mb-6">
          Please provide your basic contact information. Fields marked with * are required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="User" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={(e) => onFieldBlur('fullName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${
                errors.fullName ? 'border-error' : 'border-border'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && <ValidationMessages message={errors.fullName} />}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => onFieldBlur('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${
                errors.email ? 'border-error' : 'border-border'
              }`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <ValidationMessages message={errors.email} />}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Phone" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={(e) => onFieldBlur('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${
                errors.phone ? 'border-error' : 'border-border'
              }`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && <ValidationMessages message={errors.phone} />}
        </div>

        {/* LinkedIn URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            LinkedIn Profile URL <span className="text-text-tertiary">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Linkedin" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="url"
              value={data.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              onBlur={(e) => onFieldBlur('linkedinUrl', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${
                errors.linkedinUrl ? 'border-error' : 'border-border'
              }`}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          {errors.linkedinUrl && <ValidationMessages message={errors.linkedinUrl} />}
        </div>

        {/* Cover Letter */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Cover Letter <span className="text-text-tertiary">(Optional)</span>
          </label>
          <textarea
            value={data.coverLetter}
            onChange={(e) => handleInputChange('coverLetter', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 resize-none"
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
          />
          <p className="text-xs text-text-tertiary mt-2">
            Optional: Share your motivation and relevant experience (max 500 characters)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormFields;