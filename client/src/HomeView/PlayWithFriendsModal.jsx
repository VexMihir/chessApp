import React, { useState } from 'react';
import axios from 'axios';
import { LOCALHOST_SERVER } from '../constants'
import { useNavigate } from 'react-router-dom';

const PlayWithFriendsModal = ({ onClose }) => {
  const [minutesPerSide, setMinutesPerSide] = useState('10');
  const [incrementInSeconds, setIncrementInSeconds] = useState('5');

  const navigate = useNavigate();

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  async function createGame() {

    const timeControl = {
        minutesPerSide: minutesPerSide,
        incrementInSeconds: incrementInSeconds,
    };

    let backendURL = process.env.REACT_APP_BACKEND_URL || LOCALHOST_SERVER

    try {
        const response = await axios.post(backendURL + '/createGame', timeControl);
        // get the room number from the response
        const roomNumber = response.data.roomNumber
        navigate(`/live/${roomNumber}`);
    } catch (e) {
        console.error(e)
    }

    console.log(timeControl)
  }

  const handleBlackClick = () => {
    console.log('Black button clicked');
    // TODO - add in logic for choosing side
    createGame() // should be something like createGame(BLACK)
  };

  const handleFiftyFiftyClick = () => {
    console.log('50/50 button clicked');
    // TODO - add in logic for choosing side
    createGame()

  };

  const handleWhiteClick = () => {
    console.log('White button clicked');
    // TODO - add in logic for choosing side
    createGame()
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
          <button onClick={handleBlackClick} className="bg-black text-white p-4 rounded-lg hover:bg-gray-800">
            Black
          </button>
          <button onClick={handleFiftyFiftyClick} className="bg-gray-400 text-black p-4 rounded-lg mx-2 hover:bg-gray-600">
            50/50
          </button>
          <button onClick={handleWhiteClick} className="bg-white text-black p-4 rounded-lg hover:bg-gray-300">
            White
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayWithFriendsModal;
