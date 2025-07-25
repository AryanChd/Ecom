import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const handleGetOperation = async (url) => {
  const token = localStorage.getItem("authToken");

  console.log("📡 GET URL:", `${API_URL}${url}`);
  console.log("🔐 Token sent in header:", token);

  try {
    const response = await axios.get(`${API_URL}${url}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Axios GET Response:", response);

    return { response };
  } catch (error) {
    console.error("❌ GET operation error:", error.message);
    return {
      response: {
        status: error.response?.status || 500,
        data: {
          error:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        },
      },
    };
  }
};
