const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');
const socketHandlers = require('./socket/socketHandlers.js');
const mongoose = require('mongoose');
const { instrument } = require("@socket.io/admin-ui");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [ process.env.FRONTEND_URL || "http://localhost:3000" || 'https://chessfrontend-2mfh.onrender.com' , "https://admin.socket.io"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const port = 5001;

app.use(cors());
app.use(express.json());

// Source: https://github.com/gitdagray/user_auth/blob/main/server.js
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
  res.send("Welcome to the game!");
});

let rooms = {};

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://JAMDK:3lxXgQuMgCTGsZwV@chessapp.ynnbkwt.mongodb.net/ChessGames?retryWrites=true&w=majority')
  .then(() => console.log('...// Connected to ChessApp Cluster //...'))
  .catch(error => console.log(error));

const gameSchema = new mongoose.Schema({
  history: [{}],
  playerOneData: Object,
  playerTwoData: Object,
  date: Date,
  result: String // "White", "Black", or "Draw"
});

const Game = mongoose.model('Games', gameSchema);

console.log("line 46");
socketHandlers.init(io, rooms, gameSchema, Game);
console.log("line 48");

app.post('/createGame', (req, res) => {
  console.log("line 49");
  const newUniqueRoomNumber = () => {
    const roomNumber = Math.floor(Math.random() * 1000000);
    if (rooms[roomNumber]) {
      console.log("line 52");
      return newUniqueRoomNumber();
    } else {
      console.log("line 55");
      return roomNumber;
    }
  };
  const roomNumber = newUniqueRoomNumber();

  let timeControl = 300//parseInt(req.query.timeControl); // time control in minutes
  let timeIncrement = 1//parseInt(req.query.timeIncrement); // time increment in seconds

  let owner = req.body.socketId;

  // default time controlis 5+0 if not specified 
  if (isNaN(timeControl)) {
    timeControl = 5 * 60; // to seconds
  }

  if (isNaN(timeIncrement)) {
    timeIncrement = 0;
  }

  // max time control is 1 hour, max increment is +3 minutes
  if (timeControl < 1 * 60 || timeControl > 60 * 60 || timeIncrement < 0 || timeIncrement > 180) {
    return res.status(400).json({ error: "Invalid time control or time increment" });
  }

  rooms[roomNumber] = {
    game: new ChessGame(),
    players: [],
    spectators: [],
    timers: {},
    timeControl: timeControl,
    increment: timeIncrement,
    currentPlayer: null,
    owner: owner, // associated with a socket id value for sever to check the person who creates the room. This allows the user creates only one room number.
    drawOffer: null
  }

  

  res.send({ roomNumber });
});

//Source: https://chat.openai.com/share/48692ed3-23bb-46f2-9226-6da51d2ced56
const seenObjects = new Set();
app.get('/rooms', (req, res) => {
  const roomsWithoutCircularRefs = JSON.stringify({rooms}, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seenObjects.has(value)) {
        return '[Curcular]'
      }
      seenObjects.add(value)
    }
    return value
  })
  seenObjects.clear()

  return res.send(JSON.parse(roomsWithoutCircularRefs))

})

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

instrument(io, {
  auth: false,
  mode: "development",
});

module.exports = app; // for testing purposes
