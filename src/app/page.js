'use client'

// pages/index.js
import Header from './landingPageComponents/Header';
import NavBar from './landingPageComponents/NavBar';
import Slider from './landingPageComponents/Slider';
import Footer from './landingPageComponents/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <Header />
      <NavBar />
      <Slider />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-800 p-4">
        <div className="text-center w-full max-w-md px-4">
          <h2 className="text-3xl text-white font-bold mb-4">Win an Instant 5,000 Points!</h2>
          <p className="text-white mb-6">Answer 10 questions correctly & win!</p>
          <div className="flex justify-center items-center mb-6 space-x-2">
            <input type="tel" placeholder="+880" className="flex-grow px-4 py-2 border border-purple-300 rounded-l-full focus:outline-none" />
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-r-full transition duration-200 ease-in-out">Subscribe/Login</button>
          </div>
          <p className="text-purple-300 text-sm">First 2 days free then 4 points/day</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
