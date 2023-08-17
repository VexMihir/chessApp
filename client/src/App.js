import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './HomeView/HomeView';
import LiveGameView from './LiveGameView/LiveGameView';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/live/:id" element={<LiveGameView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
