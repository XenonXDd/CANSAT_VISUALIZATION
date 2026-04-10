
import React from 'react';

interface ValueCardProps {
  title: string;
  value: string;
  unit: string;
  icon?: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-white shadow-sm border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-semibold font-mono text-slate-900">
          {value}<span className="text-lg text-slate-500 ml-1">{unit}</span>
        </p>
      </div>
      {icon && <div className="opacity-50">{icon}</div>}
    </div>
  );
};

export default ValueCard;
