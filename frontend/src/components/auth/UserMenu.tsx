"use client";

import React, { useRef, useEffect } from "react";
import { User, Mail, Lock, KeyRound, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAccountMenuOpen,
  openAccountDialog,
  selectAccountMenuOpen,
} from "@/store/slices/uiSlice";
import { selectUser, logoutUser } from "@/store/slices/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";

export function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectAccountMenuOpen);
  const [logout] = useLogoutMutation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(setAccountMenuOpen(false));
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        dispatch(setAccountMenuOpen(false));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // Logout failure handled gracefully
    } finally {
      dispatch(logoutUser());
      dispatch(setAccountMenuOpen(false));
    }
  };

  // Truncate email with ellipsis if long
  const displayEmail =
    user.email.length > 20 ? `${user.email.slice(0, 18)}...` : user.email;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button: User Icon + Full Name */}
      <button
        type="button"
        onClick={() => dispatch(setAccountMenuOpen(!isOpen))}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-800 hover:text-[#fe7900] transition-colors px-2.5 py-1.5 rounded-full hover:bg-neutral-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900]"
      >
        <User className="w-4 h-4 text-neutral-600" />
        <span className="truncate max-w-[120px] sm:max-w-[160px]">{user.name}</span>
      </button>

      {/* Dropdown Menu Card */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* User Profile Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#bf9a64] flex items-center justify-center text-white shrink-0 shadow-xs">
              <User className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {user.name}
              </p>
            </div>
          </div>

          {/* Email Row */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 px-1">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{displayEmail}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-100 my-2" />

          {/* Action Links */}
          <div className="space-y-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => dispatch(openAccountDialog("reset"))}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-medium text-neutral-700 hover:text-[#fe7900] hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer text-left"
            >
              <Lock className="w-4 h-4 text-neutral-400" />
              <span>Reset Password</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => dispatch(openAccountDialog("delete"))}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-medium text-neutral-700 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-colors cursor-pointer text-left"
            >
              <KeyRound className="w-4 h-4 text-neutral-400" />
              <span>Delete account</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-medium text-neutral-700 hover:text-[#fe7900] hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4 text-neutral-400" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
