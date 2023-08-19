import React, { useState } from 'react';
import HistoricalGamePlayThrough from './HistoricalGamePlayThrough';
import PlayWithFriendsButton from './PlayWithFriendsButton';
import JoinGameButton from './JoinGameButton';
import PlayWithFriendsModal from './PlayWithFriendsModal';
import JoinGameModal from './JoinGameModal';

const HomeView = () => {
  const [showPlayWithFriendsModal, setShowPlayWithFriendsModal] = useState(false);
  const [showJoinGameModal, setShowJoinGameModal] = useState(false);

  const handlePlayWithFriends = () => {
    setShowPlayWithFriendsModal(true);
  };

  const handleJoinGame = () => {
    setShowJoinGameModal(true);
  };

  const closePlayWithFriendsModal = () => {
    setShowPlayWithFriendsModal(false);
  };

  const closeJoinGameModal = () => {
    setShowJoinGameModal(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {showPlayWithFriendsModal && <PlayWithFriendsModal onClose={closePlayWithFriendsModal} />}
      {showJoinGameModal && <JoinGameModal onClose={closeJoinGameModal} />}
      <div className="flex flex-col items-center pr-10">
        <div className="text-white text-3xl mb-8 font-black">quick_chess</div>
        <PlayWithFriendsButton onClick={handlePlayWithFriends} />
        <JoinGameButton onClick={handleJoinGame} />
      </div>
      <HistoricalGamePlayThrough />
    </div>
  );
};

export default HomeView;
