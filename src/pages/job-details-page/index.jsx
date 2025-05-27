import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ActionButton from './components/ActionButton';
import TabNavigation from './components/TabNavigation';
import FormattedTextBlock from './components/FormattedTextBlock';
import InfoSidebar from './components/InfoSidebar';
import ApplicationModal from './components/ApplicationModal';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const JobDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);

  // Mock job data
  const jobData = {
    id: 1,
    title: "Senior Frontend Developer",
    company: {
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      description: `TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. Founded in 2010, we've grown to over 500 employees across 15 countries.

Our mission is to transform businesses through cutting-edge technology and exceptional user experiences. We work with Fortune 500 companies to deliver scalable, secure, and user-friendly applications that drive business growth.

At TechCorp, we believe in fostering a culture of innovation, collaboration, and continuous learning. Our team consists of passionate professionals who are dedicated to pushing the boundaries of what's possible in technology.`
    },
    location: "San Francisco, CA",
    postedDate: "2024-01-15",
    salary: "$120,000 - $160,000",
    experience: "5+ years",
    employmentType: "Full-time",
    remote: true,
    description: `We are seeking a talented Senior Frontend Developer to join our dynamic engineering team. In this role, you'll be responsible for building and maintaining high-quality web applications that serve millions of users worldwide.

**Key Responsibilities:**
• Develop and maintain responsive web applications using React.js and modern JavaScript
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Work closely with backend developers to integrate APIs
• Stay up-to-date with the latest frontend technologies and best practices

**Required Qualifications:**
• Bachelor's degree in Computer Science or related field
• 5+ years of experience in frontend development
• Expert knowledge of React.js, JavaScript (ES6+), HTML5, and CSS3
• Experience with state management libraries (Redux, Context API)
• Proficiency in responsive design and cross-browser compatibility
• Familiarity with version control systems (Git)
• Strong problem-solving skills and attention to detail

**Preferred Qualifications:**
• Experience with TypeScript
• Knowledge of modern build tools (Webpack, Vite)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with cloud platforms (AWS, Azure, GCP)
• Understanding of accessibility standards (WCAG)

**Benefits:**
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching
• Flexible work arrangements and remote work options
• Professional development budget
• Unlimited PTO policy
• Modern office with free meals and snacks
• Team building events and company retreats`,
    requirements: [
      "5+ years of React.js experience",
      "Strong JavaScript and TypeScript skills",
      "Experience with modern frontend tools",
      "Bachelor's degree preferred"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Remote work options",
      "Professional development budget"
    ]
  };

  const similarJobs = [
    {
      id: 2,
      title: "React Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90,000 - $120,000",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "InnovateTech",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=50&h=50&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Frontend Engineer",
      company: "DigitalFlow",
      location: "Austin, TX",
      salary: "$100,000 - $130,000",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=50&h=50&fit=crop&crop=center"
    }
  ];

  const tabs = [
    { id: 'description', label: 'Job Description', icon: 'FileText' },
    { id: 'company', label: 'Company Info', icon: 'Building' },
    { id: 'similar', label: 'Similar Jobs', icon: 'Search' }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleApplyNow = () => {
    setIsApplicationModalOpen(true);
  };

  const handleSaveJob = () => {
    setIsJobSaved(!isJobSaved);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/home-page" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} className="text-gray-400" />
            <Link to="/search-results-page" className="text-gray-500 hover:text-gray-700">
              Jobs
            </Link>
            <Icon name="ChevronRight" size={16} className="text-gray-400" />
            <span className="text-gray-900">{jobData.title}</span>
          </nav>
        </div>
      </div>

      {/* Job Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start space-x-4 mb-4 lg:mb-0">
              <div className="flex-shrink-0">
                <Image
                  src={jobData.company.logo}
                  alt={jobData.company.name}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-2">
                  {jobData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                  <div className="flex items-center">
                    <Icon name="Building" size={16} className="mr-1" />
                    <span className="font-medium">{jobData.company.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" size={16} className="mr-1" />
                    <span>Posted {formatDate(jobData.postedDate)}</span>
                  </div>
                  {jobData.remote && (
                    <div className="flex items-center">
                      <Icon name="Wifi" size={16} className="mr-1" />
                      <span>Remote</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ActionButton
                variant="secondary"
                onClick={handleSaveJob}
                icon={isJobSaved ? "Heart" : "Heart"}
                className={isJobSaved ? "text-red-600 border-red-600" : ""}
              >
                {isJobSaved ? "Saved" : "Save Job"}
              </ActionButton>
              <ActionButton
                variant="primary"
                onClick={handleApplyNow}
                icon="Send"
              >
                Apply Now
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm">
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <FormattedTextBlock content={jobData.description} />
                )}
                
                {activeTab === 'company' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <Image
                        src={jobData.company.logo}
                        alt={jobData.company.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200 mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-display font-bold text-text-primary mb-1">
                          {jobData.company.name}
                        </h3>
                        <p className="text-text-secondary">Technology Company</p>
                      </div>
                    </div>
                    <FormattedTextBlock content={jobData.company.description} />
                  </div>
                )}
                
                {activeTab === 'similar' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-6">
                      Similar Job Opportunities
                    </h3>
                    <div className="space-y-4">
                      {similarJobs.map((job) => (
                        <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <Image
                                src={job.logo}
                                alt={job.company}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                              />
                              <div>
                                <h4 className="font-semibold text-text-primary hover:text-primary cursor-pointer">
                                  {job.title}
                                </h4>
                                <p className="text-text-secondary text-sm">{job.company}</p>
                                <div className="flex items-center mt-1 text-sm text-text-secondary">
                                  <Icon name="MapPin" size={14} className="mr-1" />
                                  <span className="mr-4">{job.location}</span>
                                  <Icon name="DollarSign" size={14} className="mr-1" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>
                            </div>
                            <button className="text-primary hover:text-primary-hover font-medium text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <InfoSidebar
              jobData={jobData}
              onSaveJob={handleSaveJob}
              isJobSaved={isJobSaved}
              onApplyNow={handleApplyNow}
            />
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobTitle={jobData.title}
        companyName={jobData.company.name}
      />
    </div>
  );
};

export default JobDetailsPage;