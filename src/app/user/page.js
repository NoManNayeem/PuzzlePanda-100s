"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaTable, FaMedal, FaQuoteLeft, FaChartLine } from "react-icons/fa";
import PrivateFooter from "./LoggedUserComponents/Private_Footer";
import PrivateNavBar from "./LoggedUserComponents/Private_NavBar";
import PrivateHeader from "./LoggedUserComponents/Private_Header";
import { getCookie, setCookie } from "cookies-next";
import { profileDetailAPI } from "@/app/DRF_Backend/API";
import UserPerformanceChart from "./charts/UserPerformanceChart";

const UserPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    isSubscribed: false,
    stats: {
      totalQuizzes: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
  });
  const [displayMode, setDisplayMode] = useState("chart");
  const [performanceData, setPerformanceData] = useState([]);
  const [quote, setQuote] = useState("You Imagine, I craft!");
  const [author, setAuthor] = useState("Nayeem Islam");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSpinToWinButton = () => {
    router.push('/user/spin');
  };

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
          stats: {
            totalQuizzes: data.total_quizzes || 0,
            correctAnswers: data.correct_answers || 0,
            wrongAnswers: data.wrong_answers || 0,
          },
        });
        setPerformanceData(data.performance || []);
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

  useEffect(() => {
    const apiUrl = "https://api.quotable.io/random";

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      })
      .then((data) => {
        setQuote(data.content); // Setting the quote text
        setAuthor(data.author); // Setting the quote author
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <PrivateHeader />
      <PrivateNavBar />
      <div className="flex items-center justify-center mt-2">
        <button
          onClick={handlePlayNowClick}
          className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 ${user.isSubscribed
            ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
            : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
            }`}
          aria-label={user.isSubscribed ? 'Play Now' : 'Subscribe Now'}
        >
          <FaPlay />
          <span>{user.isSubscribed ? 'Play Now' : 'Subscribe Now'}</span>
        </button>
      </div>

      <div className="relative flex-grow flex flex-col items-center justify-center py-6">
        <div className="fixed bottom-20 left-auto z-50 animate-pulse">
          <button
            onClick={handlePlayNowClick}
            className={`inline-flex items-center justify-center py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:ring-4 focus:ring-indigo-500 ${user.isSubscribed
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
              }`}
          >
            <FaPlay className="mr-2" />
            {user.isSubscribed ? "Play Now" : "Subscribe Now"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl p-6 bg-white rounded-lg shadow-md text-gray-800">
          <div className="space-y-8">
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FaTable className="mr-2 text-indigo-500" />
                Performance
              </h2>
              <UserPerformanceChart/>
            </div>

            <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FaQuoteLeft className="mr-2 text-indigo-500" />
                Discover:
              </h2>
              {quote ? (
                <>
                  <p>
                    {quote}
                    <span className="font-bold mx-2">-{author}</span>
                  </p>
                </>
              ) : (
                <p>Loading quote...</p>
              )}
            </div>
            <div className="font-[sans-serif] text-center">
              <button
                type="button"
                onClick={handleSpinToWinButton}
                className="px-2 py-2 min-w-[140px] shadow-lg shadow-purple-200 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-purple-600 active:shadow-inner"
              >
                Spin To Win!
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FaMedal className="mr-2 text-indigo-500" />
                Achievements
              </h2>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <FaMedal className="text-4xl text-yellow-500 mb-2" />
                  <span className="font-medium">Top Scorer</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaMedal className="text-4xl text-blue-500 mb-2" />
                  <span className="font-medium">Quiz Master</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaMedal className="text-4xl text-red-500 mb-2" />
                  <span className="font-medium">Consistent Performer</span>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FaPlay className="mr-2 text-indigo-500" />
                Platform Stats
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">Over 10,000 quizzes played</li>
                <li className="mb-2">75% average correct answers</li>
                <li className="mb-2">500+ active users daily</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PrivateFooter />
    </div>
  );
};

export default UserPage;
