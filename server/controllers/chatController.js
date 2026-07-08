import ChatModel from "../models/ChatModel.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      userName: req.user.name,
      name: "New Chat",
      messages: [],
    };

    await ChatModel.create(chatData);

    res.json({ success: true, message: "Chat created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await ChatModel.find({ userId }).sort({ updatedAt: -1 });

    res.json({ success: true, chats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;

    const deleted = await ChatModel.deleteOne({ _id: chatId, userId });

    if (deleted.deletedCount === 0) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
