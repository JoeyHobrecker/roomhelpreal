import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import RoomPlanner from './pages/RoomPlanner';
import DesignPrinciples from './pages/DesignPrinciples';
import Help from './pages/Help';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room-planner" element={<RoomPlanner />} />
            <Route path="/design-principles" element={<DesignPrinciples />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
