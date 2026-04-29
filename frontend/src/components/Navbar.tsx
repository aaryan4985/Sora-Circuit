import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Zap, Wallet, UsersRound } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { budget, myTeam } = useTeam();

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="glass-panel navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand font-orbitron">
          <Zap className="brand-icon" />
          <span className="text-gradient">Sora</span>Circuit
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Users size={18} /> Roster
          </Link>
          <Link to="/races" className={`nav-link ${isActive('/races')}`}>
            <Trophy size={18} /> Grand Prix
          </Link>
        </div>
        
        <div className="nav-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TEAM BUDGET</span>
            <span className="font-orbitron" style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
              ${budget}M
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ROSTER</span>
            <span className="font-orbitron" style={{ color: myTeam.length === 5 ? '#f94144' : 'var(--neon-pink)', fontWeight: 'bold' }}>
              {myTeam.length}/5
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
