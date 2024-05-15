import React from 'react';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';
import Link from 'next/link';



const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <NavBar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Contact Us</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01M12 14h.01"></path></svg>
              <span className="text-lg text-gray-600">+123 456 789</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4.88V21"></path></svg>
              <span className="text-lg text-gray-600">123 Puzzle Street, Playtown, PU 12345</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 01-12 0 6 6 0 0112 0zm2 12h-8m8-4h-8"></path></svg>
              <span className="text-lg text-gray-600">@PuzzlePanda</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="#" className="text-purple-700 hover:text-purple-900">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56a9.94 9.94 0 01-2.82.78 4.93 4.93 0 002.16-2.72 9.86 9.86 0 01-3.1 1.18 4.92 4.92 0 00-8.39 4.48A13.94 13.94 0 011.67 3.15a4.93 4.93 0 001.52 6.57 4.9 4.9 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.86 9.86 0 010 19.54a13.93 13.93 0 007.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.02-.63A10.06 10.06 0 0024 4.56z"/></svg>
            </Link>
            <Link href="#" className="text-purple-700 hover:text-purple-900">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.4 2H5.6C3.88 2 2.48 3.4 2.48 5.12V18.8c0 1.72 1.4 3.12 3.12 3.12h6.9v-7.42h-2.5v-2.9h2.5V9.2c0-2.5 1.52-3.87 3.75-3.87 1.07 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.76-1.63 1.54v1.84h2.76l-.44 2.9h-2.32V22h4.54c1.72 0 3.12-1.4 3.12-3.12V5.12C21.52 3.4 20.12 2 18.4 2z"/></svg>
            </Link>
            <Link href="#" className="text-purple-700 hover:text-purple-900">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zm-6.46 18.4h-2.84v-6.93h2.84v6.93zM12 11.1c-.9 0-1.64-.74-1.64-1.64 0-.9.74-1.64 1.64-1.64s1.64.74 1.64 1.64c0 .9-.74 1.64-1.64 1.64zm-3.93 7.3H5.24v-6.93h2.83v6.93zM18.56 7.1h-2.3v1.57h-.03c-.32-.6-1.1-1.23-2.25-1.23-2.41 0-2.86 1.59-2.86 3.66v4.18h-2.84v-6.93h2.84v.95h.03c.4-.76 1.37-1.25 2.29-1.25 1.64 0 2.88 1.06 2.88 3.33v4.9h-2.84v-6.93h2.84v.95h.03c.4-.76 1.37-1.25 2.29-1.25 1.64 0 2.88 1.06 2.88 3.33v4.9h-2.84V18.4z"/></svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
