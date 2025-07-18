import React from "react";

export const VerifyOtp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white  shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
        <div className="p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 300"
            className="mx-auto mb-6 w-48 h-48 animate-pulse"
          >
            <circle cx={200} cy={200} r={150} fill="#3B82F6" />
            <circle cx={200} cy={200} r={120} fill="#FFFFFF" />
            <circle cx={200} cy={200} r={90} fill="#3B82F6" />
            <circle cx={200} cy={200} r={60} fill="#FFFFFF" />
            <text
              x={200}
              y={200}
              textAnchor="middle"
              fill="#2563EB"
              fontSize={40}
              fontWeight="bold"
              dy=".3em"
              className="text-center"
            >
              OTP
            </text>
          </svg>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-600  mb-6">
            Enter the 6-digit code sent to +91 8888888888
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
               
              transition-transform duration-300 hover:scale-110"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
             
              transition-transform duration-300 hover:scale-110"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
               
              transition-transform duration-300 hover:scale-110"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
             
              transition-transform duration-300 hover:scale-110"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
             
              transition-transform duration-300 hover:scale-110"
            />
            <input
              type="text"
              maxLength={1}
              className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
            
              transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="text-sm text-gray-600 mb-6">
            Didn't receive code?
            <a
              href="#"
              className="text-blue-500 hover:underline  transition-colors duration-300 hover:text-blue-600"
            >
              Resend OTP
            </a>
          </div>
          <a href="" target>
            <button
              className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600
      transition-transform duration-300 hover:scale-105"
            >
              Verify OTP
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
