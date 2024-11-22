const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
// Import routes
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/group");
const resourceRoutes = require("./routes/resource");
const { saveMessageToDataBase } = require("./controllers/chatController");
const profileRoutes = require("./routes/profileRoutes");
dotenv.config();


// Connect to the database
connectDB();

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Middleware to parse JSON
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("joinRoom", async (roomName) => {
    try {
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined room: ${roomName}`);
      
      // Optionally, emit a confirmation to the client
      socket.emit("roomJoined", { success: true, roomName });

      socket.on("serverRcvsMsg", async (msg) => {
        const result = await saveMessageToDataBase(msg.text, msg.userId, roomName);
        if (!result) {
          socket.emit("roomnotfounderror", "Room not found or message could not be saved");
        } else {
          console.log("Sending msg to room:", roomName);
          io.to(roomName).emit("serverSendsMsg", msg);
 // Send message to everyone in the room
          // NotifyUser(msg.userId , true , roomName);
        }
      });

      socket.on("msgrcvdconfirmation" , async(msg)=>{
        // NotifyUser(msg.userId , false , roomName)
      })

    } catch (error) {
      console.error('Error handling room join:', error);
      socket.emit('roomJoined', { success: false, message: 'An error occurred while joining the room' });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use("/api/chat", require("./routes/routing.js"));
// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/profile", profileRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
