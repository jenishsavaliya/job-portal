import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home-page" className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <span className="text-xl font-display font-bold text-gray-900">JobPortal</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/home-page"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActiveRoute('/home-page')
                  ? 'text-primary' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search-results-page"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActiveRoute('/search-results-page')
                  ? 'text-primary' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/job-details-page"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActiveRoute('/job-details-page')
                  ? 'text-primary' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              Companies
            </Link>

            {/* User Actions */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <Icon name="Bell" size={20} />
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors duration-200">
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/home-page"
                className={`text-base font-medium ${
                  isActiveRoute('/home-page')
                    ? 'text-primary' :'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search-results-page"
                className={`text-base font-medium ${
                  isActiveRoute('/search-results-page')
                    ? 'text-primary' :'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/job-details-page"
                className={`text-base font-medium ${
                  isActiveRoute('/job-details-page')
                    ? 'text-primary' :'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Icon name="Bell" size={20} />
                    <span>Notifications</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Icon name="User" size={20} />
                    <span>Profile</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="text-left text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-primary-hover transition-colors duration-200 text-left">
                    Sign Up
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;