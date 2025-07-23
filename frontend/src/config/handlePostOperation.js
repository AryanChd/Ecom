import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const handlePostOperation = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Send cookies if needed
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

export default handlePostOperation;
