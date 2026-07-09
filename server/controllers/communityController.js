import ChatModel from "../models/ChatModel.js";

// Get all images that users have published to the community
export const getPublishedImage = async (req, res) => {
  try {
    // MongoDB Aggregation Pipeline
    // It processes data inside the database instead of fetching everything
    const publishedImages = await ChatModel.aggregate([
      // Convert each message inside the messages array into a separate document
      { $unwind: "$messages" },

      // Keep only messages that are:
      // 1. AI generated images
      // 2. Marked as published by the user
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true,
        },
      },
      {
        $project: {
          _id: 0, // Don't return MongoDB id
          imageUrl: "$messages.content", // Image URL
          userName: "$userName", // Name of the image creator
        },
      },
    ]);

    res.json({ success: true, images: publishedImages.reverse() });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
