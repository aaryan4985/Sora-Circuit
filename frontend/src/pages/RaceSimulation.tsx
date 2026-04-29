import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import type { Race, RaceResult } from '../types';

const RaceSimulation: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, RaceResult[]>>({});
  const [sectors, setSectors] = useState<string[]>(['', '', '']); // 'green', 'purple', 'yellow'

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/races');
      setRaces(response.data);
    } catch (error) {
      console.error('Error fetching races:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateRace = async (raceId: number) => {
    setSimulating(raceId);
    setSectors(['', '', '']);
    
    // Fake sector timing effect
    let step = 0;
    const interval = setInterval(() => {
      setSectors(prev => {
        const next = [...prev];
        const colors = ['#00f0ff', '#ff003c', '#fcee0a'];
        if (step < 3) {
          next[step] = colors[Math.floor(Math.random() * colors.length)];
        } else if (step < 6) {
          next[step - 3] = colors[Math.floor(Math.random() * colors.length)];
        }
        return next;
      });
      step++;
    }, 400);

    try {
      const response = await axios.post(`http://localhost:8080/api/races/${raceId}/simulate`);
      
      setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
          setResults(prev => ({ ...prev, [raceId]: response.data }));
          fetchRaces();
          setSimulating(null);
        }, 500);
      }, 3000);

    } catch (error) {
      clearInterval(interval);
      setSimulating(null);
    }
  };

  const fetchResults = async (raceId: number) => {
    if (results[raceId]) {
      // Toggle off
      setResults(prev => {
        const next = { ...prev };
        delete next[raceId];
        return next;
      });
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/races/${raceId}/results`);
      setResults(prev => ({ ...prev, [raceId]: response.data }));
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '50px' }}>
        <h2 className="heading-font" style={{ color: 'var(--text-dim)', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
          RACE CONTROL // <span style={{ color: 'var(--accent-primary)' }}>SIMULATION</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {races.map((race, index) => (
          <motion.div 
            key={race.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              background: 'var(--bg-panel)', 
              border: '1px solid #222',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {simulating === race.id && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-secondary)', boxShadow: '0 0 10px var(--accent-secondary)' }} />
            )}

            <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: results[race.id] || simulating === race.id ? '1px solid #222' : 'none' }}>
              <div>
                <h3 className="heading-font" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '5px' }}>{race.name}</h3>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', display: 'flex', gap: '20px' }}>
                  <span>LOC: {race.circuit}</span>
                  <span>DATE: {new Date(race.scheduledTime).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                {race.completed ? (
                  <button 
                    className="btn-cyber" 
                    onClick={() => fetchResults(race.id)}
                    style={{ borderColor: 'var(--accent-tertiary)', color: 'var(--accent-tertiary)' }}
                  >
                    {results[race.id] ? 'CLOSE ARCHIVE' : 'DECRYPT ARCHIVE'}
                  </button>
                ) : (
                  <button 
                    className="btn-cyber" 
                    onClick={() => simulateRace(race.id)}
                    disabled={simulating !== null}
                  >
                    {simulating === race.id ? 'UPLINK ACTIVE...' : 'EXECUTE SIMULATION'}
                  </button>
                )}
              </div>
            </div>

            {/* Live Telemetry View */}
            <AnimatePresence>
              {simulating === race.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ background: '#000', padding: '20px 30px' }}
                >
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {[1, 2, 3].map(sector => (
                      <div key={sector} style={{ flex: 1, border: '1px solid #222', padding: '15px', position: 'relative' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>SECTOR {sector}</div>
                        <div style={{ height: '10px', marginTop: '10px', background: sectors[sector-1] || '#222', boxShadow: sectors[sector-1] ? `0 0 10px ${sectors[sector-1]}` : 'none', transition: 'all 0.2s' }}></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Grid */}
            {results[race.id] && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ background: '#020202', padding: '20px 30px' }}
              >
                <div className="heading-font" style={{ color: 'var(--accent-secondary)', marginBottom: '15px' }}>OFFICIAL CLASSIFICATION</div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-dim)', borderBottom: '1px solid #222', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>POS</th>
                      <th style={{ padding: '10px' }}>DRIVER</th>
                      <th style={{ padding: '10px' }}>TEAM</th>
                      <th style={{ padding: '10px' }}>POINTS</th>
                      <th style={{ padding: '10px' }}>TELEMETRY LOGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results[race.id].map(res => (
                      <tr key={res.id} style={{ borderBottom: '1px solid #111', color: res.position === 1 ? 'var(--accent-tertiary)' : '#fff' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>P{res.position}</td>
                        <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={res.driver.imageUrl} alt="" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} />
                          {res.driver.name}
                        </td>
                        <td style={{ padding: '10px', color: 'var(--text-dim)' }}>{res.driver.animeSeries}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>+{res.pointsEarned}</td>
                        <td style={{ padding: '10px', fontSize: '0.8rem', color: res.remark.includes('Special') ? 'var(--accent-primary)' : 'var(--text-dim)' }}>{res.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RaceSimulation;
