const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addUser } = require("./utils/user");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hi bro");
});

let imgURLglobal;
let globalRoomId;

io.on("connection", (socket) => {
  console.log("joined");
  socket.on("joined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    globalRoomId = roomId;
    socket.join(roomId);
    const users = addUser(data);
    socket.emit("confirm", { success: true, users });
    socket.broadcast.to(roomId).emit("allusers", users);
    socket.broadcast.to(roomId).emit("response", {
      imgURL: imgURLglobal,
    });
  });
  socket.on("whiteboardData", (data) => {
    console.log(data);
    imgURLglobal = data;
    socket.broadcast.to(globalRoomId).emit("response", {
      imgURL: data,
    });
  });
});

server.listen(5000, () => {
  console.log("server running");
});
