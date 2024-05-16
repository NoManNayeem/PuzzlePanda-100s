'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Header from './landingPageComponents/Header';
import NavBar from './landingPageComponents/NavBar';
import Slider from './landingPageComponents/Slider';
import Footer from './landingPageComponents/Footer';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate checking username and password
    if (phone === '01781912704') {
      setCookie('token', 'admin_token_here', { path: '/' });
      setCookie('subscription_token', 'true', { path: '/' });
      router.push('/user');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <Header />
      <NavBar />
      <Slider />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-800 p-6">
        <div className="text-center w-full max-w-md px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 animate-pulse">Win an Instant 5,000 Points!</h2>
          <p className="text-white mb-6">Answer 10 questions correctly & win!</p>
          <form onSubmit={handleLogin} className="">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="flex w-full sm:w-auto">
                <span className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-l-full sm:rounded-l-full shadow-md">+88</span>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="flex-grow px-4 py-2 text-black border border-purple-300 rounded-r-full sm:rounded-l-none sm:rounded-r-full focus:outline-none shadow-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out shadow-md"
                type="submit"
              >
                Subscribe/Login
              </button>
            </div>
          </form>
          <p className="text-purple-300 text-sm">First 2 days free then 4 points/day</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
