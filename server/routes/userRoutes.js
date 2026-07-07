import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", auth, getUser);

export default userRouter;
