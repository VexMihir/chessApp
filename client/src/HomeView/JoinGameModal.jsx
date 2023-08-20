import React, { useState } from 'react';

const JoinGameModal = ({ onClose }) => {
  const [roomNumber, setRoomNumber] = useState('');

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleJoinRoom = () => {
    console.log(`Joining room number: ${roomNumber}`);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-10"
      onClick={handleBackgroundClick}
    >
      <div className="bg-extra-dark-blue rounded p-8 text-white border-2 border-solid" onClick={handleContentClick}>
        <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Join Game</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="roomNumber">
            Enter room number:
          </label>
          <input
            type="number"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            onWheel={(e) => e.preventDefault()} 
            className="p-2 rounded border border-white text-black"
          />
        </div>
        <button onClick={handleJoinRoom} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinGameModal;
