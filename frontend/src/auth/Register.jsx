import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";
import Cookies from "js-cookie";
import registerField from "../components/registerField";
import axios from "axios";
import { registerInitialValue } from "../config/constant.js";
import handlePostOperation from "../config/handlePostOperation.js";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState(registerInitialValue);
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("name")) || ""
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cookieName, setCookieName] = useState("");

  // localStorage.setItem("name","Aryan")
  // localStorage.getItemItem("name")
  // localStorage.removeItemItem("name")
  // localStorage.clear()

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem("name")) || "");
    // Simulate storing auth info on load (for testing)
    localStorage.setItem("authToken", "123456ggg");
    localStorage.setItem("email", "Aryan@gmail.com");

    // Read cookie value
    const nameFromCookie = Cookies.get("name");
    setCookieName(nameFromCookie || "");
  }, []);

  const handleSaveCookie = () => {
    // Cookies.set("name", "Aryan");
    setName(localStorage.setItem("name", JSON.stringify({ name: "Aryan" })));
    setCookieName("Aryan");
  };

  const handleClearCookie = () => {
    // Cookies.remove("name");
    localStorage.removeItem("name");
    setCookieName("");
  };

  const clearall = () => {
    localStorage.clear();
  };

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
      const data = await handlePostOperation("/api/auth/register", formData);
      setMessage(data.message || "🎉 Registration successful!");
      setFormData(registerInitialValue);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
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

      {/* Cookie buttons and display */}
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
        <button
          onClick={clearall}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
          type="button"
        >
          Clear all
        </button>
        <span className="ml-4 text-gray-700 flex items-center">
          {cookieName ? `Cookie: ${cookieName}` : null}
        </span>
      </div>
    </div>
  );
};

export default Register;
