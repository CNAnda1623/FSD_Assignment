"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, Trash2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeAccountDialog,
  selectActiveAccountDialog,
} from "@/store/slices/uiSlice";
import { selectUser } from "@/store/slices/authSlice";
import {
  useSendCodeMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
} from "@/store/api/authApi";

export function AccountDialogs() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeDialog = useAppSelector(selectActiveAccountDialog);
  const user = useAppSelector(selectUser);

  const [sendCode, { isLoading: isSendingCode }] = useSendCodeMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  // Reset Password State (form fields kept in local state)
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Delete Account State
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  if (!activeDialog) return null;

  const handleSendResetCode = async () => {
    if (!user?.email || cooldown > 0 || isSendingCode) return;
    try {
      setErrorMsg(null);
      await sendCode({
        email: user.email,
        purpose: "reset-password",
      }).unwrap();

      setCodeSent(true);
      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Failed to send verification code");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    setErrorMsg(null);
    try {
      await resetPassword({
        email: user.email,
        code: resetCode,
        newPassword,
      }).unwrap();

      setSuccessMsg("Password updated. Please log in again.");
      setTimeout(() => {
        dispatch(closeAccountDialog());
        setSuccessMsg(null);
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");
        router.push("/login");
      }, 1200);
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Failed to reset password");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setErrorMsg(null);
    try {
      await deleteAccount({ email: user.email }).unwrap();
      dispatch(closeAccountDialog());
      router.push("/");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMsg(errorObj.message || "Failed to delete account");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-2xl border border-neutral-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={() => dispatch(closeAccountDialog())}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1 rounded-full cursor-pointer transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DIALOG 1: RESET PASSWORD */}
        {activeDialog === "reset" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-orange-50 rounded-xl text-[#fe7900]">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Reset Password
              </h2>
            </div>
            <p className="text-xs text-neutral-600 mb-5">
              Enter the verification code sent to{" "}
              <span className="font-semibold text-neutral-800">{user?.email}</span> and your new password.
            </p>

            {errorMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-green-50 text-green-700 text-xs">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleResetSubmit} className="space-y-4">
              {/* Code input with Send Code button */}
              <div className="relative">
                <label className="block text-xs text-neutral-700 mb-1">
                  Verification Code
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full pb-1.5 pt-0.5 pr-24 bg-transparent border-0 border-b border-[#b2b2b2] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendResetCode}
                    disabled={cooldown > 0 || isSendingCode}
                    className={`absolute right-0 bottom-1 text-xs font-semibold cursor-pointer ${
                      cooldown > 0 || isSendingCode
                        ? "text-neutral-400 cursor-not-allowed"
                        : "text-[#fe7900] hover:text-[#d95e00]"
                    }`}
                  >
                    {cooldown > 0
                      ? `Resend (${cooldown}s)`
                      : isSendingCode
                      ? "Sending..."
                      : codeSent
                      ? "Resend Code"
                      : "Send Code"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-xs text-neutral-700 mb-1">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 chars)"
                    className="w-full pb-1.5 pt-0.5 pr-8 bg-transparent border-0 border-b border-[#b2b2b2] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-1 text-neutral-500 hover:text-neutral-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-xs text-neutral-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pb-1.5 pt-0.5 bg-transparent border-0 border-b border-[#b2b2b2] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#fe7900] transition-colors rounded-none"
                  required
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => dispatch(closeAccountDialog())}
                  className="flex-1 h-10 rounded-xl border border-neutral-300 text-neutral-700 font-medium text-xs sm:text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetting || !resetCode || !newPassword}
                  className="flex-1 h-10 rounded-xl bg-[#fe7900] hover:bg-[#e56d00] text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResetting ? "Saving..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* DIALOG 2: DELETE ACCOUNT */}
        {activeDialog === "delete" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-50 rounded-xl text-red-600">
                <Trash2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Delete Account
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 mb-5 leading-relaxed">
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your saved data and profile settings will be deleted.
            </p>

            {errorMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="mb-5 flex items-center gap-2">
              <input
                id="confirm-delete"
                type="checkbox"
                checked={deleteConfirmed}
                onChange={(e) => setDeleteConfirmed(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-neutral-300 cursor-pointer"
              />
              <label htmlFor="confirm-delete" className="text-xs text-neutral-800 cursor-pointer">
                I understand that this action is irreversible.
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => dispatch(closeAccountDialog())}
                className="flex-1 h-10 rounded-xl border border-neutral-300 text-neutral-700 font-medium text-xs sm:text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deleteConfirmed}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete My Account"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
