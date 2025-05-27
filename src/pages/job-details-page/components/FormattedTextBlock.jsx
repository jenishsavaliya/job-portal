import React from 'react';

const FormattedTextBlock = ({ content }) => {
  const formatContent = (text) => {
    // Split by double line breaks to create paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph is a header (starts with **)
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const headerText = paragraph.slice(2, -2);
        return (
          <h3 key={index} className="text-lg font-semibold text-text-primary mt-6 mb-3 first:mt-0">
            {headerText}
          </h3>
        );
      }
      
      // Check if paragraph contains bullet points (starts with •)
      if (paragraph.includes('•')) {
        const lines = paragraph.split('\n');
        const bulletPoints = lines.filter(line => line.trim().startsWith('•'));
        const otherContent = lines.filter(line => !line.trim().startsWith('•')).join('\n');
        
        return (
          <div key={index} className="mb-4">
            {otherContent && (
              <p className="text-text-secondary leading-relaxed mb-3">
                {otherContent}
              </p>
            )}
            <ul className="space-y-2 ml-4">
              {bulletPoints.map((point, pointIndex) => (
                <li key={pointIndex} className="text-text-secondary leading-relaxed flex items-start">
                  <span className="text-primary mr-2 mt-1.5 w-1.5 h-1.5 bg-current rounded-full flex-shrink-0"></span>
                  <span>{point.replace('•', '').trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-text-secondary leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="prose prose-lg max-w-none">
      {formatContent(content)}
    </div>
  );
};

export default FormattedTextBlock;