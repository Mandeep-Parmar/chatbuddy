import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import toast from "react-hot-toast";
import { MdOutlineFileDownload } from "react-icons/md";

const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);

  const downloadImage = async (imageUrl) => {
    try {
      // Download the image
      const response = await fetch(imageUrl);

      // Convert it into a Blob
      const blob = await response.blob();

      // Create a temporary URL
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> tag
      const link = document.createElement("a");

      link.href = url;
      link.download = `chatbuddy-image-${Date.now()}.png`;

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download image.");
    }
  };

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>

            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img src={assets.user_icon} alt="user" className="w-8 rounded-full" />
        </div>
      ) : (
        // role is ai (ai reply)
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <div className="relative">
              <img
                src={message.content}
                alt="Generated Image"
                className="w-full max-w-md mt-4 rounded-md"
              />

              <button
                onClick={() => downloadImage(message.content)}
                className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-violet-600 hover:border-violet-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                title="Download Image"
              >
                <MdOutlineFileDownload size={20} />
              </button>
            </div>
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
