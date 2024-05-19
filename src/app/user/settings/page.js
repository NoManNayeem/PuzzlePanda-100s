'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaBell, FaBellSlash } from 'react-icons/fa';
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { checkSubscriptionDigimartAPI } from '@/app/DRF_Backend/API';
import { getCookie } from "cookies-next";

export default function Settings() {
  const [subscriptionStatus, setSubscriptionStatus] = useState('Unknown');
  const router = useRouter();

  useEffect(() => {
    const subStatus = getCookie('subscription_token');
    if (subStatus) {
      setSubscriptionStatus(subStatus);
    }
  }, []);

  const handleSubscribe = () => {
    router.push('/user/subscribe');
  };

  const handleUnsubscribe = () => {
    // Placeholder for backend API call to unsubscribe
    router.push('/user/unsubscribe');
    alert('You are about to unsubscribe?');
  };

  const handleCheckSubscription = async () => {
    try {
      const response = await checkSubscriptionDigimartAPI();
      setSubscriptionStatus(response.status);
      alert(`Subscription status: ${response.status}`);
    } catch (error) {
      console.error('Error checking subscription status:', error);
      alert('Failed to check subscription status.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PrivateHeader />
      <PrivateNavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2 w-11/12 text-center">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p className="mb-8 text-lg text-gray-700">
            Stay subscribed to enjoy exclusive benefits! 🎉
          </p>
          <div className="flex flex-col space-y-6">
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 shadow-md transform transition duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
                <FaBell className="text-green-900" />
                <span className="text-green-900">Subscribe</span>
              </h2>
              <p className="mb-4 text-green-600">
                Join our community and never miss an update! 🌟
              </p>
              <button
                onClick={handleSubscribe}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-300"
              >
                <FaBell />
                <span>Subscribe</span>
              </button>
            </div>
            <div className="bg-red-100 border border-red-200 rounded-lg p-4 shadow-md transform transition duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
                <FaBellSlash className="text-red-900" />
                <span className="text-red-900">Unsubscribe</span>
              </h2>
              <p className="mb-4 text-red-600">
                We're sad to see you go. If you must, you can unsubscribe here. 😢
              </p>
              <button
                onClick={handleUnsubscribe}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition duration-300"
              >
                <FaBellSlash />
                <span>Unsubscribe</span>
              </button>
            </div>
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 shadow-md transform transition duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
                <FaCheck className="text-blue-900" />
                <span className="text-blue-900">Check Subscription</span>
              </h2>
              <p className="mb-4 text-blue-600">
                Want to know your current subscription status? 🔍
              </p>
              <button
                onClick={handleCheckSubscription}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-300"
              >
                <FaCheck />
                <span>Check Subscription</span>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-gray-700">
              Current subscription status: <span className="font-bold">{subscriptionStatus}</span>
            </p>
          </div>
        </div>
      </main>
      <PrivateFooter />
    </div>
  );
}
