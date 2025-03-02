import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import messageRoutes from "./routes/messageRoutes";
import quizRoutes from "./routes/quizRoutes";
import interviewRoutes from "./routes/interviewRoutes";

dotenv.config();
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/chat", messageRoutes);
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/interview",interviewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));