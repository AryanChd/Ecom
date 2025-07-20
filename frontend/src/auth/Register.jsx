// import React, { useState } from "react";
// import TextField from "../components/TextField";
// import registerField from "../components/registerField";
// // Adjust path as needed

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [message, setMessage] = useState(""); // To show success or error messages
//   const [error, setError] = useState(""); // To show error messages

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, phone, email, password, confirmPassword } = formData;

//     // Form validation
//     if (!name || !phone || !email || !password || !confirmPassword) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match. Please try again.");
//       return;
//     }

//     // Basic email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setError(""); // Reset error message

//     // Send data to backend (replace `API_URL` with actual endpoint)
//     try {
//       const response = await fetch(`${API_URL}/api/auth/register`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name,
//             phone,
//             email,
//             password,
//             confirmPassword,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message || "Registration successful!");
//         setFormData({
//           name: "",
//           phone: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//       } else {
//         setError(data.message || "Registration failed.");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((formData) => ({ ...formData, [name]: value }));
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-6">Create Your Account</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {registerField.map(({ id, label, placeholder, type }) => (
//           <TextField
//             key={id}
//             id={id}
//             name={id}
//             label={label}
//             placeholder={placeholder}
//             type={type}
//             value={formData[id]}
//             onChange={handleChange}
//             required
//           />
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>

//       {/* Success Message */}
//       {message && (
//         <div className="mt-4 text-green-600 font-semibold text-center">
//           {message}
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 text-red-600 font-semibold text-center">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import TextField from "../components/TextField";
import registerField from "../components/registerField";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("⚠️ Enter a valid email address.");
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      setError("⚠️ Please enter a valid phone number with digits only.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "🎉 Registration successful!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "❌ Registration failed.");
      }
    } catch {
      setError("❌ Something went wrong. Please try again.");
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
