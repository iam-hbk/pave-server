import express from "express";
import connectDB from "./database";
import * as socketIo from "socket.io";
import { Server, createServer } from "node:http";
//middlewares
import cors from "cors";
import { errorHandler } from "@middlewares/errorHandler";
//routes
import userRoutes from "./routes/userRoutes";
import classSessionRoutes from "./routes/classSessionRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import dailyQuestionRoutes from "./routes/dailyQuestionRoutes";
import moduleRoutes from "./routes/moduleRoutes";
import paveCoinTransactionRoutes from "./routes/paveCoinTransactionRoutes";
import quizRoutes from "./routes/quizRoutes";
import quizAnswerRoutes from "./routes/quizAnswerRoutes";

import user, { walletChangePipeline } from "@models/user";

export const app = express();
const server: Server = createServer(app);
const io: socketIo.Server = new socketIo.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors());
// To customize CORS settings:
// app.use(cors({
//   origin: 'http://yourfrontenddomain.com', // replace with your frontend domain
//   methods: ['GET', 'POST'], // allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/class-session", classSessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/daily-question", dailyQuestionRoutes);
app.use("/api/transaction", paveCoinTransactionRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/answer-quiz", quizAnswerRoutes);
app.use("/api/quiz", quizRoutes);
app.use(errorHandler);

// Socket.io
io.on("connection", (socket) => {
  console.log("New client connected");
  // setInterval(() => {
  //   socket.emit('wallet change', { data: 'Test wallet change' });
  // }, 5000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
io.on("connection", (socket) => {
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Watch for changes in the user collection
console.log("Setting up wallet change stream...");
const walletChangeStream = user.watch(walletChangePipeline);

walletChangeStream.on("change", (change) => {
  console.log("Wallet change detected:", change);
  io.emit("wallet change", change);
});
console.log("Wallet change stream set up.");

// Handle errors
walletChangeStream.on("error", (error) => {
  console.error("Error with wallet change stream:", error);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
