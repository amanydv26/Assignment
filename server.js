const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const initOrderWatcher = require("./services/orderWatcher");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", orderRoutes);

// Connect DB
connectDB();

// Init Change Stream Watcher
initOrderWatcher(io);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
