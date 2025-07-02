import React from 'react';

interface DashboardHeaderProps {
  name: string;
  website: string;
  description: string;
  onSalesforceClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, website, description, onSalesforceClick }) => {
  console.log(name);
  
  // Get first 3 letters of the name and convert to uppercase
  const getInitials = (name: string) => {
    if (!name) return 'ORG';
    // Split by spaces and get first letter of each word, then take first 3
    const words = name.split(' ').filter(word => word.length > 0);
    const initials = words.map(word => word.charAt(0)).join('').toUpperCase();
    return initials.substring(0, 3);
  };

  return (
    <div className=" lg:flex-row lg:items-center lg:justify-between bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 lg:mb-0">
        {/* Organization initials circle */}
        <div className="flex-shrink-0 self-start sm:self-center">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
            {getInitials(name)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{name}</h1>
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800 transition-colors duration-200">
            <span className="truncate">{website}</span>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7L21 10z" /></svg>
          </a>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{description}</p>
          <button 
        onClick={onSalesforceClick} 
        className="w-full mt-2 bg-[#0F084B] text-white rounded-md sm:w-auto catalyst-btn catalyst-btn-primary px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
      >
        View in Salesforce
      </button>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardHeader; 