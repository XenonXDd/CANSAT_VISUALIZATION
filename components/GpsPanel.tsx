
import React from 'react';
import type { GpsData } from '../types';
import ValueCard from './ValueCard';
import { GlobeIcon, AltitudeIcon, SpeedIcon } from './Icons';

interface GpsPanelProps {
  data: GpsData;
}

const GpsPanel: React.FC<GpsPanelProps> = ({ data }) => {
  return (
    <div className="bg-white/90 rounded-3xl p-5 shadow-xl border border-slate-200">
       <h2 className="text-lg font-semibold mb-4 text-sky-600 flex items-center">
        <GlobeIcon className="w-6 h-6 mr-2"/>
        GPS Data (NEO-7M)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ValueCard 
          title="Latitude" 
          value={data.latitude.toFixed(6)} 
          unit="°" 
        />
        <ValueCard 
          title="Longitude" 
          value={data.longitude.toFixed(6)} 
          unit="°" 
        />
        <ValueCard 
          title="Altitude" 
          value={data.altitude.toFixed(2)} 
          unit="m"
          icon={<AltitudeIcon className="w-8 h-8 text-cyan-400" />}
        />
        <ValueCard 
          title="Speed" 
          value={data.speed.toFixed(2)} 
          unit="km/h"
          icon={<SpeedIcon className="w-8 h-8 text-cyan-400" />}
        />
      </div>
    </div>
  );
};

export default GpsPanel;
