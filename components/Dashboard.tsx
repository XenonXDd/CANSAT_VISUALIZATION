
import React from 'react';
import type { SensorPayload, HistoryPoint } from '../types';
import GpsPanel from './GpsPanel';
import EnvironmentPanel from './EnvironmentPanel';
import MagnetometerPanel from './MagnetometerPanel';
import SpectroscopePanel from './SpectroscopePanel';
import OrientationPanel from './OrientationPanel';

interface DashboardProps {
  sensorData: SensorPayload;
  history: HistoryPoint[];
}

const Dashboard: React.FC<DashboardProps> = ({ sensorData, history }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-4">
        <GpsPanel data={sensorData.gps} />
      </div>

      <div className="lg:col-span-2">
        <EnvironmentPanel data={sensorData.environment} history={history} />
      </div>

      <div className="lg:col-span-2">
        <OrientationPanel gyro={sensorData.gyroscope} mag={sensorData.magnetometer} />
      </div>

      <div className="lg:col-span-2">
        <MagnetometerPanel data={sensorData.magnetometer} history={history} />
      </div>

      <div className="lg:col-span-2">
        <SpectroscopePanel data={sensorData.spectroscope} />
      </div>
    </div>
  );
};

export default Dashboard;