"use client";

import pandalogo from "../../../../public/panda.png";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function PrivateNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to log out?")) {
      return;
    }
    deleteCookie("token");
    deleteCookie("subscription_token");
    localStorage.removeItem('subscription_token');
    router.push("/");
    router.refresh();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/user">
          <div className="flex items-center cursor-pointer">
            <Image
              src={pandalogo}
              alt="PuzzlePanda Logo"
              width={50}
              height={50}
              className="rounded-full mr-2"
            />
            <h1 className="text-lg font-bold">PuzzlePanda</h1>
          </div>
        </Link>
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          <Link href="/user/profile" className="flex items-center hover:text-purple-300">
            <FaUser className="mr-2" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white flex items-center rounded hover:bg-red-700 transition duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`md:hidden ${isOpen ? "block" : "hidden"} transition duration-300 ease-in-out`}>
        <div className="flex flex-col space-y-4 mt-4">
          <Link
            href="/user/profile"
            className="p-2 bg-blue-600 text-white flex items-center rounded hover:bg-blue-700 transition duration-300"
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white flex items-center rounded hover:bg-red-700 transition duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
