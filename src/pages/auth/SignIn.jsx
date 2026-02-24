import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with actual auth logic
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[440px] bg-white border border-[#0F11141A] rounded-[32px] px-2 md:px-6 py-7 md:py-[37px] my-2">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <div className="flex items-center gap-[5px] mb-1">
            {/* House icon */}
            <img src={logo} alt="Gable" />
            <span className="text-2xl font-extrabold text-[#0F1114] ">
              Gable
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F1114] mt-1 md:mt-[21px]">
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Email */}
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="EMAIL"
            required
            className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            required
            className="w-full border border-[#0F11141A] rounded-[80px] px-6 py-4 text-sm text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />

          {/* Forgot password */}
          <div className="flex justify-end mt-1 md:mt-3">
            <a
              href="#"
              className="text-sm text-[#004CE5] font-bold hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full py-4 mt-4 md:mt-[45px] text-white font-extrabold text-sm tracking-widest 
             rounded-[80px]
             bg-gradient-to-bl from-[#3388FF] to-[#004CE6] 
             hover:opacity-90 
             transition 
             "
          >
            SIGN IN
          </button>
        </form>

        {/* Divider space */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Continue with Google */}
          <button
            type="button"
            className="relative w-full flex items-center justify-center 
             border border-[#0F11141A] rounded-[80px] 
             py-[13px] px-[17px] 
             text-sm font-extrabold text-[#0F1114] 
             hover:bg-gray-50 transition"
          >
            {/* Google Icon - Fixed Left */}
            <svg className="absolute left-[20px] w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {/* Centered Text */}
            CONTINUE WITH GOOGLE
          </button>

          {/* Continue with Facebook */}
          <button
            type="button"
            className="relative w-full flex items-center justify-center 
             border border-[#0F11141A] rounded-[80px] 
             py-[13px] px-[17px] 
             text-sm font-extrabold text-[#0F1114] 
             hover:bg-gray-50 transition"
          >
            {/* Facebook Icon - Fixed Left */}
            <svg
              className="absolute left-[20px] w-6 h-6"
              viewBox="0 0 24 24"
              fill="#1877F2"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            {/* Centered Text */}
            CONTINUE WITH FACEBOOK
          </button>
        </div>

        {/* Sign up */}
        <p className="text-center text-xs font-medium text-[#0F1114] mt-3">
          Don't have an account?{" "}
          <Link
            to="/open-account/step-1"
            className="text-[#004CE5] font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      {/* Footer disclaimer */}
      <div className="w-full max-w-[392px] mt-6 text-center text-[#0F1114CC] text-xs px-2 ">
        <p>
          By clicking "
          <strong className="text-[#0F1114] font-bold">Sign in</strong>", or
          continuing with a sign-on partner, you agree to Gable's{" "}
          <a href="#" className="text-[#004CE5] font-bold hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#004CE5] font-bold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <p className="mt-4">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>
    </div>
  );
}
