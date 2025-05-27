import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ filters, onFiltersChange }) => {
  const [localKeywords, setLocalKeywords] = useState(filters.keywords || '');
  const [localLocation, setLocalLocation] = useState(filters.location || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onFiltersChange({
      keywords: localKeywords,
      location: localLocation
    });
  };

  const handleKeywordsChange = (e) => {
    setLocalKeywords(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocalLocation(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={localKeywords}
              onChange={handleKeywordsChange}
              className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg leading-5 bg-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="MapPin" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={localLocation}
              onChange={handleLocationChange}
              className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg leading-5 bg-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Icon name="Search" size={20} />
          Search Jobs
        </button>
      </form>
    </div>
  );
};

export default SearchBar;