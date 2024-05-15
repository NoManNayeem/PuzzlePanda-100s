import React from 'react';
import Header from '../landingPageComponents/Header';
import NavBar from '../landingPageComponents/NavBar';
import Footer from '../landingPageComponents/Footer';
import Link from 'next/link';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaMedium, FaGithub } from 'react-icons/fa';

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
              <FaPhoneAlt className="w-6 h-6 text-purple-700 mr-2" />
              <span className="text-lg text-gray-600">+880 1781912704</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-6 h-6 text-purple-700 mr-2" />
              <span className="text-lg text-gray-600">Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="w-6 h-6 text-purple-700 mr-2" />
              <span className="text-lg text-gray-600">islam.nayeem@outlook.com</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="https://bd.linkedin.com/in/nayeemislam60053" className="text-purple-700 hover:text-purple-900">
              <FaLinkedin className="w-8 h-8" />
            </Link>
            <Link href="https://medium.com/@nomannayeem/" className="text-purple-700 hover:text-purple-900">
              <FaMedium className="w-8 h-8" />
            </Link>
            <Link href="https://github.com/NoManNayeem/" className="text-purple-700 hover:text-purple-900">
              <FaGithub className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
