import React, { useState } from "react";
import Icon from "components/AppIcon";

const SearchBar = ({ onSearch }) => {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(jobQuery, locationQuery);
  };

  const popularSearches = [
    "Frontend Developer",
    "Product Manager", 
    "Data Scientist",
    "UX Designer",
    "Marketing Manager"
  ];

  const popularLocations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Remote"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-2 shadow-sm">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Job Title/Skills Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg leading-5 bg-transparent placeholder-text-tertiary focus:outline-none focus:ring-0 text-text-primary"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-border"></div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="MapPin" size={20} className="text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg leading-5 bg-transparent placeholder-text-tertiary focus:outline-none focus:ring-0 text-text-primary"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2 min-w-fit"
          >
            <Icon name="Search" size={20} />
            <span className="hidden sm:inline">Search Jobs</span>
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-text-secondary mb-3">Popular Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setJobQuery(search)}
                className="text-sm text-primary hover:text-primary-hover bg-primary-light px-3 py-1 rounded-full transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-secondary mb-3">Popular Locations:</h3>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => setLocationQuery(location)}
                className="text-sm text-primary hover:text-primary-hover bg-primary-light px-3 py-1 rounded-full transition-colors duration-200"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;