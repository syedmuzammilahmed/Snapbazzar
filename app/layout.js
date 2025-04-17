'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Headers from "../components/Header/Headers";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current URL path
  const isUser = pathname.includes("public"); // Check if URL contains "public"

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-screen`}
      >
        {!isUser && <Headers />}
        <div className="flex flex-1">
          {!isUser && <Sidebar />}
          <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</main>
        </div>
        {!isUser && <Footer />} {/* Conditionally render Footer */}
      </body>
    </html>
  );
}
