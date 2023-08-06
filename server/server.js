const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');
const socketHandlers = require('./socket/socketHandlers.js');
const mongoose = require('mongoose');
const { instrument } = require("@socket.io/admin-ui");
const { time } = require('console');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "https://admin.socket.io"],
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
  result: String // "White", "Black", or "Draw"
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
  let timeControl = parseInt(req.query.timeControl); // time control in minutes

  if (!isNaN(timeControl)) {
    timeControl *= 60; // to seconds
  } 

  let timeIncrement = parseInt(req.query.timeIncrement); // time increment in seconds

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
    drawOffer: null
  }

  res.send({ roomNumber });
});

app.get('/rooms', (req, res) => {
  // return rooms
  res.send(rooms)
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

// app.post('/games', async (req, res, next) => {
//   console.log("line 89");
//   // console.log("line 89", req.body);


//   var newGame = new Game(req.body).save()
//   res.status(200).send('Successful')
//   // res.send("")


//   // var newGame = new Game({

//   //   history: [
//   //     {
//   //       color: "w",
//   //       piece: "p",
//   //       from: "f2",
//   //       to: "f4",
//   //       san: "f4",
//   //       flags: "b",
//   //       lan: "f2f4",
//   //       before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
//   //       after: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1"
//   //     },
//   //     {
//   //       color: "b",
//   //       piece: "p",
//   //       from: "e7",
//   //       to: "e5",
//   //       san: "e5",
//   //       flags: "b",
//   //       lan: "e7e5",
//   //       before: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
//   //       after: "rnbqkbnr/pppp1ppp/8/4p3/5P2/8/PPPPP1PP/RNBQKBNR w KQkq - 0 2"
//   //     }
//   //   ],
//   //   playerOneData: {
//   //     //Socket id
//   //     id: "1234",
//   //     username: "Dan",
//   //     color: "black"
//   //   },
//   //   playerTwoData: {
//   //     id: "2342",
//   //     username: "Jason",
//   //     color: "white"
//   //   },
//   //   date: new Date(),
//   //   winner: "Dan" // "White", "Black", or "Draw"

//   // }).save()
//   // console.log("line 89", newGame);
//   // res.send(newGame)
// })

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

instrument(io, {
  auth: false,
  mode: "development",
});

module.exports = app; // for testing purposes
