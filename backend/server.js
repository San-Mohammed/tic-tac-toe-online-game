const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});
let players = [];
const gameStats = [null,null,null,null,null,null,null,null,null]

io.on("connection", (socket) => {
    console.log("player connected", socket.id);
    
    players.push(socket.id)
    if (players.length ==2) {
        io.emit("receive-stats", gameStats)
        io.to(players[0]).emit("tic-type" , "X")
        io.to(players[1]).emit("tic-type", "O")
    }
    socket.on("disconnect", () => {
    players = players.filter(p => p !== socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
