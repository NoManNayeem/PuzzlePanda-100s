'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { loginAPI } from './DRF_Backend/API';
import Header from './landingPageComponents/Header';
import NavBar from './landingPageComponents/NavBar';
import Slider from './landingPageComponents/Slider';
import Footer from './landingPageComponents/Footer';
import { FaUserSecret, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const fullPhoneNumber = `88${phone}`;

    // Validate the phone number
    const phoneRegex = /^8801\d{9}$/;
    if (!phoneRegex.test(fullPhoneNumber)) {
      setError('Invalid phone number. Please enter a valid 13-digit number starting with 8801.');
      return;
    }

    try {
      const response = await fetch(loginAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: fullPhoneNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie('token', data.access, { path: '/' });
        router.push('/user');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <Header />
      <NavBar />
      <Slider />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-800 p-4 md:py-8">
        <div className="text-center w-full max-w-md px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 animate-pulse">Win an Instant 5,000 Points!</h2>
          <p className="text-white mb-6">Answer 10 questions correctly & win!</p>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex items-center shadow-lg shadow-purple-200 rounded-full overflow-hidden">
              <span className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white shadow-md">+88</span>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="flex-grow px-4 py-2 text-black border-0 focus:outline-none shadow-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex items-center shadow-lg shadow-purple-200 rounded-full overflow-hidden relative">
              <div className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white shadow-md flex items-center">
                <FaUserSecret size={25} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="flex-grow px-4 py-2 text-black border-0 focus:outline-none shadow-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-4 cursor-pointer bg-purple-900 rounded" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <button
              className="w-full text-white px-6 py-2 shadow-lg shadow-purple-200 rounded-full text-lg tracking-wider font-medium bg-purple-600 hover:bg-purple-700 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-purple-300 text-sm mt-6"><Link href="/sign-up" className='border-b'>Register</Link> Now And Get Upto 1000 Free Credits!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
