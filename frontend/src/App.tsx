
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RaceSimulation from './pages/RaceSimulation';
import { TeamProvider } from './context/TeamContext';

function App() {
  return (
    <TeamProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/races" element={<RaceSimulation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TeamProvider>
  );
}

export default App;
