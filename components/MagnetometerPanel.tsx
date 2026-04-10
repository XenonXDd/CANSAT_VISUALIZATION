
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { MagnetometerData, HistoryPoint } from '../types';
import ChartCard from './ChartCard';
import { MagnetIcon } from './Icons';

interface MagnetometerPanelProps {
  data: MagnetometerData;
  history: HistoryPoint[];
}

const MagnetometerPanel: React.FC<MagnetometerPanelProps> = ({ data, history }) => {
  return (
    <div className="bg-white/90 rounded-3xl p-5 shadow-xl border border-slate-200 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold text-purple-600 flex items-center">
        <MagnetIcon className="w-5 h-5 mr-2" />
        Magnetic Field
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center">
          <div>
              <p className="text-sm text-slate-500">X-axis</p>
              <p className="text-xl font-mono text-red-400">{data.x.toFixed(2)} µT</p>
          </div>
          <div>
              <p className="text-sm text-slate-500">Y-axis</p>
              <p className="text-xl font-mono text-green-400">{data.y.toFixed(2)} µT</p>
          </div>
          <div>
              <p className="text-sm text-slate-500">Z-axis</p>
              <p className="text-xl font-mono text-blue-400">{data.z.toFixed(2)} µT</p>
          </div>
      </div>
      <ChartCard title="Magnetic Field Trends">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="timestamp" stroke="#A0AEC0" fontSize={12}/>
            <YAxis stroke="#A0AEC0" fontSize={12} unit="µT" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#4A5568'
              }}
              itemStyle={{ color: '#E2E8F0' }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line type="monotone" dataKey="magX" name="X" stroke="#F56565" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="magY" name="Y" stroke="#48BB78" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="magZ" name="Z" stroke="#4299E1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default MagnetometerPanel;