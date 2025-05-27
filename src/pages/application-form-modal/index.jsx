import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import Modal from "./components/Modal";
import StepIndicator from "./components/StepIndicator";
import FormFields from "./components/FormFields";
import FileUploader from "./components/FileUploader";
import ActionButtons from "./components/ActionButtons";
import ValidationMessages from "./components/ValidationMessages";
import ConfirmationScreen from "./components/ConfirmationScreen";

const ApplicationFormModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      coverLetter: ""
    },
    resume: null,
    additionalAnswers: {}
  });

  // Mock job data
  const jobData = {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    questions: [
      {
        id: 1,
        question: "What experience do you have with React.js and modern frontend frameworks?",
        required: true
      },
      {
        id: 2,
        question: "Describe a challenging project you\'ve worked on and how you overcame obstacles.",
        required: true
      },
      {
        id: 3,
        question: "What interests you most about this position and our company?",
        required: false
      }
    ]
  };

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information" },
    { number: 2, title: "Resume Upload", description: "Upload your resume" },
    { number: 3, title: "Additional Questions", description: "Job-specific questions" }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.personalInfo.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.personalInfo.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.personalInfo.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.personalInfo.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
      if (formData.personalInfo.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.personalInfo.linkedinUrl)) {
        newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
      }
    }
    
    if (step === 2) {
      if (!formData.resume) {
        newErrors.resume = "Resume upload is required";
      }
    }
    
    if (step === 3) {
      jobData.questions.forEach(question => {
        if (question.required && !formData.additionalAnswers[question.id]?.trim()) {
          newErrors[`question_${question.id}`] = "This question is required";
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock application reference
      const ref = `APP-${Date.now().toString().slice(-6)}`;
      setApplicationRef(ref);
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/job-details-page");
  };

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleFieldBlur = (field, value) => {
    const newErrors = { ...errors };
    
    if (currentStep === 1) {
      if (field === 'fullName' && !value.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (field === 'email') {
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
      } else if (field === 'phone') {
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
          newErrors.phone = "Please enter a valid phone number";
        } else {
          delete newErrors.phone;
        }
      } else if (field === 'linkedinUrl') {
        if (value && !/^https?:\/\/(www\.)?linkedin\.com\//.test(value)) {
          newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
        } else {
          delete newErrors.linkedinUrl;
        }
      } else {
        delete newErrors[field];
      }
    }
    
    setErrors(newErrors);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {!isSubmitted ? (
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-text-primary">
                  Apply for {jobData.title}
                </h2>
                <p className="text-text-secondary mt-1">
                  {jobData.company} • {jobData.location}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={24} className="text-text-secondary" />
              </button>
            </div>

            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} />

            {/* Form Content */}
            <div className="mt-8">
              {currentStep === 1 && (
                <FormFields
                  data={formData.personalInfo}
                  onChange={(data) => updateFormData('personalInfo', data)}
                  errors={errors}
                  onFieldBlur={handleFieldBlur}
                />
              )}

              {currentStep === 2 && (
                <FileUploader
                  file={formData.resume}
                  onChange={(file) => updateFormData('resume', file)}
                  error={errors.resume}
                />
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Additional Questions
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Please answer the following questions to help us better understand your qualifications.
                    </p>
                  </div>
                  
                  {jobData.questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        {index + 1}. {question.question}
                        {question.required && <span className="text-error ml-1">*</span>}
                      </label>
                      <textarea
                        value={formData.additionalAnswers[question.id] || ""}
                        onChange={(e) => {
                          updateFormData('additionalAnswers', {
                            ...formData.additionalAnswers,
                            [question.id]: e.target.value
                          });
                        }}
                        onBlur={(e) => {
                          if (question.required && !e.target.value.trim()) {
                            setErrors(prev => ({
                              ...prev,
                              [`question_${question.id}`]: "This question is required"
                            }));
                          } else {
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors[`question_${question.id}`];
                              return newErrors;
                            });
                          }
                        }}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${
                          errors[`question_${question.id}`] ? 'border-error' : 'border-border'
                        }`}
                        placeholder="Type your answer here..."
                      />
                      {errors[`question_${question.id}`] && (
                        <ValidationMessages message={errors[`question_${question.id}`]} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Global Error Message */}
            {errors.submit && (
              <div className="mt-6">
                <ValidationMessages message={errors.submit} />
              </div>
            )}

            {/* Action Buttons */}
            <ActionButtons
              currentStep={currentStep}
              totalSteps={3}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isSubmitting={isSubmitting}
              hasErrors={Object.keys(errors).length > 0}
            />
          </div>
        ) : (
          <ConfirmationScreen
            applicationRef={applicationRef}
            jobTitle={jobData.title}
            company={jobData.company}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default ApplicationFormModal;