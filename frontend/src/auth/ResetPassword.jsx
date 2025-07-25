import { useState, useEffect } from "react";

import handlePostOperation from "../config/handlePostOperation";
import { useNavigate } from "react-router-dom";
import { resetField } from "../config/loginfield";

const ResetPassword = () => {
  const initialValue = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-yellow-500";
    if (strength <= 3) return "bg-orange-500";
    if (strength <= 4) return "bg-green-500";
    return "bg-green-600";
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update password strength for password field
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const isOtpVerified = localStorage.getItem("isOtpVerified");
    if (!email || !isOtpVerified) {
      // alert("No email found. Please request a new OTP.");
      navigate("/verify-otp");
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);

    const response = await handlePostOperation("/api/auth/reset-password", {
      password: formData.password,
    });

    console.log(response);

    // Check for success more comprehensively
    if (
      response.status === 200 ||
      response?.data ||
      (response && !response.error)
    ) {
      // Handle successful response
      const successMessage =
        response?.data?.message ||
        response?.data ||
        response?.message ||
        "Password reset successful!";
      alert(successMessage);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      // Fixed error handling - check if nested properties exist before accessing
      const errorMessage =
        response?.response?.data?.error ||
        response?.response?.data ||
        response?.data?.error ||
        response?.error ||
        response?.message ||
        "Error resetting password";
      alert(errorMessage);
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main reset password container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-gray-600 mt-2">Create a new secure password</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {resetField.map(({ id, label, placeholder, type, name }) => (
              <div key={name} className="space-y-2">
                <label
                  htmlFor={id}
                  className="block text-sm font-semibold text-gray-700"
                >
                  {label}
                </label>
                <div className="relative">
                  <input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={
                      name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : name === "confirmPassword"
                        ? showConfirmPassword
                          ? "text"
                          : "password"
                        : type
                    }
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 pr-12"
                    required
                  />

                  {/* Password visibility toggle */}
                  {(name === "password" || name === "confirmPassword") && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(name)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {(
                        name === "password" ? showPassword : showConfirmPassword
                      ) ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {/* Password strength indicator */}
                {name === "password" && formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                            passwordStrength
                          )}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength <= 1
                            ? "text-red-500"
                            : passwordStrength <= 2
                            ? "text-yellow-500"
                            : passwordStrength <= 3
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Password should contain:</p>
                      <ul className="ml-4 space-y-1">
                        <li
                          className={
                            formData.password.length >= 8
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          • At least 8 characters
                        </li>
                        <li
                          className={
                            /[A-Z]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          • One uppercase letter
                        </li>
                        <li
                          className={
                            /[0-9]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          • One number
                        </li>
                        <li
                          className={
                            /[^A-Za-z0-9]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          • One special character
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Password match indicator */}
                {name === "confirmPassword" && formData.confirmPassword && (
                  <div className="flex items-center space-x-2 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-red-600">
                          Passwords don't match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Submit button */}
            <button
              type="submit"
              disabled={
                isLoading ||
                formData.password !== formData.confirmPassword ||
                formData.password.length < 8
              }
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Resetting...</span>
                </>
              ) : (
                <span>Reset Password</span>
              )}
            </button>

            {/* Back to login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center space-x-1 mx-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Choose a strong password to keep your account secure</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
