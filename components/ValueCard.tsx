
import React from 'react';

interface ValueCardProps {
  title: string;
  value: string;
  unit: string;
  icon?: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-gray-700/50 p-4 rounded-md flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-semibold font-mono">
          {value}<span className="text-lg text-gray-400 ml-1">{unit}</span>
        </p>
      </div>
      {icon && <div className="opacity-50">{icon}</div>}
    </div>
  );
};

export default ValueCard;
