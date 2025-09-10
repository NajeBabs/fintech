import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- For navigation
import { ArrowLeft } from "lucide-react"; // Optional: nice icon library

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
          <h1 className="text-xl sm:text-3xl lg:text-4xl text-black">
            <span className="font-bold">Fin</span>
            <span className="font-extralight">Tech</span>
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center flex-1 pt-16 sm:pt-20 lg:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold text-black leading-snug max-w-full sm:max-w-sm md:max-w-md lg:max-w-2xl">
            Can't log in?
            <br />
            Reset your password in
            <br />
            seconds.
          </h2>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:justify-center mt-8 lg:mt-0">
          <img
            src="./Images/forgetpassword.png"
            alt="FinTech illustration"
            className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-2/3 xl:w-3/4 object-contain"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:flex-1 bg-fintech-dark flex flex-col justify-center p-6 sm:p-10 lg:p-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 font-extralight">
            Forgot Password?
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white font-extralight">
            Please enter your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center max-w-md sm:max-w-lg mx-auto space-y-4 sm:space-y-5"
        >
          {/* First & Last Name */}
          <div className="grid  gap-4">
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg sm:text-xl mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-[388px] h-[51px] px-4 mx-auto rounded-lg bg-transparent border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-[275px] h-[51px] sm:h-14 bg-primary text-black font-bold mx-auto rounded-lg hover:bg-opacity-90 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
