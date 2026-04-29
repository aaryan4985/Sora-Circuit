import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RaceSimulation from './pages/RaceSimulation';

function App() {
  return (
    <Router>
      <div className="speed-lines"></div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/races" element={<RaceSimulation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
