'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaPlay, FaTable } from 'react-icons/fa';
import PrivateFooter from './LoggedUserComponents/Private_Footer';
import PrivateNavBar from './LoggedUserComponents/Private_NavBar';
import PrivateHeader from './LoggedUserComponents/Private_Header';
import { getCookie } from 'cookies-next';

const UserPage = () => {
  const [user, setUser] = useState({
    fullName: '',
    isSubscribed: false,
    stats: {
      totalQuizzes: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
  });

  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      // Replace this with your actual data fetching logic
      const userData = {
        fullName: 'John Doe',
        stats: {
          totalQuizzes: 10,
          correctAnswers: 70,
          wrongAnswers: 30,
        },
      };

      // Get subscription status from cookies
      const subscriptionToken = getCookie('subscription_token');
      const isSubscribed = subscriptionToken === 'true';

      setUser({
        ...userData,
        isSubscribed: isSubscribed,
      });
    };

    fetchUserData();
  }, []);

  const handlePlayNowClick = () => {
    if (user.isSubscribed) {
      router.push(`/user/play-now`);
    } else {
      router.push('/user/subscribe');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex flex-col items-center justify-center py-12 text-black">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-semibold mb-6">{user.fullName}!</h1>
          <button
            onClick={handlePlayNowClick}
            className={`inline-block py-3 px-6 mb-6 rounded transition-colors duration-300 ${
              user.isSubscribed
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <FaPlay className="inline-block mr-2" />
            {user.isSubscribed ? 'Play Now' : 'Subscribe Now'}
          </button>

          <div className="bg-white rounded-lg shadow-lg w-full mb-2 max-w-4xl p-4">
            <h2 className="text-2xl font-semibold mb-4">
              <FaTable className="inline-block mr-2" />
              Your Performance
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Quizzes</th>
                    <th className="px-4 py-2 border">Correct</th>
                    <th className="px-4 py-2 border">Wrong</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example static data; replace with dynamic data */}
                  <tr>
                    <td className="px-4 py-2 border">{user.stats.totalQuizzes}</td>
                    <td className="px-4 py-2 border">{user.stats.correctAnswers}</td>
                    <td className="px-4 py-2 border">{user.stats.wrongAnswers}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default UserPage;
