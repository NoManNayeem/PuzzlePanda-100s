'use client';

import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { unsubscribeDigimartAPI } from '@/app/DRF_Backend/API';

const UnsubscribePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnsubscription = async () => {
    const token = getCookie('token');
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        unsubscribeDigimartAPI,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Unsubscription Response:', response.data);
      // Handle the response as needed, for example, update the UI or notify the user
      localStorage.removeItem('subscription_token');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setError('Failed to unsubscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow bg-gray-100 text-black flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Unsubscribe from PuzzlePanda</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
              onClick={handleUnsubscription}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Unsubscribe'}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <PrivateFooter />
    </div>
  );
};

export default UnsubscribePage;