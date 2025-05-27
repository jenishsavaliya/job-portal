import React, { useState, useRef } from "react";
import Icon from "components/AppIcon";
import ValidationMessages from "./ValidationMessages";

const FileUploader = ({ file, onChange, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (selectedFile) => {
    if (!allowedTypes.includes(selectedFile.type)) {
      return "Please upload a PDF or DOC file";
    }
    if (selectedFile.size > maxSize) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  const handleFileSelect = (selectedFile) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    
    setUploadError("");
    onChange(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Upload Resume
        </h3>
        <p className="text-text-secondary mb-6">
          Please upload your most recent resume. Accepted formats: PDF, DOC, DOCX (Max 5MB)
        </p>
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragOver 
              ? 'border-primary bg-primary-light' 
              : error || uploadError
              ? 'border-error bg-red-50' :'border-border hover:border-primary hover:bg-surface'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-primary text-white' : 'bg-surface text-text-tertiary'
            }`}>
              <Icon name="Upload" size={32} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                {isDragOver ? 'Drop your resume here' : 'Upload your resume'}
              </p>
              <p className="text-text-secondary">
                Drag and drop your file here, or{" "}
                <span className="text-primary font-medium">click to browse</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-tertiary">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={16} />
                <span>PDF, DOC, DOCX</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="HardDrive" size={16} />
                <span>Max 5MB</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-6 bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-primary">{file.name}</p>
                <p className="text-sm text-text-secondary">
                  {formatFileSize(file.size)} • Uploaded successfully
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
              title="Remove file"
            >
              <Icon name="X" size={20} className="text-text-tertiary hover:text-error" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {(error || uploadError) && (
        <ValidationMessages message={error || uploadError} />
      )}

      <div className="bg-info bg-opacity-10 border border-info border-opacity-20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-info mt-0.5" />
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Resume Tips
            </p>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Ensure your resume is up-to-date with recent experience</li>
              <li>• Include relevant skills and keywords from the job description</li>
              <li>• Keep file size under 5MB for faster processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;