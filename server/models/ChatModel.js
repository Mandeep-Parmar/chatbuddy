import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    // chat name
    name: {
      type: String,
      required: true,
    },
    messages: [
      {
        isImage: { type: Boolean, required: true },
        isPublished: { type: Boolean, default: false },
        role: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

const ChatModel = mongoose.model("Chat", ChatSchema);

export default ChatModel;
