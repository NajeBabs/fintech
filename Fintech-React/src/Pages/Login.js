import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import

const Login = () => {
  const navigate = useNavigate(); // add this
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend for authentication
    console.log("Login data:", formData);
    if (formData.username && formData.password) {
      navigate("/overview");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:flex-1 bg-fintech-mint relative flex flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-16">
          {/* Branding */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-6 lg:left-14 z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black">
              <span className="font-bold">Fin</span>
              <span className="font-normal">Tech</span>
            </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center flex-1 pt-16 sm:pt-20 lg:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-bold text-black leading-snug max-w-full sm:max-w-sm md:max-w-md lg:max-w-2xl">
              Sign in to
              <br />
              Start your Finance
              <br />
              Journey
            </h2>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-center mt-8 lg:mt-0">
            <img
              src="./Images/login.png"
              alt="FinTech illustration"
              className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-2/3 xl:w-3/4 object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:flex-1 bg-fintech-dark flex flex-col justify-center p-6 sm:p-10 lg:p-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
              Welcome to to <span className="font-bold">Fin</span>Tech
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white font-light">
              Confidence in Every Transaction
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 sm:space-y-5"
          >
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Forgot Password & Register Links */}
            <div className="flex justify-between items-center text-lg sm:text-xl font-medium">
              <a
                href="/forget-password"
                className="text-primary hover:text-opacity-80 transition duration-200 no-underline"
              >
                Forgot password?
              </a>
              <a
                href="/register"
                className="text-primary hover:text-opacity-80 transition duration-200 no-underline"
              >
                Register
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 sm:h-14 bg-primary text-black font-bold rounded-lg hover:bg-opacity-90 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
