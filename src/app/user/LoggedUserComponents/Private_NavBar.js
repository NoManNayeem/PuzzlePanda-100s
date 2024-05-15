"use client";

import pandalogo from "../../../../public/panda.png";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function PrivateNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    // Prompt the user to confirm they want to logout
    if (!confirm("Are you sure you want to log out?")) {
      return;
    }
    // Remove the cookies or any other authentication tokens
    deleteCookie("token");
    // Redirect to the login page or homepage
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
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
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
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
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-600 text-white flex justify-center items-center rounded hover:bg-red-700 transition duration-300 w-full"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-600 text-white flex justify-center items-center rounded hover:bg-red-700 transition duration-300 w-full"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
