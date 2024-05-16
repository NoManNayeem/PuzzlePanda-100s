'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';
import { FaLock, FaPhone, FaSimCard } from 'react-icons/fa';
import { registerAPI } from '../DRF_Backend/API';




const SignUp = () => {
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [password, setPassword] = useState('');
  const [operator, setOperator] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(registerAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primary_phone: primaryPhone,
          password,
          operator,
        }),
      });

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setError(null);

        // Redirect to the login page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <Header />
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center w-full max-w-md px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8">Sign Up</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSignUp} className="space-y-6 text-black">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
              <div className="relative rounded-md shadow-lg">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  id="primary_phone"
                  name="primary_phone"
                  pattern="^880[0-9]{10}$"
                  required
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your phone number"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                />
              </div>
              <div className="relative rounded-md shadow-lg">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                  <FaLock />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative rounded-md shadow-lg">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                  <FaSimCard />
                </span>
                <select
                  id="operator"
                  name="operator"
                  required
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                >
                  <option value="" disabled>Select Operator</option>
                  <option value="GP">Grameenphone</option>
                  <option value="BL">Banglalink</option>
                  <option value="RA">Robi/Airtel</option>
                  <option value="TT">Teletalk</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-700 text-white font-bold rounded-full shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
