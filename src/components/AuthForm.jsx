"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Check, ArrowLeft, Mail, KeyRound, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthForm({ initialMode = "signin" }) {
  const router = useRouter();
  // Modes: 'signin' | 'signup' | 'forgot_email' | 'forgot_otp'
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otpCode: ["", "", "", "", "", ""],
    newPassword: "",
    confirmNewPassword: "",
    rememberMe: true,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // OTP input refs
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // OTP Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (mode === "forgot_otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle OTP individual 6-box input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...formData.otpCode];
    newOtp[index] = value.slice(-1);
    setFormData((prev) => ({ ...prev, otpCode: newOtp }));
    setErrorMessage("");

    // Auto-focus next box
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otpCode[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (mode === "signin") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Login failed.");

        setSuccessMessage(data.message || "Signed in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else if (mode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match. Please re-enter.");
        }

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Registration failed.");

        setSuccessMessage("Account created successfully! Signing you in...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else if (mode === "forgot_email") {
        const res = await fetch("/api/auth/forgot-password/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to send OTP.");

        setSuccessMessage(data.message);
        setMode("forgot_otp");
        setTimer(60);
        setCanResend(false);
      } else if (mode === "forgot_otp") {
        const fullOtp = formData.otpCode.join("");
        if (fullOtp.length < 6) {
          throw new Error("Please enter all 6 digits of the OTP code.");
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
          throw new Error("New passwords do not match.");
        }

        const res = await fetch("/api/auth/forgot-password/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otpCode: fullOtp,
            newPassword: formData.newPassword,
          }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to reset password.");

        setSuccessMessage("Password reset successfully! Please sign in with your new password.");
        setTimeout(() => {
          setMode("signin");
          setFormData((prev) => ({ ...prev, password: "", otpCode: ["", "", "", "", "", ""] }));
        }, 1500);
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccessMessage("A new OTP code has been sent to your email.");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = () => {
    window.location.href = "/api/auth/google?redirect=/dashboard";
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 auth-bg-gradient perspective-ray-grid overflow-hidden">
      {/* Dynamic Background Rays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <svg
          className="w-[1200px] h-[1200px] text-purple-400/40"
          viewBox="0 0 1000 1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          <line x1="500" y1="500" x2="0" y2="0" />
          <line x1="500" y1="500" x2="500" y2="0" />
          <line x1="500" y1="500" x2="1000" y2="0" />
          <line x1="500" y1="500" x2="1000" y2="500" />
          <line x1="500" y1="500" x2="1000" y2="1000" />
          <line x1="500" y1="500" x2="500" y2="1000" />
          <line x1="500" y1="500" x2="0" y2="1000" />
          <line x1="500" y1="500" x2="0" y2="500" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto flex flex-col items-center">
        {/* Switch Pill */}
        {mode !== "forgot_email" && mode !== "forgot_otp" && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef08a] border border-[#fef08a] text-[#713f12] text-xs font-semibold shadow-xs">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`transition-all ${
                mode === "signin" ? "font-bold text-black border-b border-black" : "opacity-75 hover:opacity-100"
              }`}
            >
              Sign In
            </button>
            <span className="opacity-40">|</span>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="hover:underline transition-all"
            >
              {mode === "signin" ? "Create Account" : "Back to Login"}
            </button>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight text-center mb-6">
          {mode === "signup" && "Join CareerBuild!"}
          {mode === "signin" && "Welcome Back!"}
          {mode === "forgot_email" && "Reset Your Password"}
          {mode === "forgot_otp" && "Enter 6-Digit Code"}
        </h1>

        {/* Card Box */}
        <div className="relative w-full p-1 rounded-[24px] bg-gradient-to-b from-purple-200/60 via-pink-100/40 to-purple-200/40 backdrop-blur-md shadow-[0_15px_45px_rgba(215,180,225,0.45)]">
          <div className="w-full bg-[#faf7fd]/95 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 border border-white/80">
            {/* Feedback Notifications */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center animate-shake">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Back to Login Button for Forgot Password */}
              {(mode === "forgot_email" || mode === "forgot_otp") && (
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              )}

              {/* Full Name (Sign Up only) */}
              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#bfdbfe] text-xs text-gray-900 placeholder-gray-400 auth-input font-medium"
                  />
                </div>
              )}

              {/* Email Address */}
              {mode !== "forgot_otp" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#a5b4fc] text-xs text-gray-900 placeholder-gray-400 auth-input font-medium focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              )}

              {/* Sign In & Sign Up Password */}
              {(mode === "signin" || mode === "signup") && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-11 px-4 pr-10 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 placeholder-gray-400 auth-input font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (Sign Up) */}
              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-800">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-11 px-4 pr-10 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 placeholder-gray-400 auth-input font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* FORGOT PASSWORD OTP CODE SECTION */}
              {mode === "forgot_otp" && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-600 text-center font-medium">
                    Enter the 6-digit code sent to <strong className="text-gray-900">{formData.email}</strong>
                  </p>

                  {/* 6 Digit Box Input Grid */}
                  <div className="flex items-center justify-center gap-2">
                    {formData.otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-10 h-12 text-center text-lg font-bold rounded-xl bg-white border border-indigo-200 text-gray-900 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    ))}
                  </div>

                  {/* Countdown Timer & Resend */}
                  <div className="text-center">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Resend OTP Code
                      </button>
                    ) : (
                      <p className="text-[11px] text-gray-400 font-medium">
                        Resend code in <span className="font-bold text-gray-700">{timer}s</span>
                      </p>
                    )}
                  </div>

                  {/* New Password Input */}
                  <div className="space-y-1 pt-2">
                    <label className="block text-xs font-bold text-gray-800">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 placeholder-gray-400 auth-input font-medium"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-800">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 placeholder-gray-400 auth-input font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password Link in Sign In Mode */}
              {mode === "signin" && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="text-xs font-medium text-gray-600">Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot_email");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-[#0f0f11] hover:bg-black text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : mode === "signup" ? (
                  "Create an Account"
                ) : mode === "signin" ? (
                  "Sign In"
                ) : mode === "forgot_email" ? (
                  "Send 6-Digit OTP Code"
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            {/* Google OAuth Section */}
            {(mode === "signin" || mode === "signup") && (
              <>
                <div className="relative flex items-center my-5">
                  <div className="flex-grow border-t border-gray-200/70"></div>
                  <span className="flex-shrink mx-3 text-xs text-gray-400 font-medium">or</span>
                  <div className="flex-grow border-t border-gray-200/70"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full h-11 rounded-xl bg-white border border-gray-200 hover:bg-gray-50/80 text-gray-800 font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2.5 active:scale-[0.99]"
                >
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
              </>
            )}

            {/* Mode Switch Footer */}
            <div className="mt-5 text-center">
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
                ) : mode === "signin" ? (
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
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
