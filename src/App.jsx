import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import EducationPage from './pages/EducationPage';

import StateDetail from './pages/StateDetail';
import GameOver from './pages/GameOver';
import LearnPage from './pages/LearnPage';
import DonatePage from './pages/DonatePage';
import AboutPage from './pages/AboutPage';
import './App.css';
import Navbar from './components/Navbar';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/simulation" element={<MapPage />} />
            <Route path="/start" element={<StartScreen />} />
            <Route path="/start/:stateName" element={<StartScreen />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/state-detail/:stateName" element={<StateDetail />} />
            <Route path="/game-over" element={<GameOver />} />
            <Route path="/education" element={<EducationPage />} />
            
          </Routes>
        </main>
      </div>
    </NotificationProvider>
  );
}

export default App;
