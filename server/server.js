const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Kilowatt server");
});

// WebsocketIO connection
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log("Websocket client connected");
  // SEND DATA POINTS HERE --> sample ac unit message as string, able to adjust
  // object as you see fit
  // to receive messages, use socket.on
  // to send messages, use socket.emit
  // Navigate to client/src/app/page.tsx to view where the message is received
  io.emit("ac unit", { message: "this is the ac unit" });

  socket.on("disconnect", () => {
    console.log("Websocket client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
