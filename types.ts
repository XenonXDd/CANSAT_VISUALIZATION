export interface GpsData {
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
}

export interface EnvironmentData {
  temperature: number; // Celsius
  humidity: number;    // %
  pressure: number;    // hPa
}

export interface MagnetometerData {
  x: number; // microteslas (µT)
  y: number;
  z: number;
}

export interface GyroscopeData {
  roll: number;  // degrees
  pitch: number; // degrees
  yaw: number;   // degrees
}

export interface SpectroscopeData {
  bands: number[]; // Array of 8 values
}

export interface SensorPayload {
  timestamp: number;
  gps: GpsData;
  environment: EnvironmentData;
  magnetometer: MagnetometerData;
  gyroscope: GyroscopeData;
  spectroscope: SpectroscopeData;
}

// Type for historical data points used in charts
export interface HistoryPoint {
    timestamp: string;
    temperature: number;
    humidity: number;
    pressure: number;
    magX: number;
    magY: number;
    magZ: number;
}

// Fix: Add global type definitions for the Web Serial API (which are not yet in default TS libs)
// to fix "Cannot find name 'SerialPort'" and related errors.
declare global {
  // Fix: Add SerialPortInfo interface for the return type of port.getInfo().
  interface SerialPortInfo {
    usbVendorId?: number;
    usbProductId?: number;
  }

  interface SerialOptions {
    baudRate: number;
    dataBits?: number;
    stopBits?: number;
    parity?: "none" | "even" | "odd";
    bufferSize?: number;
    flowControl?: "none" | "hardware";
  }

  interface SerialPort {
    // Fix: Add getInfo() method to the SerialPort interface to align with the Web Serial API.
    getInfo(): SerialPortInfo;
    open(options: SerialOptions): Promise<void>;
    close(): Promise<void>;
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<Uint8Array>;
  }

  interface Navigator {
    readonly serial?: {
      requestPort(options?: any): Promise<SerialPort>;
      getPorts(): Promise<SerialPort[]>;
    };
  }
}
