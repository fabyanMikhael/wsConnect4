const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const cors = require("cors");

app.use(cors());


const { GameManager } = require("./Game");
let GM = new GameManager();
io.on('connection', (socket) => {
    GM.Setup(socket);
});

server.listen(8080, '127.0.0.1', () => {
  console.log('listening on *:8080');
});