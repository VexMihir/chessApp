import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [roomNumber, setRoomNumber] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await axios.get('http://localhost:5001/createGame');
      if (response.data && response.data.roomNumber) {
        navigate(`/in/${response.data.roomNumber}`, { state: { username } }); // Pass username in state
      }
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = () => {
    navigate(`/in/${roomNumber}`, { state: { username } }); // Pass username in state
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <form>
        <input type="text" placeholder="Enter room number" value={roomNumber} onChange={handleRoomNumberChange} />
        <input type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
      </form>
    </div>
  );
}

export default Home;
