"use client";

import React from "react";

export function WhatsAppButton() {
  const phoneNumber = "919372609713";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (+91 9372609713)"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Subtle pulsating outer ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-0" />

        {/* WhatsApp Official Vector Logo */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.201.301-.778.98-.953 1.18-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527s-.677-1.631-.928-2.233c-.244-.587-.492-.507-.677-.517l-.577-.01c-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.201 2.122 3.24 5.141 4.544.718.311 1.279.497 1.716.636.721.23 1.377.197 1.895.12.578-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.95.56 3.77 1.53 5.32L2 22l4.82-1.51c1.49.88 3.22 1.39 5.22 1.39 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.25c-1.71 0-3.3-.51-4.64-1.39l-.33-.22-2.86.9.92-2.79-.24-.35c-1-1.43-1.55-3.13-1.55-4.88 0-4.66 3.79-8.45 8.45-8.45 4.66 0 8.45 3.79 8.45 8.45 0 4.66-3.79 8.45-8.45 8.45z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-neutral-900/90 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
