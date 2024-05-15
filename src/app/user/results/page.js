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
import { questions } from '../Data';

const Result = () => {
    const router = useRouter();
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        if (storedAnswers) {
            setUserAnswers(storedAnswers);
            calculateScore(storedAnswers);
        }
    }, []);

    const calculateScore = (answers) => {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                score += 1;
            }
        });
        setScore(score);
    };

    const handlePlayAgain = () => {
        localStorage.removeItem('userAnswers');
        router.push('/user');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-400 to-blue-600">
            <PrivateHeader />
            <PrivateNavBar />
            <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
                <motion.div
                    className="relative w-full max-w-lg p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div class="grid grid-cols-2 gap-2">
                        <div className="relative w-40 h-40 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg mb-2 hover:scale-105 transition-transform duration-500 cursor-pointer">
                            <Image
                                src={pandaImage}
                                alt="Picture of the Engineer"
                                layout="fit"
                            />
                        </div>
                        <div className='mb-auto mt-auto'>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Your Results</h2>
                            <p className="text-xl font-semibold text-center text-gray-800 mb-2">Score: {score} / {questions.length}</p>
                            <motion.button
                                onClick={handlePlayAgain}
                                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Play Again <FaRedo className="ml-2" />
                            </motion.button>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {userAnswers.map((answer, index) => (
                            <li key={index} className="p-4 bg-purple-200 rounded-lg shadow-md">
                                <p className="font-semibold text-gray-800">Q: {questions[index].question}</p>
                                <p className="text-gray-600">Your Answer: {answer}</p>
                                <p className={`font-semibold ${questions[index].correctAnswer === answer ? 'text-green-500' : 'text-red-500'}`}>
                                    {questions[index].correctAnswer === answer ? 'Correct' : 'Incorrect'}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <motion.button
                        onClick={handlePlayAgain}
                        className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Play Again <FaRedo className="ml-2" />
                    </motion.button>
                </motion.div>
            </div>
            <PrivateFooter />
        </div>
    );
};

export default Result;
