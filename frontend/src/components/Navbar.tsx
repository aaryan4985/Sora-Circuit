import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, Zap, Search } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

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
        
        <div className="nav-actions">
          <button className="btn-neon font-orbitron" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            My Team
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
