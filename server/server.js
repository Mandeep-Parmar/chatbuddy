import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import communityRouter from "./routes/communityRoute.js";

const app = express();

await connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/ai", aiRouter);
app.use("/api/community", communityRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`);
});
