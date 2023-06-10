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

let rooms = {};

io.on('connect', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('createRoom', () => {
    console.log('createRoom event received');

    const newUniqueRoomNumber = () => {
      const roomNumber = Math.floor(Math.random() * 1000000);
      if (rooms[roomNumber]) {
        return newUniqueRoomNumber();
      } else {
        return roomNumber;
      }
    };

    const roomNumber = `${newUniqueRoomNumber()}`;
    rooms[roomNumber] = true; // later we will replace this with a game object
    socket.join(roomNumber);
    io.to(roomNumber).emit('joinedRoom', roomNumber); 
    console.log(`Room ${roomNumber} created`)
  });

  socket.on('joinRoom', async (roomNumber) => {
    console.log("joinRoom event received");

    // Log the number of clients in the room, if the room exists
    let roomExists = rooms[roomNumber]
    if (roomExists) {
      let clients = await io.in(roomNumber).fetchSockets();
      
      // Check if the room exists
      if (clients) {
        console.log(`There are ${clients.length} clients in room ${roomNumber} before joining`);
      } else {
        console.log(`There are 0 clients in room ${roomNumber} before joining. This should not happen.`);
        socket.emit('error', 'Room does not exist')
      }
      socket.join(roomNumber);

      // for logging: the number of clients in the room after the join
      clients = await io.in(roomNumber).fetchSockets();
      console.log(`There are ${clients.length} clients in room ${roomNumber} after the join`);
      io.to(roomNumber).emit('joinedRoom', roomNumber); 

    } else {
      socket.emit('error', 'Room does not exist')
      console.log('Error emitted - room does not exist')
      return
    }
  });
});
