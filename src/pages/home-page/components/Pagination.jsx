import React from "react";
import Icon from "components/AppIcon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
          currentPage === 1
            ? 'border-border text-text-tertiary cursor-not-allowed' :'border-border text-text-secondary hover:border-primary hover:text-primary'
        }`}
        aria-label="Previous page"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="w-10 h-10 flex items-center justify-center text-text-tertiary">
              ...
            </span>
          ) : (
            <button
              onClick={() => handlePageClick(page)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 font-medium ${
                currentPage === page
                  ? 'border-primary bg-primary text-white' :'border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
          currentPage === totalPages
            ? 'border-border text-text-tertiary cursor-not-allowed' :'border-border text-text-secondary hover:border-primary hover:text-primary'
        }`}
        aria-label="Next page"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  );
};

export default Pagination;