const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const UserModel = require("./models/User");  // ✅ Import User model
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
connectDB();  // ✅ Connect to MongoDB once

console.log("✅ SECRET_KEY Loaded:", process.env.SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

// ✅ Define API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", require("./routes/adminRoutes")); 
app.use("/api/reports", require("./routes/reportRoutes")); 
app.use("/api/admin", adminRoutes);
app.use("/api/admin", reportRoutes);

// ✅ Users Route
app.get("/api/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// ✅ Socket.io for real-time updates
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("newReport", (data) => {
        io.emit("reportUpdate", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// ✅ Start the server (use only ONE port)
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
