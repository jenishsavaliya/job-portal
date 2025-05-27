import React from "react";
import Icon from "components/AppIcon";

const ActionButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  isSubmitting, 
  hasErrors 
}) => {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
      <div className="flex items-center space-x-2 text-sm text-text-secondary">
        <Icon name="Shield" size={16} />
        <span>Your information is secure and encrypted</span>
      </div>

      <div className="flex items-center space-x-4">
        {!isFirstStep && (
          <button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="px-6 py-3 border border-border text-text-primary font-medium rounded-lg hover:bg-surface transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Previous</span>
          </button>
        )}

        <button
          onClick={onNext}
          disabled={isSubmitting || hasErrors}
          className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[120px] justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : isLastStep ? (
            <>
              <Icon name="Send" size={20} />
              <span>Submit Application</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <Icon name="ArrowRight" size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;