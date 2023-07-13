import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChessApp from './ChessApp';
import reportWebVitals from './reportWebVitals';

import io from 'socket.io-client';

// const socket = io('http://localhost:5001');

// socket.on('connect', function() {
//   console.log('Connected to server');
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ChessApp />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
