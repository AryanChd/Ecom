import React from "react";
import { useState } from "react";

export const Register = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value; 
    const phone = e.target.phone.value;
    console.log(name, email, password, confirmPassword, phone);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Registration successful!");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center border-2 border-indigo-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create your account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join us and start your journey!
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          
         
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm text-gray-700 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm text-gray-700 font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition-colors mt-2"
          >
            Register
          </button>
        </form>
        {message && <div className="mt-4 text-green-600">{message}</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
          </span>
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};
