// We used ChatGPT to help create this file.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Game = () => {
  const { roomId } = useParams();
  const [yourClicks, setYourClicks] = useState(0);
  const [opponentClicks, setOpponentClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [socket, setSocket] = useState(null); // Add this line
  const [isDisconnected, setIsDisconnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:5001'); // Create new socket connection
    setSocket(newSocket);

    newSocket.emit('join room', roomId);

    newSocket.on('score update', (scores) => {
      setYourClicks(scores[0]);
      setOpponentClicks(scores[1]);
    });

    newSocket.on('game over', (winningPlayer) => {
      setGameOver(true);
      if (winningPlayer === 0) {
        alert('You won!');
      } else {
        alert('You lost!');
      }
    });

    newSocket.on('room full', () => {
      const confirmSpectator = window.confirm('The room is full. Do you want to join as a spectator?');
      if (confirmSpectator) {
        newSocket.emit('join as spectator', roomId);
      } else {
        navigate('/');
      }
    });

    newSocket.on('player disconnected', (roomNumber) => {
      if (roomId === roomNumber && !isDisconnected) {
          setIsDisconnected(true);
        // alert('Opponent disconnected');
       //  navigate('/');
        
      }
    });
    return () => {
      newSocket.off('score update');
      newSocket.off('game over');
      newSocket.disconnect(); // Disconnect the socket when the component is unmounted
    };
  }, [roomId]);

  const handleClick = () => {
    if (socket) { // Ensure that socket is connected before emitting an event
      socket.emit('click', roomId);
    }
  };

  return (
    <div>
      {isDisconnected && (
        <div className="disconnect-alert">
          <p>Opponent disconnected. Do you want to reconnect?</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
      <p>You have clicked {yourClicks} times.</p>
      <button onClick={handleClick} disabled={gameOver}>Click Me</button>
      <p>Your opponent has clicked {opponentClicks} times.</p>
      {gameOver && <p>Game Over</p>}
    </div>
  );
};

export default Game;
