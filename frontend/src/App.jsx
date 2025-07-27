// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 🔐 Auth Pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import VerifyOtp from "./auth/VerifyOtp";
import { ForgotPassword } from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

// 📄 Public Pages
import Home from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Product } from "./pages/Product";
import ContactUs from "./pages/ContactUs";
import { PageA } from "./pages/PageA.jsx";
import { PageB } from "./pages/PageB.jsx";
import { PageC } from "./pages/PageC.jsx";

// 🧩 Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🔔 Utilities
import { Toaster } from "react-hot-toast";

// 🧠 Context
import MyContexProvider from "./context/MyContext";

function App() {
  return (
    <BrowserRouter>
      <MyContexProvider>
        <Navbar />
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/page-a" element={<PageA />} />
          <Route path="/page-b" element={<PageB />} />
          <Route path="/page-c" element={<PageC />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        <Footer />
      </MyContexProvider>
    </BrowserRouter>
  );
}

export default App;
