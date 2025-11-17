
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-md flex-grow flex flex-col">
      <h3 className="text-md font-semibold text-gray-400 mb-2">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
