const PlayWithFriendsButton = ({ onClick }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={onClick}
      >
        Play with Friends
      </button>
    );
  };
  
  export default PlayWithFriendsButton;
  