import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const Game = () => {
  const { roomId } = useParams();
  const [yourClicks, setYourClicks] = useState(0);
  const [opponentClicks, setOpponentClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newSocket = io(process.env.BACKEND_URL || 'http://localhost:5001');
    setSocket(newSocket);

    newSocket.emit('join room', roomId, getUsernameFromState());

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
        newSocket.emit('join as spectator', roomId, getUsernameFromState());
      } else {
        navigate('/');
      }
    });

    newSocket.on('player disconnected', (roomNumber) => {
      if (roomId === roomNumber) {
        alert('Opponent disconnected');
        navigate('/');
      }
    });

    newSocket.on('user list update', (userList) => {
      setPlayers(userList.players);
      setSpectators(userList.spectators);
    });

    return () => {
      newSocket.off('score update');
      newSocket.off('game over');
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleClick = () => {
    if (socket) {
      socket.emit('click', roomId);
    }
  };

  const getUsernameFromState = () => {
    const locationState = location.state;
    return locationState ? locationState.username : '';
  };

  return (
    <div>
      <h1>Room Number {roomId}</h1>
      <p>You have clicked {yourClicks} times.</p>
      <button onClick={handleClick} disabled={gameOver}>
        Click Me
      </button>
      <p>Your opponent has clicked {opponentClicks} times.</p>
      {gameOver && <p>Game Over</p>}
      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.username}</li>
        ))}
      </ul>
      <h2>Spectators:</h2>
      <ul>
        {spectators.map((spectator) => (
          <li key={spectator.id}>{spectator.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
