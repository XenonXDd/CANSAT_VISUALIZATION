import React from 'react';
import type { GyroscopeData, MagnetometerData } from '../types';
import { CubeTransparentIcon } from './Icons';

interface OrientationPanelProps {
  gyro: GyroscopeData;
  mag: MagnetometerData;
}

const getDirection = (heading: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((heading %= 360) < 0 ? heading + 360 : heading) / 45) % 8;
  return directions[index];
}

const OrientationPanel: React.FC<OrientationPanelProps> = ({ gyro, mag }) => {
  // atan2(y, x) has 0 degrees pointing East. We add 90 degrees to make North 0 degrees.
  const heading = (Math.atan2(mag.y, mag.x) * (180 / Math.PI) + 450) % 360;

  // --- Cylinder Model Parameters ---
  const CYLINDER_DIAMETER_REM = 5;
  const CYLINDER_HEIGHT_REM = 8;
  const NUM_PANELS = 24; // More panels = smoother cylinder
  const ANGLE_PER_PANEL = 360 / NUM_PANELS;
  const RADIUS_REM = CYLINDER_DIAMETER_REM / 2;

  // Generate the side panels for the cylinder body
  const cylinderBodyPanels = Array.from({ length: NUM_PANELS }).map((_, i) => {
    const isFrontPanel = i === 0;
    const style: React.CSSProperties = {
      position: 'absolute',
      // Panel width is calculated to form a regular polygon. A small overlap is added to prevent visual gaps.
      width: `${2 * RADIUS_REM * Math.tan(Math.PI / NUM_PANELS) + 0.05}rem`,
      height: `${CYLINDER_HEIGHT_REM}rem`,
      left: `calc(50% - ${(2 * RADIUS_REM * Math.tan(Math.PI / NUM_PANELS) + 0.05) / 2}rem)`, // Center each panel before rotating
      // Use a gradient for a more rounded 3D effect
      background: `linear-gradient(90deg, rgba(55, 65, 81, 0.7) 0%, rgba(75, 85, 99, 0.9) 50%, rgba(55, 65, 81, 0.7) 100%)`,
      border: isFrontPanel ? '1px solid #6ee7b7' : '1px solid #4A5568',
      transform: `rotateY(${i * ANGLE_PER_PANEL}deg) translateZ(${RADIUS_REM}rem)`,
      backfaceVisibility: 'hidden',
    };
    if (isFrontPanel) {
      style.background = 'rgba(107, 114, 128, 0.9)'; // A flatter color for the front indicator
    }
    return <div key={i} style={style}></div>;
  });

  // Style for the top and bottom circular caps
  const cylinderCapStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${CYLINDER_DIAMETER_REM}rem`,
    height: `${CYLINDER_DIAMETER_REM}rem`,
    left: `calc(50% - ${RADIUS_REM}rem)`,
    top: `calc(50% - ${RADIUS_REM}rem)`, // Center the cap element before transforming
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    border: '1px solid #4A5568',
    borderRadius: '50%',
    backfaceVisibility: 'hidden',
  };


  return (
    <div className="bg-white/90 rounded-3xl p-5 shadow-xl border border-slate-200 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-amber-600 flex items-center mb-4">
        <CubeTransparentIcon className="w-6 h-6 mr-2" />
        3D Orientation
      </h2>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 items-center min-h-[300px]">
        {/* 3D Cansat View */}
        <div className="flex flex-col items-center justify-center h-full">
          <div style={{ perspective: '1000px', width: '10rem', height: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              className="cansat-model"
              style={{
                width: `${CYLINDER_DIAMETER_REM}rem`,
                height: `${CYLINDER_HEIGHT_REM}rem`,
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${-gyro.pitch}deg) rotateY(${gyro.yaw}deg) rotateZ(${-gyro.roll}deg)`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              {/* Render Cylinder Parts */}
              {cylinderBodyPanels}
              <div style={{ ...cylinderCapStyle, transform: `rotateX(90deg) translateZ(${CYLINDER_HEIGHT_REM / 2}rem)` }}></div>
              <div style={{ ...cylinderCapStyle, transform: `rotateX(-90deg) translateZ(${CYLINDER_HEIGHT_REM / 2}rem)` }}></div>
            </div>
          </div>
          <div className="text-center mt-4 font-mono text-xs space-y-1">
            <p><span className="text-slate-500">Roll:</span> {gyro.roll.toFixed(1).padStart(6, ' ')}°</p>
            <p><span className="text-slate-500">Pitch:</span> {gyro.pitch.toFixed(1).padStart(5, ' ')}°</p>
            <p><span className="text-slate-500">Yaw:</span> {gyro.yaw.toFixed(1).padStart(7, ' ')}°</p>
          </div>
        </div>

        {/* Compass View */}
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-slate-100/90 border-2 border-slate-200 flex items-center justify-center text-sm">
            <span className="absolute top-2 text-red-400 font-bold">N</span>
            <span className="absolute bottom-2 text-slate-500">S</span>
            <span className="absolute left-3 text-slate-500">W</span>
            <span className="absolute right-3 text-slate-500">E</span>
            <div
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${heading}deg)`,
                transition: 'transform 0.5s ease-out',
              }}
            >
              <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-red-500 -translate-x-1/2 origin-bottom" style={{ boxShadow: '0 0 5px rgba(239, 68, 68, 0.7)' }}>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 border-t-2 border-l-2 border-red-500 transform rotate-45 -mt-1"></div>
              </div>
            </div>
            <div className="w-2 h-2 bg-slate-400 rounded-full z-10"></div>
          </div>
          <p className="mt-4 text-xl font-mono text-slate-900">
            {heading.toFixed(1)}°
            <span className="text-base text-slate-500 ml-2">
              {getDirection(heading)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrientationPanel;
