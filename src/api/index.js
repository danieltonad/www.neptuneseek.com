import axios from "axios";

// Base configuration for axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const post = async (endpoint, data) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      retries++;
      if (retries === MAX_RETRIES) {
        throw new Error(
          `Failed after ${MAX_RETRIES} retries: ${error.message}`
        );
      }
      console.log(`Attempt ${retries} failed, retrying...`);
      await sleep(RETRY_DELAY);
    }
  }
  throw new Error("Unexpected error");
};

export const sendMsg = async (message) => {
  try {
    return await post("/search", {
      prompt: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};