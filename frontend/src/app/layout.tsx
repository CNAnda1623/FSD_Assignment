import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Home Page – HIND POWER PROJECT",
    template: "%s – HIND POWER PROJECT",
  },
  description:
    "Clean Power for All - HIND POWER PROJECT is a global leader in PV inverter and energy storage systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
