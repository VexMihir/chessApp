const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');
const socketHandlers = require('./socket/socketHandlers.js');
const mongoose = require('mongoose');
const {getAllDocuments} = require("./socket/handlers/getOneAndGetAllMongo");
require('dotenv').config();

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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('...// Connected to ChessApp Cluster //...'))
    .catch(error => console.log(error));

const gameSchema = new mongoose.Schema({
    gameHistory: [{}],
    playerOneData: Object,
    playerTwoData: Object,
    date: Date,
    winner: Boolean // true if playerOne wins, false if playerTwo wins
});

const Game = mongoose.model('Games', gameSchema);

socketHandlers.init(io, rooms, gameSchema, Game);

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
  rooms[roomNumber] = {
    game: new ChessGame(),
    players: [],
    spectators: [],
    timers: {},
    currentPlayer: null,
    drawOffer: null
  }
  res.send({ roomNumber });
});

app.get('/getDBData', async (req, res) => {
  try {
    let result = await getAllDocuments()
    return res.status(200).send(result)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message)
  }
})

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // for testing purposes
