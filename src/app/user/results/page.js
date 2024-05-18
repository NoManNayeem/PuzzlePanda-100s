'use client';

import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import pandaImage from '../../../../public/panda.png';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaRedo } from 'react-icons/fa';
import { quizAPI } from '@/app/DRF_Backend/API';
import { getCookie } from 'cookies-next';

const Result = () => {
    const router = useRouter();
    const [userAnswers, setUserAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuestions = async () => {
        try {
            const token = getCookie('token');
            const response = await fetch(quizAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            const formattedData = data.map(question => ({
                ...question,
                options: question.options.split(','),
            }));
            setQuestions(formattedData);
        } catch (error) {
            setError('Error fetching questions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        if (storedAnswers) {
            setUserAnswers(storedAnswers);
        }
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0 && userAnswers.length > 0) {
            let newScore = 0;
            questions.forEach((question, index) => {
                if (userAnswers[index] === question.correct_answer) {
                    newScore++;
                }
            });
            setScore(newScore);
        }
    }, [questions, userAnswers]);

    const handlePlayAgain = () => {
        router.push('/user/play-now');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-500 to-blue-700 text-gray-100">
            <PrivateHeader />
            <PrivateNavBar />
            <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
                {loading ? (
                    <div className="text-white text-2xl">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-xl">{error}</div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-xl p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                    >
                        <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">Quiz Results</h1>
                        <div className="flex flex-col items-center justify-center mb-6 text-center">
                            <Image src={pandaImage} alt="Panda" width={150} height={150} className="mb-4" />
                            <h2 className="text-3xl font-semibold text-gray-800">Your Score: {score}</h2>
                        </div>
                        <div className="mb-4">
                            {questions.map((question, index) => (
                                <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                                    <h3 className="mb-2 text-lg font-bold text-black">Question: {question.question}</h3>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">Your Answer:</span> 
                                        <span className={`${userAnswers[index] === question.correct_answer ? 'text-green-600' : 'text-red-600'} ml-2`}>
                                            {userAnswers[index]}
                                        </span>
                                    </p>
                                    {/* <p className="text-gray-700">
                                        <span className="font-semibold">Correct Answer:</span> 
                                        <span className="text-green-600 ml-2">{question.correct_answer}</span>
                                    </p> */}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handlePlayAgain}
                            className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                        >
                            Play Again <FaRedo className="ml-2" />
                        </button>
                    </motion.div>
                )}
            </div>
            <PrivateFooter />
        </div>
    );
};

export default Result;
