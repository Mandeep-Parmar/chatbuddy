import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import logo_light from "../assets/logo_light.png";
import logo_dark from "../assets/logo_dark.png";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    token,
    setToken,
  } = useAppContext();

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged Out Successfully");
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();

      const confirm = window.confirm(
        "Are you sure you want to delete this chat?",
      );

      if (!confirm) return;

      const { data } = await axios.delete(`/api/chats/${chatId}`, {
        headers: { token },
      });

      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isSidebarOpen && "max-md:-translate-x-full"}`}
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? logo_light : logo_dark}
        alt="logo"
        className="w-full max-w-48"
      />

      {/* New chat button  */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search conversations  */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img
          src={assets.search_icon}
          alt="search"
          className="w-4 not-dark:invert"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-xs placeholder:text-gray-400 outline-none"
        />
      </div>

      {/* Recent Chats */}
      {/* Show "Recent Chats" heading only if at least one chat exists */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

      {/* Scrollable container for chat list */}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          // Filter chats based on the search input
          .filter((chat) =>
            // If the chat has messages, search using the first user message
            chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : // Otherwise (new/empty chat), search using the chat name
                chat.name.toLowerCase().includes(search.toLowerCase()),
          )

          // Create one sidebar card for each chat
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsSidebarOpen(false);
              }}
              key={chat._id}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="w-full truncate">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>

                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                onClick={(e) =>
                  toast.promise(deleteChat(e, chat._id), {
                    loading: "deleting...",
                  })
                }
                src={assets.bin_icon}
                alt="bin"
                className="block md:hidden md:group-hover:block w-4 cursor-pointer not-dark:invert opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
      </div>

      {/* Footer / Settings Section */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
        {/* Navigation Grid (Community & Credits) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Community Images */}
          <div
            onClick={() => {
              navigate("/community");
              setIsSidebarOpen(false);
            }}
            className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
            title="Community Images"
          >
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-4 h-4 not-dark:invert opacity-75"
            />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              Community
            </span>
          </div>

          {/* Credits Purchases Options */}
          <div
            onClick={() => {
              navigate("/credits");
              setIsSidebarOpen(false);
            }}
            className="flex items-center justify-center gap-2 p-2.5 border border-gray-300 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
            title="Credits Info"
          >
            <img
              src={assets.diamond_icon}
              alt="credit"
              className="w-4 h-4 dark:invert opacity-75"
            />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">
              {user ? `${user.credits} Credits` : "Credits"}
            </span>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center justify-between p-3 mt-3 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 transition-all duration-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={assets.user_icon}
              alt="user"
              className="w-8 h-8 rounded-full flex-shrink-0 border border-gray-200 dark:border-white/20"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate text-gray-800 dark:text-white">
                {user ? user.name : "Guest User"}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                {user ? "Standard Account" : "Please log in"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Dark Mode Icon Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
              title="Toggle Dark Mode"
            >
              <img
                src={assets.theme_icon}
                alt="theme"
                className="w-4 h-4 not-dark:invert opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>

            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
                title="Log Out"
              >
                <img
                  src={assets.logout_icon}
                  alt="logout"
                  className="w-4 h-4 not-dark:invert opacity-75 hover:opacity-100 transition-opacity"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <img
        onClick={() => setIsSidebarOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt="close"
      />
    </div>
  );
};

export default Sidebar;
