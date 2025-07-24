import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import handlePostOperation from "../config/handlePostOperation";
import { Link, useNavigate } from "react-router-dom";
import { loginField } from "../config/loginfield";

const Login = () => {
  const navigate = useNavigate();
  const initialValue = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await handlePostOperation("/api/auth/login", formData);

    console.log(response);

    // Check for success more comprehensively
    if (
      response.status === 200 ||
      response?.data ||
      (response && !response.error)
    ) {
      // Handle successful response
      const successMessage =
        response?.data?.message || response?.message || "Login Successful!";
      alert(successMessage);
      setFormData(initialValue);

      // Store token safely
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      // Fixed error handling - check if nested properties exist before accessing
      const errorMessage =
        response?.response?.data?.error ||
        response?.response?.data ||
        response?.data?.error ||
        response?.error ||
        response?.message ||
        "Login Failed!";
      alert(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div>Login</div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border flex flex-col gap-4 items-start"
          >
            {loginField.map(({ id, label, placeholder, type, name }) => (
              <TextField
                key={name}
                id={id}
                name={name}
                label={label}
                placeholder={placeholder}
                type={type}
                value={formData[name]}
                onChange={handleChange}
              />
            ))}

            <Link to="/forgot-password" className="text-blue-500">
              Forgot Password?
            </Link>

            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
