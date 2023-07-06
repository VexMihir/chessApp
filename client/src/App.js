import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './testcomponents/Home';
import ChessGame from './testcomponents/ChessGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:roomId" element={<ChessGame />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
