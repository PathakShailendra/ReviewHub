import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { Server as SocketServer } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on('chat-message', message => {
    console.log(message)
  } )
});

// Connect to MongoDB
connectDB();
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
