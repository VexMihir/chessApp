const JoinGameButton = ({ onClick }) => {
    return (
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        Join Game
      </button>
    );
  };
  
  export default JoinGameButton;
  