import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listning on port ${PORT}`);
});
