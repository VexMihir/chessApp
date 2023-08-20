import React, { useState } from 'react';

const PlayWithFriendsModal = ({ onClose }) => {
  const [minutesPerSide, setMinutesPerSide] = useState(10);
  const [incrementInSeconds, setIncrementInSeconds] = useState(5);

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
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
        <div className="text-xl font-bold mb-4">Play with Friends</div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="minutes">
            Minutes per side: {minutesPerSide}
          </label>
          <input
            type="range"
            id="minutes"
            value={minutesPerSide}
            onChange={(e) => setMinutesPerSide(e.target.value)}
            min="1"
            max="60"
            step="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="increment">
            Increment in seconds: {incrementInSeconds}
          </label>
          <input
            type="range"
            id="increment"
            value={incrementInSeconds}
            onChange={(e) => setIncrementInSeconds(e.target.value)}
            min="0"
            max="60"
            step="1"
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-black text-white p-4 rounded-lg">
            Black
          </button>
          <button className="bg-gray-400 text-black p-4 rounded-lg mx-2">
            50/50
          </button>
          <button className="bg-white text-black p-4 rounded-lg">
            White
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayWithFriendsModal;
