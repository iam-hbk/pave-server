import express from "express";
import connectDB from "./database";
import { Server, createServer } from "node:http";
//middlewares
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
//routes
import userRoutes from "./routes/userRoutes";
import classSessionRoutes from "./routes/classSessionRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import dailyQuestionRoutes from "./routes/dailyQuestionRoutes";
import moduleRoutes from "./routes/moduleRoutes";
import paveCoinTransactionRoutes from "./routes/paveCoinTransactionRoutes";
import quizRoutes from "./routes/quizRoutes";
import quizAnswerRoutes from "./routes/quizAnswerRoutes";
import generateQuizRoutes from "./routes/generateQuizRoutes";
import { setupSocket } from "./notifications/socket";

export const app = express();
const server: Server = createServer(app);
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
  res.send("Pave APIs!");
});
app.use("/api/class-session", classSessionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/daily-question", dailyQuestionRoutes);
app.use("/api/transaction", paveCoinTransactionRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/answer-quiz", quizAnswerRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/generateQuiz", generateQuizRoutes);
app.use(errorHandler);

// Set up Socket.io
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
