import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const JobCard = ({ job }) => {
  const {
    id,
    title,
    company,
    location,
    type,
    salary,
    experience,
    datePosted,
    description,
    logo,
    tags,
    isRemote,
    isFeatured,
  } = job;

  return (
    <div
      className={`bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
        isFeatured
          ? "border-primary border-2"
          : "border-border hover:border-primary"
      }`}
    >
      {isFeatured && (
        <div className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-t-lg">
          Featured Job
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
              <Image
                src={logo}
                alt={`${company} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Link
                  to={`/job-details-page?id=${id}`}
                  state={{ job }}
                  className="block group"
                >
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mt-1 mb-2">
                  <span className="text-text-secondary font-medium">
                    {company}
                  </span>
                  <span className="text-text-tertiary">•</span>
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Icon name="MapPin" size={14} />
                    <span className="text-sm">{location}</span>
                  </div>
                  {isRemote && (
                    <>
                      <span className="text-text-tertiary">•</span>
                      <span className="text-sm text-success font-medium">
                        Remote
                      </span>
                    </>
                  )}
                </div>

                <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                  {description}
                </p>

                {/* Job Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Briefcase" size={14} />
                    <span>{type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    <span>{experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={14} />
                    <span>{salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{datePosted}</span>
                  </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-secondary">
                        +{tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="text-text-secondary hover:text-error transition-colors duration-200">
                  <Icon name="Heart" size={20} />
                </button>
                <Link
                  to={`/job-details-page?id=${id}`}
                  state={{ job }}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors duration-200 whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
