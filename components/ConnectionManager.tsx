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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-green-400' : 'bg-red-500'}`}
          style={{
            animationDuration: isConnected ? '2s' : '1.5s',
            boxShadow: `0 0 8px ${isConnected ? 'rgba(74, 222, 128, 0.7)' : 'rgba(239, 68, 68, 0.7)'}`,
          }}
        ></span>
        <span className="text-sm font-medium text-gray-300">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {isConnected ? (
        <button
          onClick={onDisconnect}
          className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
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
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 block p-2"
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
                className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Reconnect
              </button>
            </>
          )}
          <button
            onClick={onConnectNew}
            className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400"
          >
            {availablePorts.length > 0 ? 'Connect New' : 'Connect'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionManager;
