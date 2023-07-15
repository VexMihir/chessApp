const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ChessGame = require('./game/game.js');
const socketHandlers = require('./socket/socketHandlers.js');
const {instrument} = require('@socket.io/admin-ui')
const mongoose = require('mongoose');
const RoomNumListDAO = require('./model/RoomNumListDAO.js');


const {MongoClient} = require('mongodb');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
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

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('...// Connected to ChessApp Cluster //...'))
//     .catch(error => console.log(error));


const client = new MongoClient(process.env.MONGO_URI);

(async () => {
  console.log("Connecting to MongoDB...");
  const conn = await client.connect(function() {
    // Source: https://stackoverflow.com/questions/14495975/why-is-it-recommended-not-to-close-a-mongodb-connection-anywhere-in-node-js-code
    // Source: https://chat.openai.com/share/2fdb37d8-3bab-40b9-8157-8f2e3764b2a4
    process.on('SIGINT', function() {
      client.close()
      process.exit(0);
    })

  });
  console.log(`Database Connected`);
})()

const gameSchema = new mongoose.Schema({
    gameHistory: [{}],
    playerOneData: Object,
    playerTwoData: Object,
    date: Date,
    winner: Boolean // true if playerOne wins, false if playerTwo wins
});

const Game = mongoose.model('Games', gameSchema);

// console.log("line 45", io) 
// console.log("line 46", rooms)
// console.log("line 47", gameSchema)
// console.log("line 48", Game);


socketHandlers.init(io, rooms, gameSchema, Game);

app.get('/createGame', async (req, res) => {
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


  const result = await RoomNumListDAO.getAllRoomNums(client);

  console.log("line 98", result);
  // const formatedResult = {
  //   "itemList": result
  // }

  // return res.send(formatedResult);

  res.send({ roomNumber });
});


app.post("/createGamePost", async function (req, res, next) {


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

  const result = await RoomNumListDAO.createItem(client, roomNumber);

  return res.send(result);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // for testing purposes

instrument(io, { auth: false });
