import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5001");

function SocketTesting() {
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected to server!");
    });
    socket.on('joinedRoom', (roomNumber) => {
      console.log(`Joined room ${roomNumber}`);
    });
    socket.on('error', (error) => {
      console.log(error);
    });
  }, []);

  const createRoom = () => {
    socket.emit('createRoom');
    console.log("createRoom event emitted")
  };

  const joinRoom = () => {
    socket.emit('joinRoom', roomNumber);
    console.log("joinRoom event emitted")
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
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

export default SocketTesting;
