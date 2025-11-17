
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SpectroscopeData } from '../types';
import ChartCard from './ChartCard';
import { SpectrumIcon } from './Icons';

interface SpectroscopePanelProps {
  data: SpectroscopeData;
}

const SpectroscopePanel: React.FC<SpectroscopePanelProps> = ({ data }) => {
  const chartData = data.bands.map((value, index) => ({
    name: `Band ${index + 1}`,
    intensity: value,
  }));

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 shadow-lg border border-gray-700">
      <h2 className="text-lg font-semibold text-orange-300 flex items-center mb-4">
        <SpectrumIcon className="w-5 h-5 mr-2" />
        Spectroscope (8-Band)
      </h2>
      <ChartCard title="Band Intensities">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12}/>
            <YAxis stroke="#A0AEC0" fontSize={12}/>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#4A5568'
              }}
              itemStyle={{ color: '#E2E8F0' }}
              cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}
            />
            <Bar dataKey="intensity" fill="#DD6B20" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default SpectroscopePanel;
