import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

const JobCategoryChips = ({ categories }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border rounded-full shadow-sm flex items-center justify-center hover:bg-surface transition-colors duration-200"
        aria-label="Scroll left"
      >
        <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border rounded-full shadow-sm flex items-center justify-center hover:bg-surface transition-colors duration-200"
        aria-label="Scroll right"
      >
        <Icon name="ChevronRight" size={20} className="text-text-secondary" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-12 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/search-results-page?category=${encodeURIComponent(category.name)}`}
            className="flex-shrink-0 bg-white border border-border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all duration-200 group min-w-fit"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:bg-opacity-20 transition-colors duration-200">
                <Icon 
                  name={category.icon} 
                  size={24} 
                  className="text-primary"
                />
              </div>
              <div>
                <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {category.count.toLocaleString()} jobs
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent pointer-events-none"></div>
    </div>
  );
};

export default JobCategoryChips;