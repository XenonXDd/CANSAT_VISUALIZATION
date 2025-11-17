
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { EnvironmentData, HistoryPoint } from '../types';
import ValueCard from './ValueCard';
import { TempIcon, HumidityIcon, PressureIcon } from './Icons';
import ChartCard from './ChartCard';

interface EnvironmentPanelProps {
  data: EnvironmentData;
  history: HistoryPoint[];
}

const EnvironmentPanel: React.FC<EnvironmentPanelProps> = ({ data, history }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 shadow-lg border border-gray-700 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold text-green-300">Environmental (BME280)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ValueCard 
          title="Temperature" 
          value={data.temperature.toFixed(2)} 
          unit="°C"
          icon={<TempIcon className="w-8 h-8 text-green-400" />}
        />
        <ValueCard 
          title="Humidity" 
          value={data.humidity.toFixed(2)} 
          unit="%"
          icon={<HumidityIcon className="w-8 h-8 text-green-400" />}
        />
        <ValueCard 
          title="Pressure" 
          value={data.pressure.toFixed(2)} 
          unit="hPa"
          icon={<PressureIcon className="w-8 h-8 text-green-400" />}
        />
      </div>
      <ChartCard title="Sensor Trends">
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="timestamp" stroke="#A0AEC0" fontSize={12} />
            <YAxis yAxisId="left" stroke="#A0AEC0" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" fontSize={12} />
            <Tooltip
                contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#4A5568'
                }}
                itemStyle={{ color: '#E2E8F0' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#48BB78" strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#38B2AC" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="pressure" name="Pressure (hPa)" stroke="#9F7AEA" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default EnvironmentPanel;
