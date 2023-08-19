const JoinGameButton = ({ onClick }) => {
    return (
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        Join Game
      </button>
    );
  };
  
  export default JoinGameButton;
  