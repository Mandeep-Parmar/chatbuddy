import openai from "../configs/openai.js";
import SYSTEM_PROMPT from "../configs/systemPrompt.js";
import ChatModel from "../models/ChatModel.js";
import UserModel from "../models/UserModel.js";

// Text-based AI chat message controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }

    const { chatId, prompt } = req.body;

    const chat = await ChatModel.findOne({ userId, _id: chatId });

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }

    // push user promp in messages
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Set the chat title using the first user prompt
    if (chat.messages.length === 1) {
      chat.name = prompt.length > 40 ? `${prompt.slice(0, 40)}...` : prompt;
    }

    // pass full chat history instead of single prompt
    const conversationHistory = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...chat.messages
        // send only text history
        .filter((message) => !message.isImage)
        // This keeps only the latest 20 messages.
        .slice(-20)
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    ];

    const response = await openai.chat.completions.create({
      model: "gemini-3.5-flash",
      messages: conversationHistory,
    });

    const assistantReply = response.choices[0].message.content;

    const reply = {
      role: "assistant",
      content: assistantReply,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);

    await chat.save();
    await UserModel.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    res.json({ success: true, reply });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
