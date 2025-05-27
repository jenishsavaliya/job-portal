import React from "react";
import Icon from "components/AppIcon";

const ConfirmationScreen = ({ applicationRef, jobTitle, company, onClose }) => {
  const nextSteps = [
    {
      icon: "Mail",
      title: "Email Confirmation",
      description: "You\'ll receive a confirmation email within 5 minutes with your application details."
    },
    {
      icon: "Eye",
      title: "Application Review",
      description: "Our hiring team will review your application within 3-5 business days."
    },
    {
      icon: "Phone",
      title: "Interview Process",
      description: "If selected, we\'ll contact you to schedule an initial interview."
    },
    {
      icon: "Users",
      title: "Final Decision",
      description: "We\'ll notify you of our decision regardless of the outcome."
    }
  ];

  return (
    <div className="text-center max-w-lg mx-auto">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={48} className="text-success" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
        Application Submitted Successfully!
      </h2>
      
      <p className="text-text-secondary mb-8">
        Thank you for applying to <span className="font-semibold">{jobTitle}</span> at{" "}
        <span className="font-semibold">{company}</span>. We've received your application and will be in touch soon.
      </p>

      {/* Application Reference */}
      <div className="bg-surface border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Icon name="Hash" size={20} className="text-text-tertiary" />
          <span className="text-sm font-medium text-text-secondary">Application Reference</span>
        </div>
        <div className="text-2xl font-mono font-bold text-primary tracking-wider">
          {applicationRef}
        </div>
        <p className="text-xs text-text-tertiary mt-2">
          Save this reference number for your records
        </p>
      </div>

      {/* Next Steps */}
      <div className="text-left mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
          What happens next?
        </h3>
        
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={step.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">{step.title}</h4>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Back to Job Details</span>
        </button>
        
        <button
          onClick={() => window.open('mailto:?subject=Job Application Confirmation&body=I have successfully submitted my application for ' + jobTitle + ' at ' + company + '. Application Reference: ' + applicationRef)}
          className="px-6 py-3 border border-border text-text-primary font-medium rounded-lg hover:bg-surface transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Icon name="Share" size={20} />
          <span>Share Application</span>
        </button>
      </div>

      {/* Contact Information */}
      <div className="mt-8 p-4 bg-info bg-opacity-10 border border-info border-opacity-20 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="HelpCircle" size={16} className="text-info" />
          <span className="text-sm font-medium text-text-primary">Need Help?</span>
        </div>
        <p className="text-sm text-text-secondary">
          If you have any questions about your application, please contact our HR team at{" "}
          <a href="mailto:careers@techcorp.com" className="text-primary hover:underline">
            careers@techcorp.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationScreen;