import React from "react";
import Icon from "../../../components/AppIcon";
import ActionButton from "./ActionButton";

const InfoSidebar = ({ jobData, onSaveJob, isJobSaved, onApplyNow }) => {
  const jobDetails = [
    {
      icon: "DollarSign",
      label: "Salary Range",
      value: jobData?.salary,
    },
    {
      icon: "Briefcase",
      label: "Experience",
      value: jobData?.experience || "3+ years",
    },
    {
      icon: "Clock",
      label: "Employment Type",
      value: jobData?.type,
    },
    {
      icon: "MapPin",
      label: "Location",
      value: jobData?.location,
    },
    {
      icon: "Wifi",
      label: "Work Style",
      value: jobData?.isRemote ? "Remote Friendly" : "On-site",
    },
  ];

  return (
    <div className="lg:sticky lg:top-24">
      {/* Quick Apply Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <ActionButton
            variant="primary"
            onClick={onApplyNow}
            icon="Send"
            className="w-full"
          >
            Apply Now
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={onSaveJob}
            icon="Heart"
            className={`w-full ${
              isJobSaved ? "text-red-600 border-red-600" : ""
            }`}
          >
            {isJobSaved ? "Saved" : "Save Job"}
          </ActionButton>
        </div>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Job Details
        </h3>
        <div className="space-y-4">
          {jobDetails.map((detail, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center mr-3">
                <Icon name={detail.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-secondary">
                  {detail.label}
                </p>
                <p className="text-sm text-text-primary font-semibold">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Key Requirements
        </h3>
        <div className="space-y-3">
          {jobData?.requirements?.map((requirement, index) => (
            <div key={index} className="flex items-start">
              <Icon
                name="Check"
                size={16}
                className="text-success mr-2 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-text-secondary">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Benefits & Perks
        </h3>
        <div className="space-y-3">
          {[
            "Competitive salary",
            "Health insurance",
            "Remote work options",
            "Professional development budget",
          ].map((benefit, index) => (
            <div key={index} className="flex items-start">
              <Icon
                name="Gift"
                size={16}
                className="text-primary mr-2 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-text-secondary">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;
