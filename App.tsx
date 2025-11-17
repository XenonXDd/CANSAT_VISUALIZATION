import React, { useState, useEffect, useCallback } from 'react';
import type { SensorPayload, HistoryPoint } from './types';
import Dashboard from './components/Dashboard';
import ConnectionManager from './components/ConnectionManager';

// Utility to generate random sensor data for simulation
const generateMockData = (): SensorPayload => {
  const now = new Date();
  const time = now.getTime() / 1000; // time in seconds for smooth periodic motion

  return {
    timestamp: now.getTime(),
    gps: {
      latitude: 40.7128 + Math.sin(time * 0.1) * 0.005,
      longitude: -74.0060 + Math.cos(time * 0.1) * 0.005,
      altitude: 10 + Math.sin(time * 0.5) * 5,
      speed: 8 + Math.cos(time) * 3,
    },
    environment: {
      temperature: 22 + Math.sin(time * 0.2) * 3,
      humidity: 55 + Math.cos(time * 0.3) * 10,
      pressure: 1013 + Math.sin(time * 0.1) * 2,
    },
    magnetometer: {
      x: 30 * Math.cos(time * 0.3),
      y: 30 * Math.sin(time * 0.3),
      z: -40 + Math.sin(time * 0.5) * 5,
    },
    gyroscope: {
      roll: 45 * Math.sin(time * 0.5),
      pitch: 30 * Math.sin(time * 0.7),
      yaw: (time * 25) % 360,
    },
    spectroscope: {
      bands: Array.from({ length: 8 }, (_, i) => 128 + 127 * Math.sin(time + i * (Math.PI / 4))),
    },
  };
};

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorPayload>(generateMockData);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [port, setPort] = useState<SerialPort | null>(null);
  const [reader, setReader] = useState<ReadableStreamDefaultReader | undefined>();
  const [isConnected, setIsConnected] = useState(false);
  const [availablePorts, setAvailablePorts] = useState<SerialPort[]>([]);

  const MAX_HISTORY_POINTS = 50;

  const updateStateWithNewData = (newData: SensorPayload) => {
    setSensorData(newData);
    const newHistoryPoint: HistoryPoint = {
        timestamp: new Date(newData.timestamp).toLocaleTimeString(),
        temperature: newData.environment.temperature,
        humidity: newData.environment.humidity,
        pressure: newData.environment.pressure,
        magX: newData.magnetometer.x,
        magY: newData.magnetometer.y,
        magZ: newData.magnetometer.z,
    };
    setHistory(prevHistory => [...prevHistory, newHistoryPoint].slice(-MAX_HISTORY_POINTS));
  }

  // Effect to populate available ports on mount
  useEffect(() => {
    const getAvailablePorts = async () => {
      if (navigator.serial) {
        try {
          const ports = await navigator.serial.getPorts();
          setAvailablePorts(ports);
        } catch (error) {
          console.error("Could not get serial ports:", error);
        }
      }
    };
    getAvailablePorts();
  }, []);

  // Effect for running data simulation
  useEffect(() => {
    if (isConnected) return; // Stop simulation when connected

    const interval = setInterval(() => {
      const newData = generateMockData();
      updateStateWithNewData(newData);
    }, 1000); // Update every 1 second for smoother animation

    return () => clearInterval(interval);
  }, [isConnected]);

  const connectToPort = useCallback(async (portToConnect: SerialPort) => {
    if (!portToConnect) return;
    try {
      await portToConnect.open({ baudRate: 9600 });
      setPort(portToConnect);
      setIsConnected(true);
      
      const textDecoder = new TextDecoderStream();
      if (portToConnect.readable) {
        portToConnect.readable.pipeTo(textDecoder.writable);
        const streamReader = textDecoder.readable.getReader();
        setReader(streamReader);
      }
    } catch (error) {
      console.error("There was an error opening the serial port:", error);
      setIsConnected(false);
    }
  }, []);

  const handleRequestNewPort = useCallback(async () => {
    if (!navigator.serial) {
      alert("Web Serial API not supported by your browser. Try Chrome or Edge.");
      return;
    }
    try {
      const newPort = await navigator.serial.requestPort();
      const updatedPorts = await navigator.serial.getPorts();
      setAvailablePorts(updatedPorts);
      await connectToPort(newPort);
    } catch (error) {
      console.log("Port selection cancelled or failed:", error);
    }
  }, [connectToPort]);

  const handleDisconnect = useCallback(async () => {
    if (reader) {
      await reader.cancel();
      setReader(undefined);
    }
    if (port) {
      await port.close();
      setPort(null);
    }
    setIsConnected(false);
  }, [port, reader]);

  // Effect for reading from serial port
  useEffect(() => {
    if (!reader) return;

    let buffer = '';
    const readLoop = async () => {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          buffer += value;
          let newlineIndex;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);

            if (line) {
              try {
                // Assuming the device sends a complete JSON object on each line
                const newData: SensorPayload = JSON.parse(line);
                updateStateWithNewData(newData);
              } catch (e) {
                console.warn("Could not parse JSON from serial port:", line);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error reading from serial port:", error);
        handleDisconnect();
      }
    };

    readLoop();

    return () => {
        if(reader){
            reader.cancel().catch(e => console.error("Error cancelling reader:", e));
        }
    }
  }, [reader, handleDisconnect]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Real-Time Sensor Dashboard</h1>
            <p className="text-sm text-gray-400">Live data feed from LoRa connected sensors</p>
          </div>
          <ConnectionManager 
            isConnected={isConnected}
            availablePorts={availablePorts}
            onConnect={connectToPort}
            onConnectNew={handleRequestNewPort}
            onDisconnect={handleDisconnect}
          />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Dashboard sensorData={sensorData} history={history} />
      </main>
      <footer className="text-center p-4 text-gray-500 text-xs">
        <p>
          {isConnected ? "Displaying live data from serial device." : "Sensor data is simulated for demonstration purposes."}
        </p>
      </footer>
    </div>
  );
};

export default App;