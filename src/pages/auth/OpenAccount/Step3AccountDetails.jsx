import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenAccount } from "../../../context/OpenAccountContext";

export default function Step3AccountDetails() {
  const navigate = useNavigate();
  const { formData, updateData } = useOpenAccount();

  const [local, setLocal] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    phone: formData.phone || "",
    password: formData.password || "",
    confirmPassword: formData.confirmPassword || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleNext = (e) => {
    e.preventDefault();
    updateData(local);
    navigate("/open-account/step-4");
  };

  // Eye icon SVG
  const EyeIcon = ({ show }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[440px] bg-white border border-[#0F11141A] rounded-[32px] px-5 py-6 my-2">
        {/* Header row: back arrow + title + subtitle */}
        <div className="mb-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/open-account/step-2")}
              className="h-10 w-10 flex items-center justify-center text-[#0F1114] hover:opacity-70 transition flex-shrink-0 border border-[#0F11141A] rounded-[10px]"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F1114]">
                Account details
              </h1>
              <p className="text-xs text-[#0F1114CC] font-medium mt-[3px]">
                Please fill out your account details below.
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar — 3/4 filled */}
        <div className="w-full h-[3px] bg-[#0F11141A] rounded-full mt-5 mb-8">
          <div className="h-full w-3/4 bg-gradient-to-bl from-[#004CE5] to-[#3388FF] rounded-2xl" />
        </div>

        {/* Form */}
        <form onSubmit={handleNext} className="flex flex-col gap-2">
          {/* First Name */}
          <input
            name="firstName"
            type="text"
            value={local.firstName}
            onChange={handleChange}
            placeholder="FIRST NAME"
            required
            className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />

          {/* Last Name */}
          <input
            name="lastName"
            type="text"
            value={local.lastName}
            onChange={handleChange}
            placeholder="LAST NAME"
            required
            className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />

          {/* Phone Number */}
          <input
            name="phone"
            type="tel"
            value={local.phone}
            onChange={handleChange}
            placeholder="PHONE NUMBER"
            required
            className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={local.password}
              onChange={handleChange}
              placeholder="PASSWORD"
              required
              className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 pr-12 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0F1114] transition"
              aria-label="Toggle password visibility"
            >
              <EyeIcon show={showPassword} />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={local.confirmPassword}
              onChange={handleChange}
              placeholder="CONFIRM PASSWORD"
              required
              className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 pr-12 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0F1114] transition"
              aria-label="Toggle confirm password visibility"
            >
              <EyeIcon show={showConfirmPassword} />
            </button>
          </div>

          {/* CONTINUE button */}
          <button
            type="submit"
            className="w-full py-4 mt-6 text-white font-extrabold text-sm tracking-widest
             rounded-[80px]
             bg-gradient-to-bl from-[#3388FF] to-[#004CE6]
             hover:opacity-90
             transition"
          >
            CONTINUE
          </button>
        </form>

        {/* Footer disclaimer */}
        <p className="text-center text-xs font-medium text-[#0F1114CC] mt-4 md:mt-[53px]">
          By continuing, you agree to Gable's{" "}
          <a href="#" className="text-[#004CE5] font-bold hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#004CE5] font-bold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
