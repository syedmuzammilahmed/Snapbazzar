'use client';
import React, { useState } from "react";
import NavButtons from "./Nav";
import Logo from "./Logo";
import { FaEllipsisH } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 w-full flex items-center justify-between p-4 bg-custom-teal2 text-white shadow-md z-50">
      {/* Sidebar Toggle Button for Mobile */}
      <button className="block sm:hidden p-2" onClick={toggleSidebar}>
        <FaEllipsisH />
      </button>

      {/* Logo */}
      <Logo />

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search for Products, Brands and More..."
          className="w-full p-2 rounded-md border bg-white text-black"
        />
      </div>

      {/* Navigation Buttons */}
      <NavButtons />
    </header>
  );
}
