import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap=3 md:justify-center justify-between lg:justify-around border-2 border-gray-400 px-6 py-2 flex-wrap">
      <Link to={"/login"}>Login</Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/verify-otp"}>VerifyOtp</Link>
      <Link to={"/forgot-password"}>ForgotPassword</Link>
      <Link to={"/reset-password"}>ResetPassword</Link>
    </nav>
  );
};

export default Navbar;
