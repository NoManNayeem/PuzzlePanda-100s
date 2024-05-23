"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaSyncAlt, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import PrivateFooter from "./LoggedUserComponents/Private_Footer";
import PrivateNavBar from "./LoggedUserComponents/Private_NavBar";
import PrivateHeader from "./LoggedUserComponents/Private_Header";
import { getCookie, setCookie } from "cookies-next";
import { profileDetailAPI } from "@/app/DRF_Backend/API";
import SimpleSlider from "./Slider";

const UserPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    isSubscribed: false,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUserData = async () => {
    const token = getCookie("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }
    try {
      const response = await fetch(profileDetailAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const isSubscribed = data.is_subscribed;
        setCookie("subscription_token", isSubscribed ? "true" : "false", {
          path: "/",
        });

        setUser({
          fullName: data.full_name || "N/A",
          isSubscribed: isSubscribed,
        });
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("An error occurred while fetching profile data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePlayNowClick = () => {
    if (user.isSubscribed) {
      router.push(`/user/play-now`);
    } else {
      router.push("/user/subscribe");
    }
  };

  const handleSpinToWinButton = () => {
    router.push('/user/spin');
  };

  const handleTryFree = () => {
    router.push('/user/try-free');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex flex-col lg:flex-row lg:items-start items-center mt-8 px-4 space-y-6 lg:space-y-0 lg:space-x-6">
        {[
          { onClick: handlePlayNowClick, label: user.isSubscribed ? 'Play Now' : 'Subscribe Now', icon: <FaPlay />, bgColor: user.isSubscribed ? 'bg-green-500' : 'bg-red-500' },
          { onClick: handleSpinToWinButton, label: 'Spin To Win!', icon: <FaSyncAlt />, bgColor: 'bg-yellow-500' },
          { onClick: handleTryFree, label: 'Try Free!', icon: <FaGift />, bgColor: 'bg-purple-500' }
        ].map((button, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full lg:w-1/3 rounded-lg shadow-lg p-6 text-center text-gray-800 transition-transform duration-300 ${button.bgColor}`}
          >
            <button
              onClick={button.onClick}
              className="relative inline-block overflow-hidden rounded border-2 border-white bg-gray-200 px-12 py-3 text-sm font-medium text-slate-800 hover:text-green focus:outline-none focus:ring active:bg-blue-600 active:text-green"
            >
              <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
              <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
              <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
              <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
              <div className="flex items-center justify-center">
                {button.icon}
                <span className="text-lg ml-2">{button.label}</span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 px-4">
        <SimpleSlider />
      </div>

      <PrivateFooter />
    </div>
  );
};

export default UserPage;
