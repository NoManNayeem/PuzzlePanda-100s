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
    <div className="min-h-screen flex flex-col">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow bg-gray-100 text-black flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Subscribe to PuzzlePanda!</h1>
        <div className="grid grid-cols-1 gap-4">
          <div key={digimartOption.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
            <img src={digimartOption.logo} alt={`${digimartOption.name} Logo`} className="w-full h-16 mb-4" />
            {!redirectUrl ? (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4"
                  onClick={handleSubscribeNow}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : `Subscribe Now with ${digimartOption.name}`}
                </button>
                <form onSubmit={handleSubscribeWithPhone} className="w-full flex flex-col items-center">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border rounded-md px-4 py-2 mb-4 w-full"
                    placeholder="Enter your phone number"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : `Subscribe with Another Phone`}
                  </button>
                </form>
              </>
            ) : showContinueButton ? (
              <Link
                href={redirectUrl}
                passHref
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue
              </Link>
            ) : (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md"
                disabled
              >
                Preparing link...
              </button>
            )}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <PrivateFooter />
    </div>
  );
};

export default SubscribePage;
