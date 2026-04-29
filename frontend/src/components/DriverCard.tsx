import React from 'react';
import { motion } from 'framer-motion';
import type { AnimeDriver } from '../types';
import { useTeam } from '../context/TeamContext';

interface Props {
  driver: AnimeDriver;
  index: number;
}

const StatBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div style={{ marginBottom: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px', textTransform: 'uppercase' }}>
      <span>{label}</span>
      <span style={{ color }}>{value}</span>
    </div>
    <div style={{ height: '4px', background: '#222', width: '100%' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color }}></div>
    </div>
  </div>
);

const DriverCard: React.FC<Props> = ({ driver, index }) => {
  const { myTeam, draftDriver } = useTeam();
  const isDrafted = myTeam.some(d => d.id === driver.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ 
        background: 'var(--bg-panel)',
        border: `1px solid ${isDrafted ? 'var(--accent-primary)' : '#222'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        opacity: isDrafted ? 0.5 : 1,
        filter: isDrafted ? 'grayscale(80%)' : 'none'
      }}
    >
      <div style={{ height: '220px', position: 'relative', overflow: 'hidden', background: '#000' }}>
        <img src={driver.imageUrl} alt={driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', mixBlendMode: 'lighten' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to top, var(--bg-panel), transparent)' }}></div>
        
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--accent-tertiary)', color: '#000', padding: '2px 8px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', fontSize: '0.9rem' }}>
          ${driver.cost}M
        </div>
      </div>
      
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{driver.animeSeries}</div>
        <h3 className="heading-font" style={{ fontSize: '1.2rem', margin: '5px 0 20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{driver.name}</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <StatBar label="Speed" value={driver.speed} color="#ff003c" />
          <StatBar label="Cornering" value={driver.cornering} color="#00f0ff" />
          <StatBar label="Overtaking" value={driver.overtaking} color="#fcee0a" />
          <StatBar label="Reliability" value={driver.reliability} color="#ffffff" />
        </div>
        
        <div style={{ borderLeft: '2px solid var(--accent-secondary)', paddingLeft: '10px', fontSize: '0.8rem', marginTop: 'auto', marginBottom: '20px' }}>
          <div style={{ color: 'var(--text-dim)' }}>SPECIAL ABILITY</div>
          <div style={{ color: '#fff' }}>{driver.specialAbility}</div>
        </div>
        
        <button 
          className="btn-cyber" 
          onClick={() => draftDriver(driver)}
          disabled={isDrafted}
          style={{ width: '100%', opacity: isDrafted ? 0 : 1, pointerEvents: isDrafted ? 'none' : 'auto' }}
        >
          ACQUIRE
        </button>
      </div>
    </motion.div>
  );
};

export default DriverCard;
