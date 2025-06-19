import { createContext, useContext, useState } from "react";
import { sendMsg } from "../api";

const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [mode, setMode] = useState("normal");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const generateMessageId = () =>
    `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      const userMessage = {
        id: generateMessageId(),
        content,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setIsSearching(true);
      setError(null);

      const responseData = await sendMsg(content);
      
      const aiMessage = {
        id: generateMessageId(),
        content: responseData,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
      const aiMessage = {
        id: generateMessageId(),
        content: msg,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsSearching(false);
    }
  };

  const value = {
    isSearching,
    messages,
    error,
    mode,
    setMode,
    sendMessage,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
