'use client'

import React, { useState } from 'react';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';

const faqs = [
  {
    question: "What is Puzzle-Panda?",
    answer: "Puzzle-Panda is an engaging quiz platform that allows users to participate in various quizzes to test and expand their knowledge."
  },
  {
    question: "How do I participate in a quiz?",
    answer: "To participate in a quiz, simply sign up or log in, browse through the available quizzes, and click on the one you want to take."
  },
  {
    question: "Can I create my own quiz?",
    answer: "Yes, you can create your own quizzes. Navigate to the 'Create Quiz' section, enter your quiz details, and publish it for others to play."
  },
  {
    question: "Is there a fee to use Puzzle-Panda?",
    answer: "Puzzle-Panda offers both free and premium quizzes. Free quizzes are available to all users, while premium quizzes require a subscription."
  }
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="font-sans space-y-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">FAQS</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg hover:bg-blue-50 transition-all">
              <button
                type="button"
                className="w-full text-base font-semibold text-left py-5 px-6 text-gray-900 flex items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="mr-4">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 fill-current ml-auto shrink-0 ${activeIndex === index ? 'rotate-180' : '-rotate-90'}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                    clipRule="evenodd"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
              <div className={`${activeIndex === index ? 'block' : 'hidden'} pb-5 px-6`}>
                <p className="text-sm text-gray-900">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
