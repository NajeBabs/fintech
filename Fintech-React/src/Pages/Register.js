import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Example: simulate API call
      console.log("Registration data:", formData);

      // Redirect after a short delay (simulating successful registration)
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Back Arrow at Top Right */}
      <Link
        to="/"
        className="
          fixed z-50
          top-4 right-4 
          sm:top-6 sm:right-6 
          flex items-center 
          text-black 
          lg:text-white 
          hover:underline
          p-2 sm:p-3
          rounded-full
          transition-colors duration-200
        "
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </Link>

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
            Your wallet's best
            <br />
            friend is just
            <br />
            one sign-up away
          </h2>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:justify-center mt-8 lg:mt-0">
          <img
            src="./Images/register.png"
            alt="FinTech illustration"
            className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-2/3 xl:w-3/4 object-contain"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:flex-1 bg-fintech-dark flex flex-col justify-center p-6 sm:p-10 lg:p-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
            Register to <span className="font-bold">Fin</span>Tech
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white font-light">
            Confidence in Every Transaction
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 font-semibold">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 sm:space-y-5"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-white font-bold text-lg sm:text-xl mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 sm:h-14 bg-primary text-black font-bold rounded-lg hover:bg-opacity-90 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
