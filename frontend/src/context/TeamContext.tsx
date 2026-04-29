import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AnimeDriver } from '../types';

interface TeamContextType {
  myTeam: AnimeDriver[];
  budget: number;
  draftDriver: (driver: AnimeDriver) => void;
  dropDriver: (driverId: number) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myTeam, setMyTeam] = useState<AnimeDriver[]>([]);
  const [budget, setBudget] = useState<number>(100); // 100M starting budget

  const draftDriver = (driver: AnimeDriver) => {
    if (myTeam.length >= 5) {
      alert("Your team is full! Max 5 drivers.");
      return;
    }
    if (myTeam.find(d => d.id === driver.id)) {
      alert("Driver is already in your team.");
      return;
    }
    if (budget < driver.cost) {
      alert("Insufficient budget!");
      return;
    }
    
    setMyTeam([...myTeam, driver]);
    setBudget(prev => prev - driver.cost);
  };

  const dropDriver = (driverId: number) => {
    const driverToDrop = myTeam.find(d => d.id === driverId);
    if (driverToDrop) {
      setMyTeam(myTeam.filter(d => d.id !== driverId));
      setBudget(prev => prev + driverToDrop.cost);
    }
  };

  return (
    <TeamContext.Provider value={{ myTeam, budget, draftDriver, dropDriver }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within TeamProvider");
  return context;
};
