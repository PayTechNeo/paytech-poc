import React from 'react';

interface DashboardHeaderProps {
  logo: string;
  name: string;
  website: string;
  description: string;
  onSalesforceClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ logo, name, website, description, onSalesforceClick }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow p-6 mb-6">
    <div className="flex items-center gap-4">
      <img src={logo} alt={name} className="h-16 w-16 rounded-full object-cover" />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center gap-1">
          {website}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7L21 10z" /></svg>
        </a>
        <p className="text-gray-500 text-xs mt-1">{description}</p>
      </div>
    </div>
    <button onClick={onSalesforceClick} className="mt-4 md:mt-0 catalyst-btn catalyst-btn-primary">View in Salesforce</button>
  </div>
);

export default DashboardHeader; 