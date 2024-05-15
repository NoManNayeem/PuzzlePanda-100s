'use client'

import pandalogo from '../../../public/panda.png';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInfoCircle, FaQuestionCircle, FaEnvelope, FaUserPlus } from 'react-icons/fa';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

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
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className="hidden md:flex space-x-4">
                    <Link href="/about" className="flex items-center hover:text-purple-300">
                        <FaInfoCircle className="mr-1" /> About
                    </Link>
                    <Link href="/faqs" className="flex items-center hover:text-purple-300">
                        <FaQuestionCircle className="mr-1" /> FAQs
                    </Link>
                    <Link href="/contact" className="flex items-center hover:text-purple-300">
                        <FaEnvelope className="mr-1" /> Contact
                    </Link>
                    <Link href="/sign-up" className="flex items-center hover:text-purple-300">
                        <FaUserPlus className="mr-1" /> Sign Up
                    </Link>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-4">
                    <Link href="/about" className="flex items-center hover:text-purple-300">
                        <FaInfoCircle className="mr-1" /> About
                    </Link>
                    <Link href="/faqs" className="flex items-center hover:text-purple-300">
                        <FaQuestionCircle className="mr-1" /> FAQs
                    </Link>
                    <Link href="/contact" className="flex items-center hover:text-purple-300">
                        <FaEnvelope className="mr-1" /> Contact
                    </Link>
                    <Link href="/sign-up" className="flex items-center hover:text-purple-300">
                        <FaUserPlus className="mr-1" /> Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
