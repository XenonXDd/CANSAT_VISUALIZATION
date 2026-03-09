# CanSat Real-Time Sensor Dashboard

A modern, real-time web dashboard built with React, Vite, and TypeScript for monitoring and visualizing telemetry data from CanSat missions. 

This application is currently a **visualization demo** that runs a built-in simulation mode to display mock data for testing and demonstration purposes. It does not actively connect to hardware right now and serves primarily as a visualization prototype.

## Features

- **Simulation Mode:** Automatically generates and displays mock CanSat sensor data to demonstrate the dashboard's capabilities.
- **Comprehensive Sensor Support:**
  - **GPS:** Latitude, Longitude, Altitude, and Speed.
  - **Environment:** Temperature, Humidity, and Atmospheric Pressure.
  - **Orientation & Motion:** Magnetometer (X, Y, Z) and Gyroscope (Roll, Pitch, Yaw).
  - **Spectrometer:** 8-band light spectrum visualization.
- **Interactive Visualizations:** Uses Recharts for smooth, real-time historical data graphing.
- **Modern UI/UX:** Built with a dark-themed, responsive layout using Tailwind CSS.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/XenonXDd/CANSAT_VISUALIZATION.git
   cd CANSAT_VISUALIZATION
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Technologies Used

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)

## Acknowledgements

This project was originally created and bootstrapped using **Google AI Studio** for a CanSat competition.
