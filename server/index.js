const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const cors = require("cors");

// Example of a session
let session = {
  sId: "123",
  status: "inactive",
  studentId: "yo",
  tutorId: "mama",
  date: "lol",
  startTime: "hihi",
  endTime: "huhu",
};

const userSocket = new Map();

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`Client connected with Socket ID: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  userSocket.set(userId, socket.id);
  console.log(userSocket);
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/api/v1/session/:id", (req, res) => {
  const sessionId = req.params.id;
  // Find session with ID
  res.json(session);
});

app.patch("/api/v1/session/:id", (req, res) => {
  const { status, liveShareUrl } = req.body;
  session.status = status;
  session.liveShareUrl = liveShareUrl;
  io.emit("sessionStart", session);
  res.json(session);
});

server.listen(3000, console.log("Listening on port 3000"));
