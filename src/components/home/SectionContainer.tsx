import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
  title, 
  children, 
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg mb-6 shadow-sm overflow-hidden transition-all duration-300">
      <button
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionContainer;