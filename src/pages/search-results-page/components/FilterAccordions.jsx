import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterAccordions = ({ filters, onFiltersChange }) => {
  const [openSections, setOpenSections] = useState({
    datePosted: true,
    experienceLevel: true,
    salaryRange: false,
    jobType: false,
    company: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      [filterType]: filters[filterType] === value ? '' : value
    });
  };

  const filterOptions = {
    datePosted: [
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'Past week' },
      { value: 'month', label: 'Past month' },
      { value: 'anytime', label: 'Anytime' }
    ],
    experienceLevel: [
      { value: 'entry', label: 'Entry level' },
      { value: 'mid-level', label: 'Mid level' },
      { value: 'senior', label: 'Senior level' },
      { value: 'executive', label: 'Executive' },
      { value: 'internship', label: 'Internship' }
    ],
    salaryRange: [
      { value: '0-50k', label: '$0 - $50,000' },
      { value: '50k-75k', label: '$50,000 - $75,000' },
      { value: '75k-100k', label: '$75,000 - $100,000' },
      { value: '100k-150k', label: '$100,000 - $150,000' },
      { value: '150k+', label: '$150,000+' }
    ],
    jobType: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'freelance', label: 'Freelance' },
      { value: 'internship', label: 'Internship' }
    ],
    company: [
      { value: 'techcorp', label: 'TechCorp Solutions' },
      { value: 'innovatelabs', label: 'InnovateLabs' },
      { value: 'designstudio', label: 'DesignStudio Pro' },
      { value: 'cloudtech', label: 'CloudTech Systems' },
      { value: 'analytics', label: 'Analytics Plus' }
    ]
  };

  const AccordionSection = ({ title, filterKey, options }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(filterKey)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-surface transition-colors duration-200"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name={openSections[filterKey] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>
      
      {openSections[filterKey] && (
        <div className="pb-4 space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters[filterKey] === option.value}
                onChange={() => handleFilterChange(filterKey, option.value)}
                className="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2 focus:ring-offset-0"
              />
              <span className="ml-3 text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-0">
      <AccordionSection
        title="Date Posted"
        filterKey="datePosted"
        options={filterOptions.datePosted}
      />
      
      <AccordionSection
        title="Experience Level"
        filterKey="experienceLevel"
        options={filterOptions.experienceLevel}
      />
      
      <AccordionSection
        title="Salary Range"
        filterKey="salaryRange"
        options={filterOptions.salaryRange}
      />
      
      <AccordionSection
        title="Job Type"
        filterKey="jobType"
        options={filterOptions.jobType}
      />
      
      <AccordionSection
        title="Company"
        filterKey="company"
        options={filterOptions.company}
      />
    </div>
  );
};

export default FilterAccordions;