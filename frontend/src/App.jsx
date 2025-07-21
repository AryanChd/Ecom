import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import Register from "./auth/Register";
import { VerifyOtp } from "./auth/VerifyOtp";
import { ForgotPassword } from "./auth/ForgotPassword";
import { ResetPassword } from "./auth/ResetPassword";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar";
import { AboutUs } from "./pages/AboutUs.jsx";

import { Product } from "./pages/Product.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
