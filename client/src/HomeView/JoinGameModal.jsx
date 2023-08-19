const JoinGameModal = ({ onClose }) => {
    const handleBackgroundClick = (e) => {
      onClose();
    };
  
    const handleContentClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10"
        onClick={handleBackgroundClick}
      >
        <div className="bg-white rounded p-8" onClick={handleContentClick}>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Join Game</h2>
          <p>Content for joining a game...</p>
        </div>
      </div>
    );
  };
  
  export default JoinGameModal;
  