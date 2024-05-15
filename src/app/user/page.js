'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrivateFooter from './LoggedUserComponents/Private_Footer';
import PrivateHeader from './LoggedUserComponents/Private_Header';
import PrivateNavBar from './LoggedUserComponents/Private_NavBar';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  // Add more questions here
];



export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);



  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setError(null);
    setFeedback(null);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      setError('Please select an option!');
      return;
    }

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }

    setTimeout(() => {
      setSelectedOption('');
      setError(null);
      setFeedback(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption('');
    setShowScore(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6 text-blcak">
        <div className="text-center w-full max-w-md px-4 sm:px-6 lg:px-8">
          {showScore ? (
            <div>
              <h2 className="text-3xl md:text-4xl text-black font-bold mb-4 animate-pulse">Your Score: {score}/{questions.length}</h2>
              <button
                onClick={handleRestartQuiz}
                className="mt-4 bg-purple-600 hover:bg-purple-500 text-black px-4 py-2 rounded-full transition duration-200 ease-in-out shadow-md"
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl md:text-4xl text-black font-bold mb-4 animate-pulse">{questions[currentQuestion].question}</h2>
              <div className="text-sm text-gray-300 mb-4">{`Question ${currentQuestion + 1} of ${questions.length}`}</div>
              <form>
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="quiz-option"
                        value={option}
                        className="form-radio text-purple-600"
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2 text-black">{option}</span>
                    </label>
                  </div>
                ))}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {feedback && <p className={`text-sm mb-4 ${feedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>{feedback}</p>}
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="mt-4 bg-purple-600 hover:bg-purple-500 text-black px-4 py-2 rounded-full transition duration-200 ease-in-out shadow-md"
                >
                  Next Question
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
}
