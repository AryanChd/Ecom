
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 


const TextField = ({
  label = "TextField",
  onChange,
  id,
  name,
  placeholder = "placeholder",
  value,
  required = false,
  type = "text",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name = {name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;

