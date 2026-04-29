import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Target, Gauge } from 'lucide-react';
import type { AnimeDriver } from '../types';
import './DriverCard.css';

interface Props {
  driver: AnimeDriver;
  index: number;
}

const DriverCard: React.FC<Props> = ({ driver, index }) => {
  return (
    <motion.div 
      className="glass-card driver-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="card-header">
        <div className="cost-badge font-orbitron">${driver.cost}M</div>
        <img src={driver.imageUrl} alt={driver.name} className="driver-image" />
        <div className="overlay-gradient"></div>
      </div>
      
      <div className="card-body">
        <div className="series-tag">{driver.animeSeries}</div>
        <h3 className="driver-name font-orbitron text-gradient">{driver.name}</h3>
        
        <div className="stats-grid">
          <div className="stat-item">
            <Gauge size={16} className="stat-icon speed" />
            <span className="stat-value">{driver.speed}</span>
          </div>
          <div className="stat-item">
            <Target size={16} className="stat-icon cornering" />
            <span className="stat-value">{driver.cornering}</span>
          </div>
          <div className="stat-item">
            <Zap size={16} className="stat-icon overtaking" />
            <span className="stat-value">{driver.overtaking}</span>
          </div>
          <div className="stat-item">
            <Shield size={16} className="stat-icon reliability" />
            <span className="stat-value">{driver.reliability}</span>
          </div>
        </div>
        
        <div className="ability-box">
          <span className="ability-label">Special:</span>
          <span className="ability-name">{driver.specialAbility}</span>
        </div>
        
        <button className="btn-neon w-full mt-4" style={{ padding: '8px', fontSize: '0.9rem' }}>
          Draft Driver
        </button>
      </div>
    </motion.div>
  );
};

export default DriverCard;
