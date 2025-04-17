'use client';

import { useState } from 'react';
import { MdExpandMore, MdExpandLess, MdMenu, MdClose } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false); // Hover state for the Categories button
  const [isOpen, setIsOpen] = useState(true); // State to control sidebar visibility
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // State to control Categories dropdown
  const router = useRouter();

  const navigateTo = (path) => {
    console.log('path: ', path);
    router.push(path);
  };

  return (
    <div className="relative">
      {/* Mobile open/close button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)} // Toggle the sidebar visibility
      >
        {isOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 w-64 h-screen bg-custom-teal2 text-white shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:block`}
      >
        <nav className="space-y-4 p-4">
          {/* Dashboard */}
          <button
            onClick={() => navigateTo('/Dashboard')}
            className="flex items-start w-full py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
          >
            Dashboard
          </button>

          {/* Categories with Dropdown */}
          <div className="space-y-2">
            <button
              className="flex justify-between w-full py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
              onClick={() => { setIsCategoriesOpen(!isCategoriesOpen), navigateTo('/Categories') }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Categories
              {isCategoriesOpen ? (
                <MdExpandLess className="text-xl" />
              ) : (
                <MdExpandMore className="text-xl" />
              )}
            </button>

            {/* Subcategories */}
            {isCategoriesOpen && (
              <div className="pl-4 space-y-2">
                <button
                  onClick={() => navigateTo('/Categories/subcategory1')}
                  className="block py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
                >
                  Sub Category 1
                </button>
                <button
                  onClick={() => navigateTo('/Categories/subcategory2')}
                  className="block py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
                >
                  Sub Category 2
                </button>
              </div>
            )}
          </div>

          {/* Products */}
          <button
            onClick={() => navigateTo('/Products')}
            className="flex items-start w-full py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
          >
            Products
          </button>

          {/* Brands */}
          <button
            onClick={() => navigateTo('/Brands')}
            className="flex items-start w-full py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
          >
            Brands
          </button>

          {/* Users */}
          <button
            onClick={() => navigateTo('/Users')}
            className="flex items-start w-full py-2 px-4 rounded hover:bg-custom-teal3 transition duration-300"
          >
            Users
          </button>
        </nav>
      </aside>
    </div>
  );
}
