import React from 'react';
import PrivateFooter from '../LoggedUserComponents/Private_Footer';
import PrivateHeader from '../LoggedUserComponents/Private_Header';
import PrivateNavBar from '../LoggedUserComponents/Private_NavBar';

const Profile = () => {
  // Sample user data, replace this with actual data fetching logic
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    primaryPhone: '8801234567890',
    subscriptionPhone: '8800987654321',
    operator: 'Grameenphone',
    avatar: 'https://via.placeholder.com/150',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-200 p-4">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 max-w-lg w-full">
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 shadow-md"
              src={user.avatar || '/default-avatar.png'}
              alt="Profile Picture"
            />
            <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">Contact Information</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <p className="text-gray-800 mb-2">
                  <strong>Primary Phone:</strong> {user.primaryPhone}
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Subscription Phone:</strong> {user.subscriptionPhone}
                </p>
                <p className="text-gray-800">
                  <strong>Operator:</strong> {user.operator}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default Profile;
