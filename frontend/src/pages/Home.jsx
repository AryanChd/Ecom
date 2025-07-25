import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGetOperation } from "../config/handleGetOperation";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("🔐 Stored Token in localStorage:", token); // ✅ Check if token exists

    if (!token) {
      navigate("/login");
      return;
    }

    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await handleGetOperation("/api/auth/verify/1");
        console.log("✅ API Auth Response:", response);

        if (response?.response?.status === 200) {
          toast.success(
            response.response.data.message || "You are authenticated"
          );
        } else {
          toast.error(response.response.data.error || "Please Login First!!");
          navigate("/login");
        }
      } catch (error) {
        console.error("❌ Auth error in catch:", error);
        toast.error("Authentication failed. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>{loading ? "Checking authentication..." : "I am home"}</div>;
};

export default Home;
