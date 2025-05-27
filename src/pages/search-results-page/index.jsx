import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterAccordions from './components/FilterAccordions';
import JobCard from './components/JobCard';
import Pagination from './components/Pagination';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    datePosted: '',
    experienceLevel: '',
    salaryRange: '',
    jobType: '',
    company: '',
    location: '',
    keywords: ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      experience: "Senior",
      datePosted: "2 days ago",
      description: "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
      tags: ["React", "TypeScript", "CSS", "JavaScript"],
      isRemote: false,
      isFeatured: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100,000 - $130,000",
      experience: "Mid-level",
      datePosted: "1 day ago",
      description: "Join our product team to drive the development of cutting-edge software solutions. You\'ll work closely with engineering and design teams to deliver exceptional user experiences.",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
      tags: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      isRemote: true,
      isFeatured: false
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignStudio Pro",
      location: "Austin, TX",
      type: "Contract",
      salary: "$80,000 - $100,000",
      experience: "Mid-level",
      datePosted: "3 days ago",
      description: "We\'re seeking a talented UX/UI Designer to create intuitive and engaging user experiences. You\'ll be responsible for the entire design process from research to final implementation.",
      logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=64&h=64&fit=crop&crop=center",
      tags: ["Figma", "Sketch", "Prototyping", "User Research"],
      isRemote: true,
      isFeatured: false
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "CloudTech Systems",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      experience: "Senior",
      datePosted: "1 week ago",
      description: "Looking for a Backend Engineer to build scalable server-side applications. You\'ll work with microservices architecture and cloud technologies to support millions of users.",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop&crop=center",
      tags: ["Node.js", "Python", "AWS", "Docker"],
      isRemote: false,
      isFeatured: true
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Plus",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$95,000 - $125,000",
      experience: "Mid-level",
      datePosted: "5 days ago",
      description: "Join our data science team to extract insights from complex datasets. You\'ll develop machine learning models and work on predictive analytics projects.",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center",
      tags: ["Python", "Machine Learning", "SQL", "Statistics"],
      isRemote: true,
      isFeatured: false
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Infrastructure Co",
      location: "Denver, CO",
      type: "Full-time",
      salary: "$105,000 - $135,000",
      experience: "Senior",
      datePosted: "4 days ago",
      description: "We need a DevOps Engineer to manage our cloud infrastructure and deployment pipelines. You\'ll work with containerization and automation tools.",
      logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=64&h=64&fit=crop&crop=center",
      tags: ["Kubernetes", "Jenkins", "Terraform", "AWS"],
      isRemote: false,
      isFeatured: false
    }
  ];

  const jobsPerPage = 10;

  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      datePosted: searchParams.get('datePosted') || '',
      experienceLevel: searchParams.get('experienceLevel') || '',
      salaryRange: searchParams.get('salaryRange') || '',
      jobType: searchParams.get('jobType') || '',
      company: searchParams.get('company') || '',
      location: searchParams.get('location') || '',
      keywords: searchParams.get('keywords') || ''
    };
    setFilters(newFilters);
    setCurrentPage(parseInt(searchParams.get('page')) || 1);
    
    // Simulate API call
    fetchJobs(newFilters);
  }, [location.search]);

  const fetchJobs = async (currentFilters) => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock data based on current filters
      let filteredJobs = mockJobs;
      
      if (currentFilters.keywords) {
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(currentFilters.keywords.toLowerCase()) ||
          job.company.toLowerCase().includes(currentFilters.keywords.toLowerCase()) ||
          job.tags.some(tag => tag.toLowerCase().includes(currentFilters.keywords.toLowerCase()))
        );
      }
      
      if (currentFilters.experienceLevel) {
        filteredJobs = filteredJobs.filter(job => 
          job.experience.toLowerCase() === currentFilters.experienceLevel.toLowerCase()
        );
      }
      
      if (currentFilters.jobType) {
        filteredJobs = filteredJobs.filter(job => 
          job.type.toLowerCase() === currentFilters.jobType.toLowerCase()
        );
      }
      
      if (currentFilters.location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(currentFilters.location.toLowerCase())
        );
      }

      setJobs(filteredJobs);
      setTotalJobs(filteredJobs.length);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Update URL parameters
    const searchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    searchParams.set('page', '1');
    
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retryFetch = () => {
    fetchJobs(filters);
  };

  const clearAllFilters = () => {
    setFilters({
      datePosted: '',
      experienceLevel: '',
      salaryRange: '',
      jobType: '',
      company: '',
      location: '',
      keywords: ''
    });
    navigate('/search-results-page');
  };

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  if (hasError) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <Icon name="AlertCircle" size={48} className="text-error" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Something went wrong
            </h2>
            <p className="text-text-secondary mb-6">
              We couldn't load the job listings. Please try again.
            </p>
            <button
              onClick={retryFetch}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            filters={filters}
            onFiltersChange={updateFilters}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
                {Object.values(filters).some(value => value) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:text-primary-hover font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterAccordions 
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-lg text-text-primary font-medium"
              >
                <Icon name="Filter" size={20} />
                Filters
                {Object.values(filters).some(value => value) && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {Object.values(filters).filter(value => value).length}
                  </span>
                )}
              </button>
            </div>

            {/* Results Header */}
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    {filters.keywords ? `Search results for "${filters.keywords}"` : 'All Jobs'}
                  </h1>
                  {isLoading ? (
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  ) : (
                    <p className="text-text-secondary">
                      {totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Most Relevant</option>
                    <option>Newest First</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border border-border p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <EmptyState 
                filters={filters}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FilterAccordions 
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-border">
              <div className="flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 border border-border text-text-primary py-3 rounded-lg font-medium hover:bg-surface transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;