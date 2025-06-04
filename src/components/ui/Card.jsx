import React, { useState } from "react";

import Icon from "../AppIcon";
import Image from "../AppImage";
import Button from "./Button";

const Card = ({
  variant = "default",
  className = "",
  children,
  onClick,
  ...props
}) => {
  const baseClasses =
    "bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md";

  const variantClasses = {
    default: "p-6",
    compact: "p-4",
    featured: "p-6 border-primary border-2 relative",
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (variant === "job-listing") {
    return (
      <JobListingCard {...props} className={className} onClick={onClick} />
    );
  }

  if (variant === "featured-job") {
    return (
      <FeaturedJobCard {...props} className={className} onClick={onClick} />
    );
  }

  if (variant === "company-profile") {
    return (
      <CompanyProfileCard {...props} className={className} onClick={onClick} />
    );
  }

  if (variant === "filter-group") {
    return <FilterGroupCard {...props} className={className} />;
  }

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const JobListingCard = ({
  job = {},
  className = "",
  onClick,
  onSave,
  onApply,
  ...props
}) => {
  const {
    id,
    title = "Software Engineer",
    company = "Tech Company",
    location = "San Francisco, CA",
    type = "Full-time",
    salary = "$80,000 - $120,000",
    description = "We are looking for a talented software engineer to join our team...",
    skills = ["JavaScript", "React", "Node.js"],
    postedDate = "2 days ago",
    isRemote = false,
    isFeatured = false,
    companyLogo,
    saved = false,
  } = job;

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) {
      onSave(job);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (onApply) {
      onApply(job);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${
        isFeatured ? "border-primary border-2" : ""
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {isFeatured && (
        <div className="absolute -top-2 left-4 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
          Featured
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Icon name="Building" size={20} className="text-gray-400" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{company}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-1" />
                {location}
              </div>
              {isRemote && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Remote
                </span>
              )}
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {type}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            saved
              ? "text-primary bg-primary-light"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon name={saved ? "Bookmark" : "BookmarkPlus"} size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      {salary && (
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <Icon name="DollarSign" size={16} className="mr-1" />
          {salary}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{postedDate}</span>
        <Button variant="primary" size="small" onClick={handleApply}>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

const FeaturedJobCard = ({ job = {}, className = "", onClick, ...props }) => {
  return (
    <JobListingCard
      job={{ ...job, isFeatured: true }}
      className={`border-primary border-2 relative ${className}`}
      onClick={onClick}
      {...props}
    />
  );
};

const CompanyProfileCard = ({
  company = {},
  className = "",
  onClick,
  ...props
}) => {
  const {
    name = "Company Name",
    logo,
    description = "Company description goes here...",
    industry = "Technology",
    size = "100-500 employees",
    location = "San Francisco, CA",
    openJobs = 5,
    rating = 4.5,
  } = company;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start space-x-4 mb-4">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon name="Building" size={24} className="text-gray-400" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{industry}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Icon name="MapPin" size={16} className="mr-1" />
              {location}
            </div>
            <div className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              {size}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Icon name="Star" size={16} className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-700">{rating}</span>
          </div>
          <span className="text-sm text-primary font-medium">
            {openJobs} open positions
          </span>
        </div>
        <Button variant="outline" size="small">
          View Company
        </Button>
      </div>
    </div>
  );
};

const FilterGroupCard = ({
  title,
  children,
  isCollapsible = true,
  defaultExpanded = true,
  className = "",
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const toggleExpanded = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 ${className}`}
      {...props}
    >
      <div
        className={`p-4 ${isCollapsible ? "cursor-pointer" : ""} ${
          isCollapsible && !isExpanded
            ? "border-b-0"
            : "border-b border-gray-200"
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          {isCollapsible && (
            <Icon
              name={isExpanded ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-gray-400"
            />
          )}
        </div>
      </div>

      {isExpanded && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
};

export default Card;
