'use client'

import React, { useState, useEffect } from 'react';
import { questions as initialQuestions } from '../Data';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const TryFree = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions).slice(0, 10));
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setSelectedOption('');
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div>
        <PrivateHeader/>
        <PrivateNavBar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded shadow-md text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
            <p className="text-2xl mb-6">Your score: {score} / {questions.length}</p>
            <p className="text-2xl mb-6">
              You have a remarkable ability to learn and grow! Unlock more challenges and continue your journey with us.
            </p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => window.location.href = '/user/subscribe'}
            >
              Subscribe Now
            </button>
            <button
              className="mx-4 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-700"
              onClick={() => window.location.href = '/user'}
            >
              Home
            </button>
          </motion.div>
        </div>
        <PrivateFooter/>
      </div>
    );
  }

  return (
    <div>
      <PrivateHeader/>
      <PrivateNavBar/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          <span className="font-medium">Warning!</span> Trial Questions/Answers may not be correct
        </div>
        {questions.length > 0 && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 text-black text-center rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
              </div>
            ))}
            <div className="flex items-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`ml-4 text-2xl ${
                    isCorrect ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {isCorrect ? <FaRegCheckCircle /> : <FaRegTimesCircle />}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
      <PrivateFooter/>
    </div>
  );
};

export default TryFree;
