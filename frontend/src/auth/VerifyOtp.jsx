import { useState } from "react";
import TextField from "../components/TextField";

import { useNavigate } from "react-router-dom";
import handlePostOperation from "../config/handlePostOperation";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handlePostOperation("/api/auth/verify-otp", {
      otp,
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
        "OTP verified!";
      alert(successMessage);

      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } else {
      // Fixed error handling - check if nested properties exist before accessing
      const errorMessage =
        response?.response?.data?.error ||
        response?.data?.error ||
        response?.error ||
        response?.message ||
        "Error verifying OTP!";
      alert(errorMessage);
    }

    console.table(otp);
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div>Verify OTP</div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border flex flex-col gap-4 items-start"
          >
            <TextField
              key={"otp"}
              id={"otp"}
              name={"otp"}
              label={"Your OTP"}
              placeholder={"123456"}
              type={"text"}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
