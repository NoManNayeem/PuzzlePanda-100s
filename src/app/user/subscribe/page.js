'use client';

import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { useEffect, useState } from 'react';
import { FaPlay, FaCheckCircle } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';

const subscriptionOptions = [
  {
    name: 'Digimart',
    logo: 'https://dev.digimart.store/Assets/Logo/digimartFullLogo.png', // Replace with the actual logo path
  },
  {
    name: 'GrameenPhone',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
  {
    name: 'Banglalink',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
  {
    name: 'Robi/Airtel',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
  {
    name: 'Bkash',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
  {
    name: 'Nagad',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
  {
    name: 'Rocket',
    logo: 'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with the actual logo path
  },
];

const UserHome = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Retrieve subscription status from localStorage
    const subscriptionStatus = localStorage.getItem('subscription_token') === 'true';
    setIsSubscribed(subscriptionStatus);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow bg-gray-100 text-black flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to PuzzlePanda!</h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subscriptionOptions.map((option) => (
            <div key={option.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
              <img src={option.logo} alt={`${option.name} Logo`} className="w-full h-16 mb-4" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                Subscribe with {option.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default UserHome;
