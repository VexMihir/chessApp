import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './testcomponents/Home';
import Game from './testcomponents/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:roomId" element={<Game />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
