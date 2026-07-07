import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/userValidation.js";

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), registerUser);
userRouter.post("/login", validate(loginSchema), loginUser);
userRouter.get("/data", auth, getUser);

export default userRouter;
