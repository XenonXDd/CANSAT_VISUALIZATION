import React, { useState, useEffect } from 'react';

interface ConnectionManagerProps {
  isConnected: boolean;
  availablePorts: SerialPort[];
  onConnect: (port: SerialPort) => void;
  onConnectNew: () => void;
  onDisconnect: () => void;
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({ isConnected, availablePorts, onConnect, onConnectNew, onDisconnect }) => {
  const [selectedPortIndex, setSelectedPortIndex] = useState<string>('');

  useEffect(() => {
    // Reset selection when disconnected
    if (!isConnected) {
      setSelectedPortIndex('');
    }
  }, [isConnected]);

  const handleConnectClick = () => {
    if (selectedPortIndex !== '' && availablePorts[parseInt(selectedPortIndex)]) {
      onConnect(availablePorts[parseInt(selectedPortIndex)]);
    }
  };

  const getPortName = (port: SerialPort) => {
    try {
        const info = port.getInfo();
        if(info.usbVendorId && info.usbProductId) {
            return `USB VID:${info.usbVendorId} PID:${info.usbProductId}`;
        }
    } catch (e) {
        // port.getInfo() might throw if port is disconnected
        console.warn("Could not get port info", e);
    }
    return 'Serial Port';
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}
          style={{
            animationDuration: isConnected ? '2s' : '1.5s',
            boxShadow: `0 0 8px ${isConnected ? 'rgba(16, 185, 129, 0.7)' : 'rgba(244, 63, 94, 0.7)'}`,
          }}
        ></span>
        <span className="text-sm font-medium text-slate-700">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {isConnected ? (
        <button
          onClick={onDisconnect}
          className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-300"
        >
          Disconnect
        </button>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          {availablePorts.length > 0 && (
            <>
              <select
                value={selectedPortIndex}
                onChange={(e) => setSelectedPortIndex(e.target.value)}
                className="bg-white border border-slate-300 text-slate-900 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block p-2"
                aria-label="Select a previously connected serial port"
              >
                <option value="" disabled>Reconnect to...</option>
                {availablePorts.map((port, index) => (
                  <option key={index} value={index}>
                    {getPortName(port)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleConnectClick}
                disabled={selectedPortIndex === ''}
                className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                Reconnect
              </button>
            </>
          )}
          <button
            onClick={onConnectNew}
            className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-300"
          >
            {availablePorts.length > 0 ? 'Connect New' : 'Connect'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionManager;
