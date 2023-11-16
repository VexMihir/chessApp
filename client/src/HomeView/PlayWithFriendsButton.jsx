const PlayWithFriendsButton = ({ onClick }) => {
    return (
      <button
        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={onClick}
      >
        Play with Friends
      </button>
    );
  };
  
  export default PlayWithFriendsButton;
  