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
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-purple-200">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Subscribe to PuzzlePanda!</h1>
        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform">
            <img src={digimartOption.logo} alt={`${digimartOption.name} Logo`} className="w-32 h-32 mb-6 object-contain" />
            {!redirectUrl ? (
              <>
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors mb-4"
                  onClick={handleSubscribeNow}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    `Subscribe Now with ${digimartOption.name}`
                  )}
                </button>
                <form onSubmit={handleSubscribeWithPhone} className="w-full flex items-center space-x-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border rounded-full text-black px-4 py-3 w-full shadow-md focus:ring-2 focus:ring-blue-600"
                    placeholder="Subscriber With Different Phone"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    disabled={loading}
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
                className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue
              </Link>
            ) : (
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-full shadow-lg"
                disabled
              >
                Preparing link...
              </button>
            )}
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
