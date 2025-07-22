import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";
import Cookies from "js-cookie";
import registerField from "../components/registerField";
import axios from "axios";
import { registerInitialValue } from "../config/constant.js";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState(registerInitialValue);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSaveCookie = async () => {
    Cookies.set("name", "Prabesh");
  };

  const handleClearCookie = async () => {
    Cookies.remove("name");
  };

  const name = Cookies.get("name");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password, confirmPassword } = formData;

    if (!name || !phone || !email || !password || !confirmPassword) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match.");
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      setError("⚠️ Please enter a valid phone number with digits only.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "🎉 Registration successful!");
      setFormData(registerInitialValue);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "❌ Something went wrong. Please try again."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {registerField.map(({ id, label, placeholder, type }) => (
            <TextField
              key={id}
              id={id}
              name={id}
              label={label}
              placeholder={placeholder}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
          >
            Register
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600 text-sm text-center font-medium animate-fade-in">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-600 text-sm text-center font-medium animate-fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

<div className="flex justify-center mt-6 space-x-4">
  <button
    onClick={handleSaveCookie}
    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
    type="button"
  >
    Save Cookie
  </button>
  <button
    onClick={handleClearCookie}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
    type="button"
  >
    Clear Cookie
  </button>
  <span className="ml-4 text-gray-700 flex items-center">
    {name ? `Cookie: ${name}` : "No Cookie"}
  </span>
</div>;
