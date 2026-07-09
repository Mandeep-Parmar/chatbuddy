import express from "express";
import auth from "../middlewares/auth.js";
import { getPublishedImage } from "../controllers/communityController.js";

const communityRouter = express.Router();

communityRouter.get("/images", auth, getPublishedImage);

export default communityRouter;
