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
    <div className=''>
    <PrivateHeader/>
    <PrivateNavBar/>
    <div className=" min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-2 md:p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full mb-4"
            src={user.avatar || '/default-avatar.png'}
            alt="Profile Picture"
          />
          <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-800">
              <strong>Primary Phone:</strong> {user.primaryPhone}
            </p>
            <p className="text-gray-800">
              <strong>Subscription Phone:</strong> {user.subscriptionPhone}
            </p>
            <p className="text-gray-800">
              <strong>Operator:</strong> {user.operator}
            </p>
          </div>
        </div>
      </div>
    </div>
    <PrivateFooter/>
    </div>
  );
};

export default Profile;
