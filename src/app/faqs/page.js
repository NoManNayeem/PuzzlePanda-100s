'use client';

import React, { useState, useEffect } from 'react';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';
import { faqsAPI } from '../DRF_Backend/API';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const cachedFaqs = localStorage.getItem('faqs');
        if (cachedFaqs) {
          setFaqs(JSON.parse(cachedFaqs));
        } else {
          const response = await fetch(faqsAPI);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data.results)) {
              setFaqs(data.results);
              localStorage.setItem('faqs', JSON.stringify(data.results));
            } else {
              setError('FAQs data is not in the expected format.');
            }
          } else {
            setError('Failed to fetch FAQs');
          }
        }
      } catch (error) {
        setError('An error occurred while fetching FAQs');
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <Header />
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="font-sans space-y-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center">FAQs</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {faqs.length === 0 && !error ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq.id} className="rounded-lg bg-purple-600 hover:bg-purple-700 transition-all">
                <button
                  type="button"
                  className="w-full text-base font-semibold text-left py-5 px-6 text-white flex items-center"
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
                <div className={`${activeIndex === index ? 'block' : 'hidden'} pb-5 px-6 bg-purple-800 text-white`}>
                  <p className="text-sm">{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
