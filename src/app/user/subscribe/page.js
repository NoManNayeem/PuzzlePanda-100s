'use client';

import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Link from 'next/link';
import { subscribeDigimartAPI } from '@/app/DRF_Backend/API';

const digimartOption = {
  name: 'Digimart',
  logo: 'https://dev.digimart.store/Assets/Logo/digimartFullLogo.png', // Replace with the actual logo path
};

const SubscribePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const subscriptionStatus = localStorage.getItem('subscription_token') === 'true';
    setIsSubscribed(subscriptionStatus);
  }, []);

  const handleSubscription = async (msisdn) => {
    const token = getCookie('token');
    setLoading(true);
    setError('');
    setShowContinueButton(false);

    try {
      const response = await axios.post(
        subscribeDigimartAPI,
        { msisdn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Subscription URL:', response.data.api_endpoint); // Log the URL
      setRedirectUrl(response.data.api_endpoint); // Set the URL to trigger the redirect

      // Show the continue button after 4 seconds
      setTimeout(() => {
        setShowContinueButton(true);
      }, 4000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeNow = async (event) => {
    event.preventDefault();
    await handleSubscription();
  };

  const handleSubscribeWithPhone = async (event) => {
    event.preventDefault();
    await handleSubscription(phone);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <img src={digimartOption.logo} alt={`${digimartOption.name} Logo`} className="w-62 h-28 mb-2 object-contain" />
          {!redirectUrl ? (
            <>
              <div className="flex items-center p-4 mb-2 text-sm text-blue-900 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>Subscribe with Grameenphone!
              </div>

              <button
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 mb-4"
                onClick={handleSubscribeNow}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  `Subscribe Now with ${digimartOption.name}`
                )}
              </button>
              <form onSubmit={handleSubscribeWithPhone} className="w-full flex ">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-300 rounded-l-full text-black px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Subscribe with Different Phone"
                  aria-label="Phone number"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white text-xs font-semibold px-6 py-2 rounded-r-full shadow-md hover:bg-green-600 transition duration-300"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    `Subscribe`
                  )}
                </button>
              </form>
            </>
          ) : showContinueButton ? (
            <Link
              href={redirectUrl}
              passHref
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue
            </Link>
          ) : (
            <button
              className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-full shadow-md"
              disabled
            >
              Preparing link...
            </button>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
      <PrivateFooter />
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SubscribePage;
