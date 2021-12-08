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

app.use(express.static(__dirname + '/public'));


///Game stuff////////////////////////////////////////
const { GameManager } = require("./Game");
const { WS_Client } = require('./wsEnums');
let GM = new GameManager();
let PlayerCount = 0;
io.on('connection', (socket) => {

    PlayerCount++;
    io.emit(WS_Client.PlayerCount, PlayerCount);
    socket.on('disconnect', () => {PlayerCount--; io.emit(WS_Client.PlayerCount, PlayerCount);});

    GM.Setup(socket);
});
///////////////////////////////////////////////////


server.listen(80, '0.0.0.0', () => {
  console.log('listening on *:80');
});