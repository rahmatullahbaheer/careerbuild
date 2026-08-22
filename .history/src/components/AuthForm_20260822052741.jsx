"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, Sparkles } from "lucide-react";

export default function AuthForm({ initialMode = "signup" }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "batuhankra312@gmail.co",
    password: "•••••••••",
    confirmPassword: "",
    rememberMe: true,
    agreeTerms: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        mode === "signup"
          ? "Account created successfully! Welcome aboard."
          : "Signed in successfully! Redirecting...",
      );
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 auth-bg-gradient perspective-ray-grid overflow-hidden">
      {/* Background Radial Web Rays lines effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <svg
          className="w-[1200px] h-[1200px] text-purple-300/40"
          viewBox="0 0 1000 1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          {/* Radial grid lines radiating outwards matching the reference screenshot */}
          <line x1="500" y1="500" x2="0" y2="0" />
          <line x1="500" y1="500" x2="250" y2="0" />
          <line x1="500" y1="500" x2="500" y2="0" />
          <line x1="500" y1="500" x2="750" y2="0" />
          <line x1="500" y1="500" x2="1000" y2="0" />
          <line x1="500" y1="500" x2="1000" y2="250" />
          <line x1="500" y1="500" x2="1000" y2="500" />
          <line x1="500" y1="500" x2="1000" y2="750" />
          <line x1="500" y1="500" x2="1000" y2="1000" />
          <line x1="500" y1="500" x2="750" y2="1000" />
          <line x1="500" y1="500" x2="500" y2="1000" />
          <line x1="500" y1="500" x2="250" y2="1000" />
          <line x1="500" y1="500" x2="0" y2="1000" />
          <line x1="500" y1="500" x2="0" y2="750" />
          <line x1="500" y1="500" x2="0" y2="500" />
          <line x1="500" y1="500" x2="0" y2="250" />
          {/* Concentric rectangle guides */}
          <rect
            x="200"
            y="200"
            width="600"
            height="600"
            rx="16"
            strokeDasharray="3 3"
            opacity="0.3"
          />
          <rect
            x="300"
            y="270"
            width="400"
            height="460"
            rx="16"
            strokeDasharray="3 3"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center">
        {/* Yellow Top Pill Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#fef08a] border border-[#fef08a] text-[#713f12] text-xs font-semibold shadow-xs">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`transition-all ${
              mode === "signin"
                ? "font-bold text-black border-b border-black"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            Otake Login
          </button>
          <span className="opacity-40">|</span>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="hover:underline transition-all"
          >
            {mode === "signin" ? "Switch to Sign Up" : "Switch to Sign In"}
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-[34px] font-extrabold text-neutral-900 tracking-tight text-center mb-8">
          {mode === "signup" ? "Welcome Otake!" : "Welcome Back!"}
        </h1>

        {/* Auth Card Outer Wireframe Border Box */}
        <div className="relative w-full p-1 rounded-[24px] bg-gradient-to-b from-purple-200/50 via-pink-100/40 to-purple-200/30 backdrop-blur-md shadow-[0_15px_45px_rgba(215,180,225,0.45)]">
          <div className="w-full bg-[#faf7fd]/90 backdrop-blur-xl rounded-[22px] p-7 sm:p-9 border border-white/80">
            {/* Feedback Message */}
            {successMessage && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up only) */}
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-800 tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Batuhan Kara"
                    required
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#bfdbfe] text-sm text-gray-900 placeholder-gray-400 auth-input shadow-xs font-medium"
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800 tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="batuhankra312@gmail.co"
                    required
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#a5b4fc] text-sm text-gray-900 placeholder-gray-400 auth-input shadow-xs font-medium focus:ring-2 focus:ring-indigo-400"
                  />
                  {/* Cursor Indicator SVG overlay matching screenshot demo if focused */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-80">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 2L17 12L12 13L15 20L12 21L9 14L4 17L7 2Z"
                        fill="#1e293b"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800 tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-12 px-4 pr-10 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 auth-input shadow-xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up Mode) */}
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-800 tracking-wide">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-12 px-4 pr-10 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 auth-input shadow-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded border border-gray-300 bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                    <Check className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                    Remember me
                  </span>
                </label>

                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions sent to your email.");
                  }}
                  className="text-xs font-bold text-gray-900 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#0f0f11] hover:bg-black text-white font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : mode === "signup" ? (
                  "Create an Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Or Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-200/70"></div>
              <span className="flex-shrink mx-3 text-xs text-gray-400 font-medium">
                or
              </span>
              <div className="flex-grow border-t border-gray-200/70"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => alert("Google OAuth flow initialized.")}
              className="w-full h-12 rounded-xl bg-white border border-gray-200 hover:bg-gray-50/80 text-gray-800 font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2.5 active:scale-[0.99]"
            >
              {/* Google Multi-Color SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Toggle Sign In / Sign Up Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 font-medium">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="font-bold text-gray-900 hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-bold text-gray-900 hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
