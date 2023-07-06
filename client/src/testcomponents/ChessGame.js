import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const Game = () => {
  const { roomId } = useParams();
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);
  const [move, setMove] = useState('');
  const [fen, setFen] = useState(''); // FEN state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.emit('join room', roomId, getUsernameFromState());

    newSocket.on('moveMade', (move, fen, legalMoves) => {
      // Here you can handle updates of the game state
      setFen(fen); // Update FEN state
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
      newSocket.off('moveMade');
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleMove = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit('move', roomId, move);
      setMove('');
    }
  };

  const getUsernameFromState = () => {
    const locationState = location.state;
    return locationState ? locationState.username : '';
  };

  return (
    <div>
      <h1>Room Number {roomId}</h1>
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
      <form onSubmit={handleMove}>
        <label>
          Enter your move:
          <input type="text" value={move} onChange={(e) => setMove(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h3>Current Game State (FEN):</h3>
      <p>{fen}</p>
    </div>
  );
};

export default Game;
