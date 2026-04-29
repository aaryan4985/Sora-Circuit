import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DriverCard from '../components/DriverCard';
import type { AnimeDriver } from '../types';

const Dashboard: React.FC = () => {
  const [drivers, setDrivers] = useState<AnimeDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="font-orbitron" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          DRIVER <span className="text-gradient">ROSTER</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Draft your ultimate team of high-speed anime racers. 
          Balance speed, cornering, and special abilities to conquer the Grand Prix.
        </p>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '400px' }}>
          <div className="font-orbitron text-gradient" style={{ fontSize: '1.5rem', animation: 'pulse 1.5s infinite' }}>
            LOADING DRIVERS...
          </div>
        </div>
      ) : (
        <div className="grid-cards">
          {drivers.map((driver, index) => (
            <DriverCard key={driver.id} driver={driver} index={index} />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; text-shadow: 0 0 20px var(--neon-cyan); }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
