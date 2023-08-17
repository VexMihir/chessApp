import React from 'react';
import FamousGamePlayThrough from './FamousGamePlayThrough';

const HomeView = () => {

  const handlePlayWithFriends = () => {
    console.log('Play with Friends button clicked');
  };

  const handleJoinGame = () => {
    console.log('Join Game button clicked');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center pr-10">
        <div className="text-white text-3xl mb-8">quick_chess</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handlePlayWithFriends}
        >
          Play with Friends
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleJoinGame}
        >
          Join Game
        </button>
      </div>
      <FamousGamePlayThrough />
    </div>
  );
};

export default HomeView;
