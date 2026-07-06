import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import logo_light from "../assets/logo_light.png";
import logo_dark from "../assets/logo_dark.png";

const Login = () => {
  const { theme } = useAppContext();

  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen px-4 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#1b191c] dark:to-[#08080a] text-gray-800 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white/80 dark:bg-[#1a1423]/40 border border-purple-200 dark:border-[#583C79]/30 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-purple-500/10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={theme === "dark" ? logo_light : logo_dark}
            alt="ChatBuddy Logo"
            className="h-10 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {state === "Login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          {state === "Login"
            ? "Sign in to continue chatting with ChatBuddy"
            : "Sign up to start your journey with ChatBuddy"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "Sign Up" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/10 border border-gray-300 dark:border-[#80609F]/30 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl outline-none text-sm transition-all focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-white/50 dark:bg-black/10 border border-gray-300 dark:border-[#80609F]/30 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl outline-none text-sm transition-all focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/10 border border-gray-300 dark:border-[#80609F]/30 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl outline-none text-sm transition-all focus:ring-1 focus:ring-purple-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-medium bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Form Toggle */}
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setState("Sign Up");
                  setError("");
                }}
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setState("Login");
                }}
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
