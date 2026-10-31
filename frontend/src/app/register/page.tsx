"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  saveStep1,
  goToStep,
  codeSent,
  openSuccess,
  resetRegister,
  selectRegisterStep,
  selectRegisterStep1,
  selectResendAvailableAt,
  selectSuccessDialogOpen,
} from "@/store/slices/registerSlice";
import { selectAuthStatus } from "@/store/slices/authSlice";
import { useSendCodeMutation, useRegisterMutation } from "@/store/api/authApi";
import { SmartImage } from "@/components/ui/SmartImage";

const COUNTRIES = [
  "India",
  "United States",
  "Germany",
  "Australia",
  "United Kingdom",
  "Japan",
  "Brazil",
  "Italy",
  "Spain",
  "France",
  "Netherlands",
  "Singapore",
  "South Africa",
  "United Arab Emirates",
];

const ROLES = [
  "For Home",
  "For Business",
  "For Utility",
  "Installer",
  "Distributor",
];

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  const step = useAppSelector(selectRegisterStep);
  const step1 = useAppSelector(selectRegisterStep1);
  const resendAvailableAt = useAppSelector(selectResendAvailableAt);
  const successDialogOpen = useAppSelector(selectSuccessDialogOpen);

  // RTK Query Mutations
  const [sendCode, { isLoading: isSendingCode }] = useSendCodeMutation();
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

  // Redirect if already authenticated
  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace("/");
    }
  }, [authStatus, router]);

  // Step 1 Form local buffer
  const [region, setRegion] = useState(step1.region || "India");
  const [firstName, setFirstName] = useState(step1.firstName);
  const [lastName, setLastName] = useState(step1.lastName);
  const [agreed, setAgreed] = useState(step1.agreed);
  const [newsletter, setNewsletter] = useState(step1.newsletter);

  // Step 2 Form States (NEVER in Redux)
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("For Home");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Local calculation of resend countdown from resendAvailableAt epoch ms
  const [resendSecondsLeft, setResendSecondsLeft] = useState(0);

  useEffect(() => {
    if (!resendAvailableAt) return;

    const calcRemaining = () =>
      Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1000));

    // Defer initial calculation to avoid synchronous setState warning
    const timer = setTimeout(() => {
      setResendSecondsLeft(calcRemaining());
    }, 0);

    const interval = setInterval(() => {
      const remaining = calcRemaining();
      setResendSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [resendAvailableAt]);

  // Step 1 Validation
  const isStep1Valid =
    region.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    agreed;

  // Step 2 Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  const isRoleValid = role.trim().length > 0;
  const isStep2Valid =
    isEmailValid &&
    code.trim().length >= 4 &&
    isPasswordValid &&
    doPasswordsMatch &&
    isRoleValid;

  const loading = isRegistering || isSendingCode;

  // Handle Step 1 Next
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid) return;
    setErrorMsg(null);
    dispatch(
      saveStep1({
        region,
        firstName,
        lastName,
        agreed,
        newsletter,
      })
    );
    dispatch(goToStep(2));
  };

  // Handle Send Code
  const handleSendCode = async () => {
    if (!isEmailValid || resendSecondsLeft > 0 || isSendingCode) return;
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const res = await sendCode({ email, purpose: "register" }).unwrap();
      if (res.devCode) {
        setInfoMsg(`Verification code: ${res.devCode} (automatically entered for local testing)`);
        setCode(res.devCode);
      } else {
        setInfoMsg("Verification code sent to your email!");
      }
      dispatch(codeSent());
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Failed to send verification code.");
    }
  };

  // Handle Step 2 Registration Submit
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRoleValid) return;
    if (!doPasswordsMatch) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!isStep2Valid) {
      setErrorMsg("Please complete all required fields correctly.");
      return;
    }

    setErrorMsg(null);
    try {
      await registerUser({
        email,
        password,
        firstName: step1.firstName,
        lastName: step1.lastName,
        region: step1.region,
        role,
        code,
      }).unwrap();

      dispatch(openSuccess());
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Registration failed. Please try again.");
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

      {/* 2. Registration Card */}
      <div className="w-full max-w-[480px] sm:max-w-[520px] bg-white rounded-3xl sm:rounded-[32px] shadow-xl border border-neutral-100/80 px-6 sm:px-10 py-6 sm:py-8 my-auto relative">
        {/* Step Progress Pill Switch */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#f0f0f0] p-1 rounded-full flex gap-1 w-64 shadow-inner">
            <div
              className={`flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-200 ${
                step === 1
                  ? "bg-[#fe7900] text-white shadow-xs"
                  : "text-neutral-600"
              }`}
            >
              Step1
            </div>
            <div
              className={`flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-200 ${
                step === 2
                  ? "bg-[#fe7900] text-white shadow-xs"
                  : "text-neutral-600"
              }`}
            >
              Step2
            </div>
          </div>
        </div>

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

        {/* ================= STEP 1 FORM ================= */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4" noValidate>
            {/* Region / Country Select */}
            <div className="relative">
              <label
                htmlFor="register-region"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Country/Region
              </label>
              <div className="relative flex items-center">
                <select
                  id="register-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pb-1.5 pt-0.5 pr-8 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 focus:outline-none focus:border-[#fe7900] transition-colors appearance-none cursor-pointer rounded-none"
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-0 bottom-2 pointer-events-none" />
              </div>
            </div>

            {/* First Name Field */}
            <div className="relative">
              <label
                htmlFor="register-first-name"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                First Name
              </label>
              <input
                id="register-first-name"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="relative">
              <label
                htmlFor="register-last-name"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="register-last-name"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                required
              />
            </div>

            {/* Agreements Checkboxes */}
            <div className="pt-2 space-y-2.5 text-xs text-neutral-700">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#fe7900] focus:ring-[#fe7900] border-neutral-300 cursor-pointer shrink-0"
                  required
                />
                <span className="leading-tight text-neutral-700">
                  I have read and agree to the{" "}
                  <a
                    href="https://www.sungrowpower.com/in/en/privacy-policy-terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fe7900] underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.sungrowpower.com/in/en/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fe7900] underline"
                  >
                    Terms of Service
                  </a>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#fe7900] focus:ring-[#fe7900] border-neutral-300 cursor-pointer shrink-0"
                />
                <span className="leading-tight text-neutral-500">
                  I agree to receive Sungrow product updates, news, and promotional emails.
                </span>
              </label>
            </div>

            {/* Next Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={!isStep1Valid}
                className={`w-full h-11 sm:h-12 rounded-xl text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                  isStep1Valid
                    ? "bg-[#fe7900] hover:bg-[#e56d00]"
                    : "bg-[#fe7900]/50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>

            {/* Already have an account link */}
            <div className="pt-1 text-center text-xs text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#fe7900] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        )}

        {/* ================= STEP 2 FORM ================= */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4" noValidate>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => dispatch(goToStep(1))}
              className="text-xs text-neutral-500 hover:text-[#fe7900] transition-colors mb-1 inline-flex items-center gap-1 cursor-pointer"
            >
              ← Back to Step 1
            </button>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="register-email"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Your Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="sungrow@email.com"
                className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                required
              />
            </div>

            {/* Verification Code Field with Send Code Button */}
            <div className="relative">
              <label
                htmlFor="register-code"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Verification Code
              </label>
              <div className="relative flex items-center">
                <input
                  id="register-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Enter 4 or 6-digit code"
                  className="w-full pb-1.5 pt-0.5 pr-24 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isEmailValid || resendSecondsLeft > 0 || isSendingCode}
                  className={`absolute right-0 bottom-1 text-xs font-semibold cursor-pointer ${
                    !isEmailValid || resendSecondsLeft > 0 || isSendingCode
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-[#fe7900] hover:text-[#d95e00]"
                  }`}
                >
                  {isSendingCode
                    ? "Sending..."
                    : resendSecondsLeft > 0
                    ? `Resend in ${resendSecondsLeft}s`
                    : "Send Code"}
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="register-password"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="At least 6 characters"
                  className="w-full pb-1.5 pt-0.5 pr-8 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 bottom-1.5 text-neutral-500 hover:text-neutral-800 p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label
                htmlFor="register-confirm-password"
                className="block text-xs font-normal text-neutral-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Re-enter your password"
                  className="w-full pb-1.5 pt-0.5 pr-8 bg-transparent border-0 border-b border-[#b2b2b2] text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-0 bottom-1.5 text-neutral-500 hover:text-neutral-800 p-1 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Radio Grid */}
            <div>
              <label className="block text-xs font-normal text-neutral-700 mb-2">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLES.map((r) => {
                  const isSelected = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#fe7900] bg-orange-50/50 text-[#fe7900] shadow-xs"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 rounded-xl bg-[#fe7900] hover:bg-[#e56d00] text-white text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 3. Success Modal Dialog */}
      {successDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-[620px] bg-white rounded-3xl sm:rounded-[36px] shadow-2xl p-8 sm:p-12 text-center border border-neutral-100">
            <h2
              id="success-dialog-title"
              className="text-2xl sm:text-3xl font-medium text-neutral-800 mb-3 tracking-tight"
            >
              Registration Successful
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mb-8">
              Your account has been created and is ready to use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  dispatch(resetRegister());
                  router.push("/login");
                }}
                className="w-full sm:w-auto min-w-[200px] h-11 px-6 rounded-xl border border-[#fe7900] text-[#fe7900] hover:bg-[#fe7900] hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Back to Previous Page(0s)
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatch(resetRegister());
                  router.push("/");
                }}
                className="w-full sm:w-auto min-w-[200px] h-11 px-6 rounded-xl border border-[#fe7900] text-[#fe7900] hover:bg-[#fe7900] hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Go to homepage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Page Footer */}
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
