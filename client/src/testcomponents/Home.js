// We used ChatGPT to help create this file.

import '../App.css';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests
import { useNavigate } from 'react-router-dom';

function Home() {
  const [roomNumber, setRoomNumber] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await axios.get('http://localhost:5001/createGame');
      if (response.data && response.data.roomNumber) {
        navigate(`/${response.data.roomNumber}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = () => {
    navigate(`/${roomNumber}`);
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <form>
        <input type="text" placeholder="Enter room number" value={roomNumber} onChange={handleRoomNumberChange} />
      </form>
    </div>
  );
}

export default Home;
