"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa'; // Importing an icon from react-icons
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';

// Defining gifts with their probabilities and icons
const gifts = [
  { id: 1, text: 'Gift 1', probability: 0.5, icon: 'https://via.placeholder.com/100?text=GIFT+1' }, // 50% chance to win
  { id: 2, text: 'Gift 2', probability: 0.2, icon: 'https://via.placeholder.com/100?text=GIFT+2' }, // 20% chance to win
  { id: 3, text: 'Gift 3', probability: 0.15, icon: 'https://via.placeholder.com/100?text=GIFT+3' }, // 15% chance to win
  { id: 4, text: 'Gift 4', probability: 0.1, icon: 'https://via.placeholder.com/100?text=GIFT+4' }, // 10% chance to win
  { id: 5, text: 'Gift 5', probability: 0.05, icon: 'https://via.placeholder.com/100?text=GIFT+5' }, // 5% chance to win
];

// Function to get a random gift based on defined probabilities
const getRandomGift = () => {
  const rand = Math.random();
  let sum = 0;
  for (let gift of gifts) {
    sum += gift.probability;
    if (rand < sum) return gift;
  }
  return gifts[0];
};

const SpinningWheel = () => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    const gift = getRandomGift();
    setTimeout(() => {
      setSelectedGift(gift);
      setIsSpinning(false);
    }, 3000); // Duration of spin
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-blue-900 text-white">
      <PrivateHeader className="w-full" />
      <PrivateNavBar className="w-full" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: isSpinning ? 1080 : 0 }}
            transition={{ duration: 3 }}
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-8 border-yellow-500 flex items-center justify-center shadow-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            {selectedGift ? (
              <motion.img 
                src={selectedGift.icon} 
                alt={selectedGift.text} 
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaGift className="text-6xl md:text-8xl lg:text-9xl text-white mb-4" />
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Spin the Wheel!</p>
              </motion.div>
            )}
          </motion.div>
          {/* Adding gift names around the wheel */}
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
          disabled={isSpinning}
        >
          Spin
        </button>
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
