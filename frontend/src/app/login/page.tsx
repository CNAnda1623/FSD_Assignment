"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectAuthStatus } from "@/store/slices/authSlice";
import {
  useLoginMutation,
  useLoginCodeMutation,
  useSendCodeMutation,
} from "@/store/api/authApi";
import { SmartImage } from "@/components/ui/SmartImage";

export default function LoginPage() {
  const router = useRouter();
  const authStatus = useAppSelector(selectAuthStatus);

  // RTK Query Mutations
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [loginCode, { isLoading: isLoginCodeLoading }] = useLoginCodeMutation();
  const [sendCode, { isLoading: isSendCodeLoading }] = useSendCodeMutation();

  // Mode & Form UI state kept local
  const [mode, setMode] = useState<"password" | "code">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Feedback & Cooldown
  const [resendCooldown, setResendCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace("/");
    }
  }, [authStatus, router]);

  // Email format check
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.trim().length > 0;
  const isCodeValid = code.trim().length >= 4;

  const isFormValid =
    mode === "password" ? isEmailValid && isPasswordValid : isEmailValid && isCodeValid;

  const loading = isLoginLoading || isLoginCodeLoading;

  // Countdown timer for Code mode
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Send Code in Code Mode
  const handleSendCode = async () => {
    if (!isEmailValid || resendCooldown > 0 || isSendCodeLoading) return;
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const res = await sendCode({ email, purpose: "login" }).unwrap();
      if (res.devCode) {
        setInfoMsg(`Verification code: ${res.devCode} (automatically entered for local testing)`);
        setCode(res.devCode);
      } else {
        setInfoMsg("Verification code sent to your email!");
      }
      setResendCooldown(60);
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Failed to send code.");
    }
  };

  // Submit Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setErrorMsg(null);
    setInfoMsg(null);

    try {
      if (mode === "password") {
        await login({ email, password, rememberMe }).unwrap();
        router.push("/");
      } else {
        await loginCode({ email, code, rememberMe }).unwrap();
        router.push("/");
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#d9d9d9] flex flex-col justify-between items-center py-4 sm:py-6 px-4 font-sans select-none">
      {/* 1. Header: Centered SUNGROW Logo */}
      <header className="w-full flex justify-center pt-1 pb-2 sm:pb-3">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded transition-transform hover:scale-105 duration-200"
        >
          <SmartImage
            assetKey="brand.logo"
            width={160}
            height={36}
            className="w-36 sm:w-42 h-auto object-contain"
            alt="SUNGROW Logo"
            priority
          />
        </Link>
      </header>

      {/* 2. Compact Centered White Login Card */}
      <div className="w-full max-w-[480px] sm:max-w-[500px] bg-white rounded-3xl sm:rounded-[32px] shadow-xl border border-neutral-100/80 px-6 sm:px-10 py-6 sm:py-7 my-auto">
        <h1 className="text-2xl sm:text-[28px] font-medium text-[#09090b] text-left mb-5 lowercase tracking-tight">
          login
        </h1>

        {/* Global Notifications */}
        {errorMsg && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {infoMsg && (
          <div
            role="status"
            className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs"
          >
            {infoMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
          {/* Email Field with Underline Style */}
          <div className="relative">
            <label
              htmlFor="login-email"
              className="block text-xs font-normal text-neutral-700 mb-1"
            >
              Your Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="sungrow@email.com"
              className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
            />
          </div>

          {/* MODE 1: PASSWORD LOGIN */}
          {mode === "password" && (
            <>
              {/* Password Field with Underline Style & Eye Toggle */}
              <div className="relative">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-normal text-neutral-700 mb-1"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="Enter your Password"
                    className="w-full pb-1.5 pt-0.5 pr-10 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-0 bottom-1.5 text-neutral-500 hover:text-neutral-800 p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fe7900] rounded cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forget Password row */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-full text-[#fe7900] focus:ring-[#fe7900] border-[#b2b2b2] cursor-pointer"
                  />
                  <span className="text-neutral-800 text-xs">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("Please switch to 'Sign in Via email Verification' or contact support to reset.");
                  }}
                  className="text-[#fe7900] hover:underline text-xs font-medium cursor-pointer"
                >
                  Forget Password?
                </button>
              </div>
            </>
          )}

          {/* MODE 2: CODE LOGIN */}
          {mode === "code" && (
            <div className="relative">
              <label
                htmlFor="login-code"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Code
              </label>
              <div className="relative flex items-center">
                <input
                  id="login-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Enter your Verification Code"
                  className="w-full pb-1.5 pt-0.5 pr-24 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isEmailValid || resendCooldown > 0 || isSendCodeLoading}
                  className={`absolute right-0 bottom-1 text-xs font-semibold cursor-pointer ${
                    !isEmailValid || resendCooldown > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-[#fe7900] hover:text-[#d95e00]"
                  }`}
                >
                  {isSendCodeLoading
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend (${resendCooldown}s)`
                    : "Send Code"}
                </button>
              </div>
            </div>
          )}

          {/* Primary Login Button (Dark Gray #555555 / #606060) */}
          <div className="pt-1.5">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full h-11 sm:h-12 rounded-xl text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                isFormValid && !loading
                  ? "bg-[#555555] hover:bg-[#3f3f3f]"
                  : "bg-[#555555]/60 cursor-not-allowed"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Divider "or" */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-[1px] bg-neutral-200" />
            <span className="text-[11px] text-neutral-400 font-light lowercase">
              or
            </span>
            <div className="flex-1 h-[1px] bg-neutral-200" />
          </div>

          {/* Secondary Button: Switches between Code mode and Password mode */}
          {mode === "password" ? (
            <button
              type="button"
              onClick={() => {
                setMode("code");
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className="w-full h-11 sm:h-12 rounded-xl bg-[#fe7900] hover:bg-[#e56d00] text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Sign in Via email Verification
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode("password");
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className="w-full h-11 sm:h-12 rounded-xl bg-[#fe7900] hover:bg-[#e56d00] text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Password Login
            </button>
          )}

          {/* Footer links: Sign Up & Return to Home */}
          <div className="pt-2 text-center space-y-1.5 text-xs text-neutral-700">
            <p>
              Do not have an account?{" "}
              <Link
                href="/register"
                className="text-[#fe7900] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p>
              <Link href="/" className="hover:text-[#fe7900] transition-colors">
                Return to <span className="font-semibold text-[#fe7900]">Home</span>
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* 3. Page Footer: 2025 SUNGROW, Privacy, Contact US */}
      <footer className="w-full text-center py-2 sm:py-3 text-[11px] sm:text-xs text-neutral-600 font-normal">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span>2025 SUNGROW. All Rights Reserved</span>
          <a
            href="https://www.sungrowpower.com/in/en/privacy-policy-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Privacy
          </a>
          <a
            href="https://www.sungrowpower.com/in/en/about-us/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Contact US
          </a>
        </div>
      </footer>
    </div>
  );
}
