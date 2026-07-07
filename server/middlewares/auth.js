import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(token_decode.id);

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default auth;
