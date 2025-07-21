import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-teal-600 font-bold text-lg">
              LOGO
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-teal-600">
              Home
            </Link>
            <Link to="#" className="hover:text-teal-600">
              Products
            </Link>
            <Link to="#" className="hover:text-teal-600">
              About Us
            </Link>
            <Link to="#" className="hover:text-teal-600">
              Contact Us
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden sm:flex gap-3">
            <Link
              to="/login"
              className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-teal-600"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded p-2 text-gray-600 hover:text-teal-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
            <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-100">
              Home
            </Link>
            <Link to="#" className="block px-4 py-2 rounded hover:bg-gray-100">
              Products
            </Link>
            <Link to="#" className="block px-4 py-2 rounded hover:bg-gray-100">
              About Us
            </Link>
            <Link to="#" className="block px-4 py-2 rounded hover:bg-gray-100">
              Contact Us
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 rounded text-white bg-teal-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 rounded text-teal-600 bg-gray-100"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
