import React from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Icon name="FileQuestion" size={48} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/home-page"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Icon name="Home" size={20} />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-surface transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;