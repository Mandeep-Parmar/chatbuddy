import express from "express";
import { getPlans } from "../controllers/planController.js";
import auth from "../middlewares/auth.js";

const planRouter = express.Router();

planRouter.get("/", auth, getPlans);

export default planRouter;
