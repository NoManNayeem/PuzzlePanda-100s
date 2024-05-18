'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaSpinner, FaMobileAlt, FaCoins } from 'react-icons/fa'; // Importing icons for new gifts
import axios from 'axios';
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { spinAPI } from '@/app/DRF_Backend/API';
import { getCookie } from 'cookies-next';

const DAILY_SPIN_LIMIT = 5;


const gifts = [
  { id: 1, text: 'Smart Phone', probability: 0, coins: 0, icon: <FaMobileAlt className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 2, text: '1 coin', probability: 0.95, coins: 1, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 3, text: '10 coins', probability: 0.05, coins: 10, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 4, text: '100 coins', probability: 0.03, coins: 100, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 5, text: '1000 coins', probability: 0.015, coins: 1000, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 6, text: '10000 coins', probability: 0, coins: 10000, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 7, text: '100000 coins', probability: 0, coins: 100000, icon: <FaCoins className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 8, text: 'Try Again', probability: 0.5, coins: 0, icon: <FaGift className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 9, text: 'Try Again', probability: 0.35, coins: 0, icon: <FaGift className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
  { id: 10, text: 'Try Again', probability: 0.1, coins: 0, icon: <FaGift className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" /> },
];



const getRandomGift = () => {
  const rand = Math.random();
  let sum = 0;
  for (let gift of gifts) {
    sum += gift.probability;
    if (rand < sum && gift.probability > 0) return gift; // Ensure gifts with 0 probability are not selected
  }
  return gifts[0];
};

const SpinningWheel = () => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      setError('No authentication token found');
      return;
    }

    // Fetch spin count from the backend
    const fetchSpinCount = async () => {
      try {
        const response = await axios.get(spinAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpinCount(response.data.count);
      } catch (error) {
        console.error('Error fetching spin count:', error);
        setError('Error fetching spin count');
      }
    };

    fetchSpinCount();
  }, []);

  const handleSpin = async () => {
    if (spinCount >= DAILY_SPIN_LIMIT) return;
    setIsSpinning(true);
    const gift = getRandomGift();
    const token = getCookie('token');

    setTimeout(async () => {
      setSelectedGift(gift);
      setIsSpinning(false);

      try {
        const response = await axios.post(spinAPI, {
          gift: gift.text,
          coins: gift.coins,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpinCount(response.data.count);
      } catch (error) {
        console.error('Error updating spin count:', error);
        setError('Error updating spin count');
      }
    }, 3000); // Duration of spin
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-500 to-purple-900 text-white">
      <PrivateHeader className="w-full" />
      <PrivateNavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="relative">
          <motion.div
            animate={{ rotate: isSpinning ? 1080 : 0 }}
            transition={{ duration: 3 }}
            className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full border-8 border-yellow-500 flex items-center justify-center shadow-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-red-500"
          >
            {selectedGift ? (
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedGift.icon}
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{selectedGift.text}</p>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {isSpinning ? (
                  <FaSpinner className="text-6xl md:text-8xl lg:text-9xl text-white mb-4 animate-spin" />
                ) : (
                  <FaGift className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" />
                )}
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Spin the Wheel!</p>
              </motion.div>
            )}
          </motion.div>
          {gifts.map((gift, index) => (
            <div
              key={gift.id}
              className="absolute transform"
              style={{
                top: `${50 + 40 * Math.sin((index / gifts.length) * 2 * Math.PI)}%`,
                left: `${50 + 40 * Math.cos((index / gifts.length) * 2 * Math.PI)}%`,
                transform: `translate(-50%, -50%) rotate(${(index / gifts.length) * 360}deg)`,
              }}
            >
              <p className="text-sm md:text-base lg:text-lg font-bold text-yellow-300 shadow-md">{gift.text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleSpin}
          className="mt-8 px-8 py-4 bg-yellow-600 text-white text-2xl font-semibold rounded-full hover:bg-yellow-700 transition disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-lg"
          disabled={isSpinning || spinCount >= DAILY_SPIN_LIMIT}
        >
          {spinCount < DAILY_SPIN_LIMIT ? 'Spin' : 'Daily Spin Limit Reached'}
        </button>
        <div className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
          <p>Spin Limit: {DAILY_SPIN_LIMIT}</p>
          <p>Spins Left: {DAILY_SPIN_LIMIT - spinCount}</p>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {selectedGift && !isSpinning && (
          <motion.div
            className="mt-8 text-3xl md:text-4xl lg:text-5xl text-center font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Congratulations! You won: {selectedGift.text}
          </motion.div>
        )}
      </div>
      <PrivateFooter className="w-full" />
    </div>
  );
};

export default SpinningWheel;
