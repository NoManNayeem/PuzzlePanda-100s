'use client';

import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import { getCookie } from 'cookies-next';
import { quizAPI } from '@/app/DRF_Backend/API';

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubscriptionChecked, setIsSubscriptionChecked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const router = useRouter();
  const controls = useAnimation();

  const fetchQuestions = async () => {
    try {
      const token = getCookie('token');
      const response = await fetch(quizAPI, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Split the options string into an array
      const formattedData = data.map(question => ({
        ...question,
        options: question.options.split(','),
      }));
      setQuestions(formattedData);
      console.log('Questions:', formattedData); // Log the formatted questions
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Error fetching questions');
    }
  };

  useEffect(() => {
    const subscriptionToken = getCookie('subscription_token');
    if (subscriptionToken !== 'true') {
      router.push('/user/subscribe');
    } else {
      setIsSubscribed(true);
      setIsSubscriptionChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (isSubscriptionChecked) {
      fetchQuestions();

      const startTime = localStorage.getItem('quizStartTime');
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeLeft(Math.max(100 - elapsedTime, 0));

      timerRef.current = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTimeLeft(Math.max(100 - elapsedTime, 0));
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [isSubscriptionChecked]);

  useEffect(() => {
    if (timeLeft === 0) {
      endQuiz();
    }
  }, [timeLeft]);

  useEffect(() => {
    controls.start({
      width: `${(timeLeft / 100) * 100}%`,
      transition: { duration: 1, ease: 'linear' },
    });
  }, [timeLeft, controls]);

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
      router.push('/user/results');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome
      router.push('/user');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  useEffect(() => {
    const startTime = Date.now();
    startTimeRef.current = startTime;
    localStorage.setItem('quizStartTime', startTime);
  }, []);

  if (!isSubscriptionChecked) {
    return null; // Render nothing until the subscription status is checked
  }

  if (questions.length === 0) {
    return <div>Loading...</div>; // Show a loading indicator while questions are being fetched
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-500 to-blue-700 text-gray-100">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
        {questions.length > 0 && (
          <div className="relative w-full max-w-lg p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
            <motion.div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
              animate={controls}
              initial={{ width: '100%' }}
            />
            <div className="flex justify-between items-center mb-4 text-center">
              <h3 className="text-2xl font-semibold text-center text-gray-800">
                Q: {questions[currentQuestion].question}
              </h3>
              <div className="flex items-center text-gray-700">
                <FaClock className="mr-2 text-blue-500" />
                <span><b>{timeLeft}</b>s</span>
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
        )}
      </div>
      <PrivateFooter />
    </div>
  );
};

export default PlayQuiz;
