import React from "react";
import { Link } from "react-router-dom";
import Icon from "components/AppIcon";
import Image from "components/AppImage";

const JobCard = ({ job, onSave }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:border-primary hover:shadow-sm transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
            <Image
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 truncate">
              {job.title}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {job.company}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onSave();
          }}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            job.isSaved
              ? "text-primary bg-primary-light"
              : "text-text-tertiary hover:text-primary hover:bg-primary-light"
          }`}
          aria-label={job.isSaved ? "Remove from saved jobs" : "Save job"}
        >
          <Icon
            name={job.isSaved ? "Heart" : "Heart"}
            size={20}
            fill={job.isSaved ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{job.location}</span>
          </div>
          {job.isRemote && (
            <div className="flex items-center space-x-1">
              <Icon name="Wifi" size={16} />
              <span>Remote</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {job.type}
          </span>
          {job.salary && (
            <span className="text-text-secondary">{job.salary}</span>
          )}
        </div>

        <p className="text-sm text-text-secondary line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-text-tertiary">
          {formatDate(job.postedDate)}
        </span>
        <Link
          to={`/job-details-page?id=${job.id}`}
          state={{ job }}
          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-200 flex items-center space-x-1"
        >
          <span>View Details</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
