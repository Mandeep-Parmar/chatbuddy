import express from "express";
import auth from "../middlewares/auth.js";
import { textMessageController } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/text", auth, textMessageController);

export default aiRouter;
