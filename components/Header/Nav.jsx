import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaEllipsisH,
  FaSignInAlt,
  FaUserCog,
  FaPlus,
  FaBox,
  FaHeart,
  FaStar,
  FaGift,
} from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function NavButtons() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex space-x-4 items-center">
      {/* Login Button with Dropdown */}
      <div className="relative group">
        <button
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-custom-teal3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaUser />
          <span className="hidden sm:block">Login</span>
          {isHovered ? (
            <MdExpandLess className="text-xl" />
          ) : (
            <MdExpandMore className="text-xl" />
          )}
        </button>

        {/* Dropdown Menu */}
        <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-md mt-2 group-hover:block w-64">
          <ul className="py-1">
            <li className="px-4 py-2 cursor-pointer flex items-center space-x-3">
              <FaSignInAlt />
              <span>New Customers?</span>
              <a href="/Login" className="text-blue-500 ml-2">
                Sign Up
              </a>
            </li>
            <div className="h-px bg-gray-700"></div>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaUserCog /> <span>My Profile</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaPlus /> <span>Snapbazzar Plus</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaBox /> <span>Orders</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaHeart /> <span>Wishlist</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaStar /> <span>Rewards</span>
            </li>
            <li className="px-4 py-2 hover:bg-custom-teal2 cursor-pointer flex items-center space-x-2">
              <FaGift /> <span>Gift Cards</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cart Button */}
      <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-custom-teal3">
        <FaShoppingCart />
        <span className="hidden sm:block">Cart</span>
      </button>

      {/* More Button */}
      <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-custom-teal3">
        <IoMdMore className="text-xl" />
      </button>
    </div>
  );
}
