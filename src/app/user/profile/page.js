'use client';

import React, { useState, useEffect } from 'react';
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';
import { profileDetailAPI, profileCreateAPI } from '@/app/DRF_Backend/API';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import pandaImage from '../../../../public/panda.png';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    primary_phone: '',
    subscription_phone: '',
    operator: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }
      try {
        const response = await fetch(profileDetailAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData({
            full_name: data.full_name || '',
            primary_phone: data.primary_phone || '',
            subscription_phone: data.subscription_phone || '',
            operator: data.operator || '',
          });
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (error) {
        setError('An error occurred while fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    if (!token) {
      setError('No authentication token found');
      return;
    }
    try {
      const response = await fetch(profileDetailAPI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      setError('An error occurred while updating profile');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    if (!token) {
      setError('No authentication token found');
      return;
    }
    try {
      const response = await fetch(profileCreateAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
      } else {
        setError('Failed to create profile');
      }
    } catch (error) {
      setError('An error occurred while creating profile');
    }
  };

  const placeholderAvatar = 'https://via.placeholder.com/150';

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-800 to-black">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 max-w-lg w-full">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {profile ? (
            <div className="flex flex-col items-center">
              <Image
                src={profile.avatar || pandaImage}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderAvatar; }}
              />
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold mb-2 text-white">{profile.user.username}</h2>
                  <p className="text-gray-300 mb-4">{profile.user.email}</p>
                  <div className="w-full">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                      <p className="text-black mb-2">
                        <strong>Name:</strong> {profile.full_name}
                      </p>
                      <p className="text-black mb-2">
                        <strong>Credits:</strong> {profile.credits}
                      </p>
                      <p className="text-black mb-2">
                        <strong>Subscription Status:</strong> {profile.is_subscribed ? 'Subscribed' : 'Not Subscribed'}
                      </p>
                      <p className="text-black mb-2">
                        <strong>Primary Phone:</strong> {profile.primary_phone}
                      </p>
                      <p className="text-black mb-2">
                        <strong>Subscription Phone:</strong> {profile.subscription_phone}
                      </p>
                      <p className="text-black">
                        <strong>Operator:</strong> {profile.operator}
                      </p>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={profile ? handleEdit : handleCreate} className="w-full space-y-4 text-black">
                  <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Primary Phone</label>
                    <input
                      type="text"
                      name="primary_phone"
                      value={formData.primary_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Subscription Phone</label>
                    <input
                      type="text"
                      name="subscription_phone"
                      value={formData.subscription_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Operator</label>
                    <select
                      name="operator"
                      value={formData.operator}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Operator</option>
                      <option value="GP">Grameenphone</option>
                      <option value="BL">Banglalink</option>
                      <option value="RA">Robi/Airtel</option>
                      <option value="TT">Teletalk</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-600 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-600">Loading profile...</p>
            </div>
          )}
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default Profile;
