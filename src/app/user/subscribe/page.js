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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    const initiateSubscription = async () => {
      const token = getCookie('token');
      setLoading(true);
      setError('');
      setShowContinueButton(false);

      try {
        const response = await axios.post(
          subscribeDigimartAPI,
          { msisdn: '' }, // Replace with logic to get the default phone number if needed
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

    initiateSubscription();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <img src={digimartOption.logo} alt={`${digimartOption.name} Logo`} className="w-62 h-28 mb-2 object-contain" />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!redirectUrl ? (
            <button
              className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-full shadow-md"
              disabled
            >
              {loading ? 'Processing...' : 'Preparing link...'}
            </button>
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
