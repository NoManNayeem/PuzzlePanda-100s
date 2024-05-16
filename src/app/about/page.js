import React from "react";
import Link from "next/link";
import Header from "../landingPageComponents/Header";
import NavBar from "../landingPageComponents/NavBar";
import Footer from "../landingPageComponents/Footer";
import { FaGithub, FaLinkedin, FaMediumM } from "react-icons/fa";
import Image from "next/image";
import profileImage from '../../../public/ProfilePhoto.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <NavBar />
      <div className="flex-grow font-sans text-gray-800 p-4 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mt-8 sm:mt-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-gray-900">
            Tech Maestro
          </h2>
          <div className="relative w-64 h-64 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-lg mb-8 hover:scale-105 transition-transform duration-500 cursor-pointer">
            <Link href="https://www.linkedin.com/in/nayeemislam60053" target="_blank" rel="noopener noreferrer">
              <Image
                src={profileImage}
                alt="Picture of the Engineer"
                fit
              />
            </Link>
          </div>
          <div className="text-center bg-white text-gray-800 px-8 py-8 w-full rounded-lg shadow-md">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Nayeem Islam</h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-4">
              Project Lead || Software Engineer || Generative AI Expert
            </p>
            <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-4">
              <Link href="https://github.com/NoManNayeem/" target="_blank" rel="noopener noreferrer"  className="mx-2 mt-2 inline-flex items-center px-4 sm:px-6 py-3 rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all duration-300">
                  <FaGithub className="mr-2" />
                  GitHub
              </Link>
              <Link href="https://www.linkedin.com/in/nayeemislam60053" target="_blank" rel="noopener noreferrer" className="mx-2 mt-2 inline-flex items-center px-4 sm:px-6 py-3 rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-300">
                  <FaLinkedin className="mr-2" />
                  LinkedIn
              </Link>
              <Link href="https://medium.com/@nomannayeem" target="_blank" rel="noopener noreferrer" className="mx-2 mt-2 inline-flex items-center px-4 sm:px-6 py-3 rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all duration-300">
                  <FaMediumM className="mr-2" />
                  Medium
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
