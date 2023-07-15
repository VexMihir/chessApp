const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');
const socketHandlers = require('./socket/socketHandlers.js');
const mongoose = require('mongoose');
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
    history: [{}],
    playerOneData: Object,
    playerTwoData: Object,
    date: Date,
    winner: String // "White", "Black", or "Draw"
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

app.get('/games', async (req, res) => {
    const uuid = req.query.uuid;
    if (uuid) {
        try {
            const game = await Game.findOne({ _id: uuid });
            if (game) {
                res.send(game);
            } else {
                res.status(404).send({ message: 'No game found with the specified UUID.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error finding game by UUID.' });
        }
    } else {
        const games = await Game.find().sort({ date: -1 }).limit(10);
        res.send(games);
    }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // for testing purposes
