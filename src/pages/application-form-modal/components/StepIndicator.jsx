import React from "react";
import Icon from "components/AppIcon";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
              step.number < currentStep 
                ? 'bg-success border-success text-white' 
                : step.number === currentStep
                ? 'bg-primary border-primary text-white' :'bg-background border-border text-text-tertiary'
            }`}>
              {step.number < currentStep ? (
                <Icon name="Check" size={20} />
              ) : (
                <span className="text-sm font-semibold">{step.number}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className={`text-sm font-medium ${
                step.number <= currentStep ? 'text-text-primary' : 'text-text-tertiary'
              }`}>
                {step.title}
              </p>
              <p className={`text-xs ${
                step.number <= currentStep ? 'text-text-secondary' : 'text-text-tertiary'
              }`}>
                {step.description}
              </p>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
              step.number < currentStep ? 'bg-success' : 'bg-border'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;