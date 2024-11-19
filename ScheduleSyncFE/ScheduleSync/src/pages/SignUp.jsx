import React from "react";
import NavBar from "../components/NavBarLogout";
import SSLogo from "../assets/SyncLogoWhite.svg";

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBar className="w-full" />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-900 px-4 py-12">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center md:space-x-12 w-full max-w-4xl">
          {/* Form Section */}
          <div className="w-full max-w-sm">
            {/* Floating Title */}
            <h1 className="text-4xl font-bold text-white text-left mb-6">
              Create Your Account
            </h1>

            <form className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-white font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-white font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Repeat Password */}
              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-white font-medium mb-2"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  placeholder="Repeat your password"
                  className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Upload Profile Picture */}
              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-white font-medium mb-2"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  className="w-full px-4 py-2 bg-white rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Logo Section */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <img
              src={SSLogo}
              alt="ScheduleSync Logo"
              className="h-56 md:h-64" /* Increased the logo size */
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-4 text-center mt-auto">
        <p>© 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak</p>
      </footer>
    </div>
  );
};

export default SignUp;
