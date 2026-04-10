
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white/95 p-4 rounded-2xl flex-grow flex flex-col shadow-sm border border-slate-200">
      <h3 className="text-md font-semibold text-slate-700 mb-2">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
