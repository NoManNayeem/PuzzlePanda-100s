'use client';

import PrivateFooter from './LoggedUserComponents/Private_Footer';
import PrivateHeader from './LoggedUserComponents/Private_Header';
import PrivateNavBar from './LoggedUserComponents/Private_NavBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import { questions } from './Data';

const PlayQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(100); // Total time for all questions
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    if (totalTimeLeft === 0) {
      endQuiz();
    }
    const timer = setInterval(() => {
      setTotalTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeLeft]);

  useEffect(() => {
    controls.start({
      width: `${(totalTimeLeft / 100) * 100}%`,
      transition: { duration: 1, ease: 'linear' },
    });
  }, [totalTimeLeft, controls]);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    setUserAnswers([...userAnswers, selectedAnswer]);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    localStorage.setItem('userAnswers', JSON.stringify([...userAnswers, selectedAnswer]));
    router.push('/user/results');
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-400 to-blue-600">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="relative w-full max-w-lg p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
          <motion.div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
            animate={controls}
            initial={{ width: '100%' }}
          />
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-center text-gray-800">
              {questions[currentQuestion].question}
            </h3>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-blue-500" />
              <span>{totalTimeLeft} seconds left</span>
            </div>
          </div>
          <ul className="space-y-3 text-black">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                className={`p-3 text-center bg-purple-200 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option ? 'bg-purple-400 text-white' : 'hover:bg-purple-300'
                }`}
                onClick={() => handleOptionClick(option)}
                aria-selected={selectedAnswer === option}
                role="option"
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextQuestion}
            className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors disabled:opacity-50"
            disabled={!selectedAnswer}
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default PlayQuiz;
