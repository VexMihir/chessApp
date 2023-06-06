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

app.get('/', (req, res) => {
    res.send('Hello World!')
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

io.on('connection', (socket) => {
    console.log('a user connected');
});