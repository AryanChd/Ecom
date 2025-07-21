import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-green-100">
      <main className="flex-1 container mx-auto px-4 py-12 animate-fade-in delay-200">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div
            className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col justify-center border-t-4 border-green-400 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Get in Touch
            </h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-green-700 text-2xl">📧</span>{" "}
                <span className="text-gray-700">LaptopStore@example.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-700 text-2xl">📞</span>{" "}
                <span className="text-gray-700">+977-9861830956</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-700 text-2xl">📍</span>{" "}
                <span className="text-gray-700">Duhabi, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/farmford.krishifarm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:text-green-700 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Farm Hours
              </h3>
              <p className="text-gray-600">
                Sunday - Friday: 7:00 AM - 6:00 PM
                <br />
                Saturday: Closed
              </p>
            </div>
          </div>
          {/* Contact Form */}
          <form
            className="bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border-t-4 border-green-400 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Send a Message
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              className="rounded-lg border border-green-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="rounded-lg border border-green-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="rounded-lg border border-green-200 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none resize-none"
              required
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-lg tracking-wide ring-2 ring-green-200 hover:ring-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
