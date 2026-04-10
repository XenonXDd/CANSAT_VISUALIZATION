import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/95 rounded-3xl p-6 shadow-xl border border-slate-200">
        <h2 className="text-xl font-semibold text-sky-600 mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-slate-800">Data Simulation</h3>
            <p className="text-slate-500 mt-1 max-w-2xl">
              This section will contain controls for the simulated data feed, such as adjusting the update interval or the range of generated values. This is useful for testing the UI without a live device connected.
            </p>
          </div>
          <div className="border-t border-slate-200 my-4"></div>
          <div>
            <h3 className="text-lg font-medium text-slate-800">Theme & Appearance</h3>
            <p className="text-slate-500 mt-1 max-w-2xl">
              Future settings for changing the application's color theme or layout could be placed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
