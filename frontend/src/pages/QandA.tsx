import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Moon,
  Sun,
  Settings,
  X,
  Loader2,
  MessageSquare
} from "lucide-react";
import apiService from "../services/api";
import { Message, CustomSettings, Theme } from "../types";

const themes = {
  light: {
    background: "bg-gray-100",
    surface: "bg-white",
    primary: "bg-indigo-600",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    border: "border-gray-200",
    hover: "hover:bg-gray-100",
  },
  dark: {
    background: "bg-gray-900",
    surface: "bg-gray-800",
    primary: "bg-indigo-500",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    border: "border-gray-700",
    hover: "hover:bg-gray-700",
  },
};

export default function Chat() {
  const userData = localStorage.getItem("user");
  let email = "JohnDoe@gmail.com";
  let username = "You";
  if (userData) {
    email = JSON.parse(userData).email;
    username = JSON.parse(userData).username || "You";
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo]=useState("")
  const [isSending, setIsSending] = useState(false);
  const [settings, setSettings] = useState<CustomSettings>({
    messageBubbleStyle: "rounded",
    fontSize: "medium",
    messageSpacing: "comfortable",
    showTimestamps: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const theme: Theme = isDark ? themes.dark : themes.light;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await apiService.getMessages();
        if (res.data.length > 0) {
          setMessages(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    if (userData) {
      const name = JSON.parse(userData).username || "You";
      const message: Message = {
        senderName: name,
        message: newMessage,
        senderMail: email,
        updatedAt: new Date(Date.now()),
        repliedTo:replyingTo
      };

      const optimisticMessage = { ...message };
      setMessages((prevData) => [...prevData, optimisticMessage]);
      setNewMessage("");
      setIsSending(true);

      try {
        const res = await apiService.sendMessage(message);
        setMessages((prevData) => {
          const filtered = prevData.filter((m) => m !== optimisticMessage);
          return [...filtered, ...res.data];
        });
      } catch (error) {
        console.error("Message not sent!!", error);
        setMessages((prevData) =>
          prevData.filter((m) => m !== optimisticMessage)
        );
        setNewMessage(message.message);
      } finally {
        setIsSending(false);
      }
    }
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const getMessageSpacing = () => {
    switch (settings.messageSpacing) {
      case "compact":
        return "space-y-2";
      default:
        return "space-y-4";
    }
  };

  const getBubbleStyle = () => {
    switch (settings.messageBubbleStyle) {
      case "sharp":
        return "rounded";
      default:
        return "rounded-lg";
    }
  };

  const formatTime = (date: Date | string) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`min-h-screen ${theme.background} transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`${theme.surface} shadow-md rounded-t-lg p-4 flex items-center justify-between transition-colors duration-300`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isDark ? "bg-gray-700" : "bg-indigo-100"
              } p-2 rounded-full transition-colors duration-300`}
            >
              <MessageSquare
                className={`w-6 h-6 ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
            </motion.div>
            <div>
              <h1 className={`text-xl font-semibold ${theme.text}`}>Q & A</h1>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <p className={`text-sm ${theme.textSecondary}`}>Online</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full ${theme.hover} transition-colors`}
              aria-label="Settings"
            >
              <Settings className={`w-5 h-5 ${theme.text}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${theme.hover} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className={`w-5 h-5 ${theme.text}`} />
              ) : (
                <Moon className={`w-5 h-5 ${theme.text}`} />
              )}
            </motion.button>
          </div>
        </motion.div>
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`${theme.surface} border-x ${theme.border} overflow-hidden transition-colors duration-300`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`font-semibold ${theme.text}`}>
                    Customize Chat
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSettings(false)}
                    className={`p-1 rounded-full ${theme.hover}`}
                    aria-label="Close settings"
                  >
                    <X className={`w-5 h-5 ${theme.text}`} />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${theme.text} mb-2`}
                    >
                      Message Style
                    </label>
                    <select
                      value={settings.messageBubbleStyle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          messageBubbleStyle: e.target.value as
                            | "rounded"
                            | "sharp",
                        })
                      }
                      className={`block w-full ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } rounded-md px-3 py-2 ${
                        theme.text
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="rounded">Rounded</option>
                      <option value="sharp">Sharp</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${theme.text} mb-2`}
                    >
                      Font Size
                    </label>
                    <select
                      value={settings.fontSize}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          fontSize: e.target.value as
                            | "small"
                            | "medium"
                            | "large",
                        })
                      }
                      className={`block w-full ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } rounded-md px-3 py-2 ${
                        theme.text
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${theme.text} mb-2`}
                    >
                      Message Spacing
                    </label>
                    <select
                      value={settings.messageSpacing}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          messageSpacing: e.target.value as
                            | "compact"
                            | "comfortable",
                        })
                      }
                      className={`block w-full ${
                        isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } rounded-md px-3 py-2 ${
                        theme.text
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showTimestamps"
                      checked={settings.showTimestamps}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          showTimestamps: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all duration-200"
                    />
                    <label
                      htmlFor="showTimestamps"
                      className={`text-sm font-medium ${theme.text}`}
                    >
                      Show message timestamps
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className={`flex-1 ${
            theme.surface
          } overflow-y-auto p-4 ${getMessageSpacing()} transition-colors duration-300 border-x ${
            showSettings ? "" : "border-t"
          } border-b ${theme.border} relative`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2
                  className={`w-8 h-8 ${theme.text} animate-spin mx-auto mb-2`}
                />
                <p className={`${theme.textSecondary}`}>Loading messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare
                className={`w-12 h-12 ${theme.textSecondary} mb-3 opacity-50`}
              />
              <h3 className={`text-lg font-medium ${theme.text} mb-1`}>
                No messages yet
              </h3>
              <p className={`${theme.textSecondary}`}>
                Start the conversation by sending a message below
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, id) => {
                const isCurrentUser = message.senderMail === email;
                const displayName = isCurrentUser
                  ? username
                  : message.senderName;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: id * 0.05 }}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    } mb-6`}
                  >
                    <div className="flex flex-col max-w-[80%]">
                      {/* Sender name */}
                      <span
                        className={`text-sm font-medium mb-1 ${
                          isCurrentUser ? "text-right" : "text-left"
                        } ${theme.textSecondary}`}
                      >
                        {displayName}
                      </span>

                      <div className="flex">
                        {!isCurrentUser && (
                          <div className="flex-shrink-0 mr-2 mt-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDark ? "bg-gray-700" : "bg-gray-200"
                              }`}
                            >
                              <User className={`w-4 h-4 ${theme.text}`} />
                            </div>
                          </div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className={`${getBubbleStyle()} p-3 ${
                            isCurrentUser
                              ? `${theme.primary} text-white shadow-md`
                              : `${isDark ? "bg-gray-700" : "bg-gray-100"} ${
                                  theme.text
                                } shadow-sm`
                          } transition-all duration-200`}
                        >
                          {message.repliedTo && <p className="p-1 bg-gray-800 rounded-md">{message.repliedTo}</p>}
                          <p className={`${getFontSize()}`}>
                            {message.message}
                          </p>
                          {settings.showTimestamps && (
                            <p
                              className={`text-xs mt-1 ${
                                isCurrentUser
                                  ? "text-indigo-200"
                                  : theme.textSecondary
                              }`}
                            >
                              {formatTime(message.updatedAt)}
                            </p>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />

              {/* Scroll to bottom button */}
              {chatContainerRef.current &&
                chatContainerRef.current.scrollHeight -
                  chatContainerRef.current.scrollTop >
                  chatContainerRef.current.clientHeight + 100 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToBottom}
                    className={`absolute bottom-4 right-4 ${theme.surface} ${theme.border} rounded-full p-2 shadow-lg`}
                    aria-label="Scroll to bottom"
                  >
                    {/* <ChevronDown className={`w-5 h-5 ${theme.text}`} /> */}
                  </motion.button>
                )}
            </>
          )}
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onSubmit={handleSendMessage}
          className={`${theme.surface} shadow-md rounded-b-lg p-4 flex gap-2 transition-colors duration-300`}
        >
          {replyingTo && <p className="flex items-center gap-1 absolute -top-8 right-5 bg-gray-700 px-2 py-1 rounded-t-md text-white">Replyingt to: {replyingTo} <X onClick={()=>setReplyingTo("")} className="cursor-pointer"/></p>}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
            className={`flex-1 ${
              isDark
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } rounded-lg px-4 py-3 ${
              theme.text
            } placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSending || newMessage.trim() === ""}
            className={`${
              theme.primary
            } text-white rounded-lg px-5 py-3 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${
              isSending || newMessage.trim() === ""
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}