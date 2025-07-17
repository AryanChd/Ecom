import React from "react";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };
  return (
    <>
      <div>Login</div>

      <form onSubmit={handleSubmit}>
        {/* email */}
        <div>
          <label htmlFor="email"> Email</label>
          <input type="text" id="email" placeholder="example@gmail.com" />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password"> Password</label>
          <input type="password" id="password" placeholder="********" />
        </div>

        {/* submitButton */}
        <button type="Submit"> Submit </button>
      </form>
    </>
  );
};
