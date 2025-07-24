import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";
import Cookies from "js-cookie";
import registerField from "../components/registerField";
import { registerInitialValue } from "../config/constant.js";
import handlePostOperation from "../config/handlePostOperation.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(registerInitialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });

  const calculatePasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let feedback = "";
    let strengthLevel = "";

    if (score === 0) {
      feedback = "Enter a password";
      strengthLevel = "none";
    } else if (score <= 2) {
      feedback = "Weak password";
      strengthLevel = "weak";
    } else if (score <= 3) {
      feedback = "Fair password";
      strengthLevel = "fair";
    } else if (score <= 4) {
      feedback = "Good password";
      strengthLevel = "good";
    } else {
      feedback = "Strong password";
      strengthLevel = "strong";
    }

    return { score, feedback, checks, strengthLevel };
  };

  useEffect(() => {
    // Clear any previous messages on component mount
    setMessage("");
    setError("");
  }, []);

  const validateForm = () => {
    const { name, phone, email, password, confirmPassword } = formData;

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (passwordStrength.score < 3) {
      setError("Please choose a stronger password.");
      return false;
    }

    if (!/^\d{7,15}$/.test(phone.trim())) {
      setError("Please enter a valid phone number (7-15 digits).");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await handlePostOperation("/api/auth/register", formData);
      setMessage(data.message || "Registration successful! Redirecting...");
      setFormData(registerInitialValue);

      // Redirect after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Calculate password strength for password field
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Clear errors when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {registerField.map(({ id, label, placeholder, type }) => (
              <div key={id}>
                <TextField
                  id={id}
                  name={id}
                  label={label}
                  placeholder={placeholder}
                  type={type}
                  value={formData[id] || ""}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />

                {/* Password Strength Indicator */}
                {id === "password" && formData.password && (
                  <div className="mt-2">
                    {/* Strength Bar */}
                    <div className="flex space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full ${
                            level <= passwordStrength.score
                              ? passwordStrength.strengthLevel === "weak"
                                ? "bg-red-500"
                                : passwordStrength.strengthLevel === "fair"
                                ? "bg-yellow-500"
                                : passwordStrength.strengthLevel === "good"
                                ? "bg-blue-500"
                                : "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Strength Text */}
                    <p
                      className={`text-sm font-medium ${
                        passwordStrength.strengthLevel === "weak"
                          ? "text-red-600"
                          : passwordStrength.strengthLevel === "fair"
                          ? "text-yellow-600"
                          : passwordStrength.strengthLevel === "good"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.feedback}
                    </p>

                    {/* Password Requirements */}
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        Password must contain:
                      </p>
                      {[
                        { key: "length", text: "At least 8 characters" },
                        { key: "lowercase", text: "One lowercase letter" },
                        { key: "uppercase", text: "One uppercase letter" },
                        { key: "number", text: "One number" },
                        { key: "special", text: "One special character" },
                      ].map(({ key, text }) => (
                        <div key={key} className="flex items-center text-xs">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
                              passwordStrength.checks[key]
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            {passwordStrength.checks[key] && (
                              <svg
                                className="w-2 h-2 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={
                              passwordStrength.checks[key]
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
