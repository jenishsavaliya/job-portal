import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import HomePage from "pages/home-page";
import JobDetailsPage from "pages/job-details-page";
import ApplicationFormModal from "pages/application-form-modal";
import SearchResultsPage from "pages/search-results-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/job-details-page" element={<JobDetailsPage />} />
          <Route path="/application-form-modal" element={<ApplicationFormModal />} />
          <Route path="/search-results-page" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;