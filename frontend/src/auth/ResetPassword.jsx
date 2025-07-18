import React from 'react'

export const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 border-2 border-indigo-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h1>
        <p className="text-gray-600 text-center mb-6">Enter your email and new password below.</p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New password</label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md transition-colors mt-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
