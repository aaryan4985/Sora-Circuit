import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import DriverCard from '../components/DriverCard';
import type { AnimeDriver } from '../types';
import { useTeam } from '../context/TeamContext';

const Dashboard: React.FC = () => {
  const [drivers, setDrivers] = useState<AnimeDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const { myTeam, dropDriver } = useTeam();

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
    <div>
      {/* GARAGE SECTION */}
      <div style={{ marginBottom: '50px' }}>
        <h2 className="heading-font" style={{ color: 'var(--text-dim)', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
          MY GARAGE // <span style={{ color: 'var(--accent-secondary)' }}>ROSTER</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '20px', height: '180px' }}>
          {[0, 1, 2, 3, 4].map(i => {
            const driver = myTeam[i];
            return (
              <div 
                key={i} 
                style={{ 
                  flex: 1, 
                  background: driver ? 'var(--bg-panel)' : 'transparent',
                  border: driver ? '1px solid var(--accent-secondary)' : '1px dashed #333',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                {driver ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '70%', position: 'relative' }}>
                      <img src={driver.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', mixBlendMode: 'lighten', opacity: 0.8 }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, var(--bg-panel), transparent)' }}></div>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2, marginTop: '-20px' }}>
                      <div>
                        <div className="heading-font" style={{ fontSize: '0.9rem' }}>{driver.name.split(' ')[0]}</div>
                        <div style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 'bold' }}>${driver.cost}M</div>
                      </div>
                      <button onClick={() => dropDriver(driver.id)} className="btn-cyber danger" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>DROP</button>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>
                    0{i+1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MARKET SECTION */}
      <div>
        <h2 className="heading-font" style={{ color: 'var(--text-dim)', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
          DRIVER MARKET // <span style={{ color: 'var(--accent-primary)' }}>AVAILABLE</span>
        </h2>
        
        {loading ? (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)', fontFamily: 'var(--font-heading)' }}>
            INITIALIZING DATABASE...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {drivers.map((driver, index) => (
              <DriverCard key={driver.id} driver={driver} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
