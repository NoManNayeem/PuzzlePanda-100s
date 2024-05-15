import React from 'react';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <NavBar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Sign Up</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  +880
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="^\+880[0-9]{9,10}$"
                  required
                  className="pl-14 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500"
                  placeholder="1XXXXXXXXX"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-700 text-white font-bold rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
