import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import SearchBar from "./components/SearchBar";
import JobCategoryChips from "./components/JobCategoryChips";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import Icon from "components/AppIcon";
import mockJobs from "../../jsonData/jobs.json";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const jobsPerPage = 9;

  // Mock data for job categories
  const mockCategories = [
    { id: 1, name: "Technology", icon: "Code", count: 1250 },
    { id: 2, name: "Marketing", icon: "Megaphone", count: 890 },
    { id: 3, name: "Design", icon: "Palette", count: 650 },
    { id: 4, name: "Sales", icon: "TrendingUp", count: 1100 },
    { id: 5, name: "Finance", icon: "DollarSign", count: 780 },
    { id: 6, name: "Healthcare", icon: "Heart", count: 920 },
    { id: 7, name: "Education", icon: "GraduationCap", count: 540 },
    { id: 8, name: "Engineering", icon: "Settings", count: 1350 },
  ];

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setCategories(mockCategories);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const handleSaveJob = (jobId) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
  };

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !selectedLocation ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesQuery && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg border border-border p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero Section with Search */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies
              worldwide
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Job Categories */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-display font-semibold text-text-primary mb-6">
            Popular Categories
          </h2>
          <JobCategoryChips categories={categories} />
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-semibold text-text-primary">
                Featured Jobs
              </h2>
              <p className="text-text-secondary mt-1">
                {loading ? "Loading..." : `${filteredJobs.length} jobs found`}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
                <option>Company A-Z</option>
              </select>
            </div>
          </div>

          {/* Job Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSave={() => handleSaveJob(job.id)}
                  />
                ))}
              </div>

              {/* No Results */}
              {filteredJobs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No jobs found
                  </h3>
                  <p className="text-text-secondary">
                    Try adjusting your search criteria or browse all jobs
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredJobs.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <Icon name="Briefcase" size={20} color="white" />
                </div>
                <span className="text-xl font-display font-bold text-text-primary">
                  JobPortal
                </span>
              </div>
              <p className="text-text-secondary mb-4 max-w-md">
                Connecting talented professionals with amazing opportunities
                worldwide. Find your next career move with confidence.
              </p>
              <div className="flex space-x-4">
                <button className="text-text-tertiary hover:text-primary transition-colors duration-200">
                  <Icon name="Facebook" size={20} />
                </button>
                <button className="text-text-tertiary hover:text-primary transition-colors duration-200">
                  <Icon name="Twitter" size={20} />
                </button>
                <button className="text-text-tertiary hover:text-primary transition-colors duration-200">
                  <Icon name="Linkedin" size={20} />
                </button>
                <button className="text-text-tertiary hover:text-primary transition-colors duration-200">
                  <Icon name="Instagram" size={20} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-4">
                For Job Seekers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Salary Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-4">
                For Employers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Browse Resumes
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Recruiting Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-text-secondary hover:text-primary text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-text-secondary hover:text-primary text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-text-secondary hover:text-primary text-sm transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
