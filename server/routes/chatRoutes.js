import express from "express";
import {
  createChat,
  deleteChat,
  getChats,
} from "../controllers/chatController.js";
import auth from "../middlewares/auth.js";

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/", auth, createChat);

// Get all chats of logged-in user
chatRouter.get("/", auth, getChats);

// Delete a specific chat
chatRouter.delete("/:chatId", auth, deleteChat);

export default chatRouter;
