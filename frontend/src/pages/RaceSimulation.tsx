import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import type { Race, RaceResult } from '../types';
import { Trophy, Calendar, Flag, Play } from 'lucide-react';

const RaceSimulation: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, RaceResult[]>>({});

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
    try {
      const response = await axios.post(`http://localhost:8080/api/races/${raceId}/simulate`);
      setResults(prev => ({ ...prev, [raceId]: response.data }));
      fetchRaces(); // Refresh status
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setSimulating(null);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="font-orbitron" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          GRAND <span className="text-gradient">PRIX</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Experience the thrill of high-speed anti-gravity racing.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {races.map((race, index) => (
          <motion.div 
            key={race.id}
            className="glass-panel"
            style={{ padding: '24px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 className="font-orbitron" style={{ color: 'var(--neon-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flag size={20} /> {race.name}
                </h2>
                <div style={{ color: 'var(--text-muted)', display: 'flex', gap: '16px', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy size={14}/> {race.circuit}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> {new Date(race.scheduledTime).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                {race.completed ? (
                  <button className="btn-neon" disabled style={{ borderColor: 'var(--text-muted)', color: 'var(--text-muted)', cursor: 'default' }}>
                    Race Completed
                  </button>
                ) : (
                  <button 
                    className="btn-neon" 
                    onClick={() => simulateRace(race.id)}
                    disabled={simulating === race.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {simulating === race.id ? 'Simulating...' : <><Play size={16} /> Simulate Race</>}
                  </button>
                )}
              </div>
            </div>

            {results[race.id] && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginTop: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden' }}
              >
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(181, 23, 158, 0.1)' }}>
                  <h3 className="font-orbitron">Official Results</h3>
                </div>
                <div style={{ padding: '16px' }}>
                  {results[race.id].map(res => (
                    <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span className="font-orbitron" style={{ color: res.position === 1 ? '#ffd700' : res.position === 2 ? '#c0c0c0' : res.position === 3 ? '#cd7f32' : 'var(--text-muted)', fontSize: '1.2rem', width: '30px' }}>
                          P{res.position}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={res.driver.imageUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--neon-cyan)' }} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{res.driver.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{res.remark}</div>
                          </div>
                        </div>
                      </div>
                      <div className="font-orbitron" style={{ color: 'var(--neon-pink)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                        +{res.pointsEarned} PTS
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RaceSimulation;
