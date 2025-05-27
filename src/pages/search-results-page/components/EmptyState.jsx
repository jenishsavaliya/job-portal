import React from 'react';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ filters, onClearFilters }) => {
  const hasActiveFilters = Object.values(filters).some(value => value);

  return (
    <div className="bg-white rounded-lg border border-border p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center">
          <Icon name="Search" size={40} className="text-text-tertiary" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-4">
        No jobs found
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        {hasActiveFilters
          ? "We couldn't find any jobs matching your current filters. Try adjusting your search criteria." :"We couldn't find any jobs matching your search. Try different keywords or check your spelling."
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
          >
            Clear all filters
          </button>
        )}
        
        <button
          onClick={() => window.history.back()}
          className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-surface transition-colors duration-200"
        >
          Go back
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-4">
          Try these suggestions:
        </h4>
        <ul className="text-sm text-text-secondary space-y-2 max-w-md mx-auto">
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            Check your spelling and try different keywords
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            Remove some filters to broaden your search
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            Try searching for similar job titles or skills
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            Consider expanding your location preferences
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyState;