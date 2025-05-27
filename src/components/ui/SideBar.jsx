import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SideBar = ({ 
  isOpen = true, 
  onToggle, 
  variant = 'expanded',
  isMobile = false 
}) => {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: '',
    salary: '',
    location: '',
    company: '',
    skills: []
  });

  const [localOpen, setLocalOpen] = useState(isOpen);

  useEffect(() => {
    setLocalOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !localOpen;
    setLocalOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'jobType' || filterType === 'skills') {
        const currentArray = prev[filterType];
        const newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        return { ...prev, [filterType]: newArray };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      experience: '',
      salary: '',
      location: '',
      company: '',
      skills: []
    });
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry Level', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const salaryRanges = ['$30k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k+'];
  const popularSkills = ['JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git'];

  if (isMobile && variant === 'mobile') {
    return (
      <div className={`fixed inset-0 z-50 ${localOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleToggle}></div>
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={handleToggle}
                className="p-2 text-gray-400 hover:text-gray-600"
                aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            {/* Filter content - same as desktop */}
            <div className="space-y-6">
              {/* Job Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Experience Level</h3>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="">Any Experience</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Salary Range</h3>
                <select
                  value={filters.salary}
                  onChange={(e) => handleFilterChange('salary', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="">Any Salary</option>
                  {salaryRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      variant === 'collapsed' || !localOpen ? 'w-16' : 'w-80'
    }`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {(variant !== 'collapsed' && localOpen) && (
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          )}
          <button
            onClick={handleToggle}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            aria-label={localOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Icon name={localOpen ? "ChevronLeft" : "ChevronRight"} size={20} />
          </button>
        </div>

        {/* Filters Content */}
        {(variant !== 'collapsed' && localOpen) && (
          <div className="space-y-6">
            {/* Location Search */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="MapPin" size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Job Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Job Type</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.jobType.includes(type)}
                      onChange={() => handleFilterChange('jobType', type)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Experience Level
              </label>
              <select
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Any Experience</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Salary Range
              </label>
              <select
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">Any Salary</option>
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Building" size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Company name"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
              <div className="space-y-2">
                {popularSkills.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleFilterChange('skills', skill)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Collapsed State Icons */}
        {(variant === 'collapsed' || !localOpen) && (
          <div className="space-y-4">
            <button className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="MapPin" size={20} />
            </button>
            <button className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="Briefcase" size={20} />
            </button>
            <button className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="DollarSign" size={20} />
            </button>
            <button className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="Building" size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;