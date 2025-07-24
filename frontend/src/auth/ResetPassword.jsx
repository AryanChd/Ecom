import { useState } from "react";
import TextField from "../components/TextField";
import { resetField } from "../config/loginField";
import handlePostOperation from "../config/handlePostOperation";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const initialValue = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    const response = await handlePostOperation("/api/auth/reset-password", {
      password: formData.password,
    });

    console.log(response);

    // Check for success more comprehensively
    if (response.status === 200 || response?.data || (response && !response.error)) {
      // Handle successful response
      const successMessage = response?.data?.message || 
                            response?.data || 
                            response?.message || 
                            "Password reset successful!";
      alert(successMessage);
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      // Fixed error handling - check if nested properties exist before accessing
      const errorMessage = response?.response?.data?.error || 
                          response?.response?.data || 
                          response?.data?.error || 
                          response?.error || 
                          response?.message || 
                          "Error resetting password";
      alert(errorMessage);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div>Reset Password</div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border flex flex-col gap-4 items-start"
          >
            {resetField.map(({ id, label, placeholder, type, name }) => (
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

            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;