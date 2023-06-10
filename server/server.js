// We relied on ChatGPT and CoPilot to generate much of the following code. We understand it doe ;)

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  
    methods: ["GET", "POST"] 
  }
});

app.use(cors());

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

rooms = {}

io.on('connect', (socket) => {
  console.log('a user connected!');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Listen for a createRoom event
  socket.on('createRoom', () => {
    // Return a random room number
    console.log('createRoom event received')

    const newUniqueRoomNumber = () => {
      const roomNumber = Math.floor(Math.random() * 1000000);
      if (rooms[roomNumber]) {
        return newUniqueRoomNumber();
      } else {
        return roomNumber;
      }
    }

    const roomNumber = newUniqueRoomNumber();
    socket.emit('joinedRoom', roomNumber);
    socket.join(roomNumber);
  });

  // Listen for a joinRoom event
  socket.on('joinRoom', (roomNumber) => {
    // Check if the number of clients in the room is less than 2
    // If so, join the room
    if (io.sockets.adapter.rooms.get(roomNumber).size < 2) {
      socket.join(roomNumber);
      socket.emit('joinedRoom', roomNumber);
    } else {
      socket.emit('roomFull');
    }
  });
  
});
