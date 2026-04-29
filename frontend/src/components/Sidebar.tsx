import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crosshair, Flag, TriangleAlert } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { budget, myTeam } = useTeam();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '60px' }}>
        <h1 className="heading-font" style={{ fontSize: '1.8rem', lineHeight: '1', color: 'var(--accent-secondary)' }}>
          SORA<br/>CIRCUIT
        </h1>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '2px', marginTop: '5px' }}>
          VER. 2.0.4
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
        <Link 
          to="/" 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '15px', 
            color: isActive('/') ? 'var(--accent-secondary)' : 'var(--text-dim)', 
            textDecoration: 'none', fontSize: '1.2rem', fontFamily: 'var(--font-heading)',
            transition: 'color 0.2s'
          }}
        >
          <Crosshair size={24} /> DRIVER MARKET
        </Link>
        <Link 
          to="/races" 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '15px', 
            color: isActive('/races') ? 'var(--accent-secondary)' : 'var(--text-dim)', 
            textDecoration: 'none', fontSize: '1.2rem', fontFamily: 'var(--font-heading)',
            transition: 'color 0.2s'
          }}
        >
          <Flag size={24} /> RACE CONTROL
        </Link>
      </nav>

      {/* Telemetry Box */}
      <div style={{ 
        border: '1px solid rgba(255,0,60,0.3)', 
        padding: '20px', 
        background: 'rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: -10, left: 10, background: 'var(--bg-panel)', padding: '0 5px', fontSize: '0.8rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
          TEAM STATUS
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '5px' }}>
              <span>BUDGET</span>
              <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>${budget}M</span>
            </div>
            <div style={{ height: '4px', background: '#222', width: '100%' }}>
              <div style={{ height: '100%', width: `${budget}%`, background: 'var(--accent-tertiary)' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '5px' }}>
              <span>GARAGE SLOTS</span>
              <span style={{ color: myTeam.length === 5 ? 'var(--accent-primary)' : 'var(--accent-secondary)', fontWeight: 700 }}>{myTeam.length} / 5</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ height: '8px', flex: 1, background: i < myTeam.length ? 'var(--accent-secondary)' : '#222' }}></div>
              ))}
            </div>
          </div>
        </div>
        
        {myTeam.length === 5 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.8rem', marginTop: '15px', fontFamily: 'var(--font-heading)' }}>
            <TriangleAlert size={14} /> GARAGE FULL
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
