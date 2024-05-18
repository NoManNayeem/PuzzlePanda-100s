'use client'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getCookie } from 'cookies-next';
import { userPerformanceAPI } from '@/app/DRF_Backend/API';

// Register the required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white text-center rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b-2 border-gray-200">Date</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Correct</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Wrong</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Total Questions</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Total Quizzes Played</th>
        </tr>
      </thead>
      <tbody>
        {data.map((performance, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border-b">{performance.date_played}</td>
            <td className="px-4 py-2 border-b">{performance.correct_answers}</td>
            <td className="px-4 py-2 border-b">{performance.wrong_answers}</td>
            <td className="px-4 py-2 border-b">{performance.total_questions}</td>
            <td className="px-4 py-2 border-b">{performance.total_quizzes_played}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const UserPerformanceChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('chart'); // State to toggle between chart and table view
  const [performanceData, setPerformanceData] = useState([]);

  const fetchPerformanceData = async () => {
    try {
      const token = getCookie('token');
      const response = await fetch(userPerformanceAPI, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const dates = data.map(performance => performance.date_played);
      const correctAnswers = data.map(performance => performance.correct_answers);
      const wrongAnswers = data.map(performance => performance.wrong_answers);
      const totalQuestions = data.map(performance => performance.total_questions);
      const totalQuizzesPlayed = data.map(performance => performance.total_quizzes_played);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Correct Answers',
            data: correctAnswers,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Wrong Answers',
            data: wrongAnswers,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Total Questions',
            data: totalQuestions,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
          {
            label: 'Total Quizzes Played',
            data: totalQuizzesPlayed,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          },
        ],
      });

      setPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      setError('Failed to load performance data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="performance-container max-w-full mx-auto p-4">
      <div className="view-toggle mb-4 flex justify-center">
        <button
          className={`mr-4 py-2 px-4 text-sm rounded ${view === 'chart' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('chart')}
        >
          Chart
        </button>
        <button
          className={`py-2 px-4 text-sm rounded ${view === 'table' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('table')}
        >
          Table
        </button>
      </div>
      {view === 'chart' ? (
        <div className="chart-container w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Line data={chartData} />
        </div>
      ) : (
        <div className="table-container w-full overflow-x-auto">
          <PerformanceTable data={performanceData} />
        </div>
      )}
    </div>
  );
};

export default UserPerformanceChart;
