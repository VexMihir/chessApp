const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to the game!");
});

let rooms = {};

app.get('/createGame', (req, res) => {
  const newUniqueRoomNumber = () => {
    const roomNumber = Math.floor(Math.random() * 1000000);
    if (rooms[roomNumber]) {
      return newUniqueRoomNumber();
    } else {
      return roomNumber;
    }
  };
  const roomNumber = newUniqueRoomNumber();
  // rooms[roomNumber] = { players: [], spectators: [], scores: [0, 0] };
  // instead of instantiating the previous game with just scores, we need to instantiate it with the default Chess game state, plus players and spectators
  rooms[roomNumber] = {
    game: new ChessGame(),
    players: [],
    spectators: []
  }
  res.send({ roomNumber });
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join room', (roomNumber, username) => {
    if (rooms[roomNumber]) {
      if (rooms[roomNumber].players.length < 2) {
        socket.join(roomNumber);
        rooms[roomNumber].players.push({ id: socket.id, username });

        if (rooms[roomNumber].players.length === 2) {
          io.to(roomNumber).emit('start game');
        }
      } else {
        socket.emit('room full', roomNumber);
        console.log(`User ${socket.id} attempted to join room ${roomNumber}, which is full`);
      }
    } else {
      console.log(`Room ${roomNumber} does not exist`);
    }

    const userList = {
      players: rooms[roomNumber].players,
      spectators: rooms[roomNumber].spectators
    };
    io.to(roomNumber).emit('user list update', userList);
  });

  socket.on('join as spectator', (roomNumber, username) => {
    if (rooms[roomNumber]) {
      socket.join(roomNumber);
      rooms[roomNumber].spectators.push({ id: socket.id, username });
      console.log(`User ${socket.id} joined as a spectator in room ${roomNumber}`);

      const userList = {
        players: rooms[roomNumber].players,
        spectators: rooms[roomNumber].spectators
      };
      io.to(roomNumber).emit('user list update', userList);
    } else {
      console.log(`Room ${roomNumber} does not exist`);
    }
  });

  socket.on('move', (roomNumber, move) => {
    if (rooms[roomNumber]) {
        try {
            // could throw an error if the move is invalid
            pieceMove = rooms[roomNumber].game.movePiece(move);
            currentFen = rooms[roomNumber].game.getCurrentFEN();
            validMoves = rooms[roomNumber].game.validMoves();
            console.log(`Valid moves: ${validMoves}`)
            io.to(roomNumber).emit('moveMade', move, currentFen, validMoves);
        } catch (error) {
            console.log(error);
            // sending back an error message
            socket.emit('errorMoving', `Error moving: ${error}`);
            return;
        }
        // send back the move that was just made, the updated FEN, and the list of legal moves
    } else {
        console.log(`Room ${roomNumber} does not exist`);
        // send back an error message
        socket.emit('error', `Error moving: room ${roomNumber} does not exist`);
    }
    });


  socket.on('disconnect', () => {
    console.log('Client disconnected');
    const roomNumber = Object.keys(rooms).find((key) =>
      rooms[key].players.some(player => player.id === socket.id) ||
      rooms[key].spectators.some(spectator => spectator.id === socket.id)
    );
    if (roomNumber) {
      rooms[roomNumber].players = rooms[roomNumber].players.filter(player => player.id !== socket.id);
      rooms[roomNumber].spectators = rooms[roomNumber].spectators.filter(spectator => spectator.id !== socket.id);

      const userList = {
        players: rooms[roomNumber].players,
        spectators: rooms[roomNumber].spectators
      };
      io.to(roomNumber).emit('user list update', userList);

      io.to(roomNumber).emit('player disconnected', roomNumber);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // for testing purposes
