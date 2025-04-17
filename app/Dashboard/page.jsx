'use client';
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const pieData = {
    labels: ['Success', 'Pending', 'Failed'],
    datasets: [
      {
        label: 'Order Status',
        data: [60, 25, 15],
        backgroundColor: ['#22c55e', '#fbbf24', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#f59e0b', '#dc2626'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            family: 'Arial',
          },
        },
      },
    },
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Goal Completion',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            family: 'Arial',
          },
        },
      },
    },
  };

  const visitorData = {
    labels: ['New Visitors', 'Returning Visitors'],
    datasets: [
      {
        label: 'Visitor Performance',
        data: [70, 30],
        backgroundColor: ['#3498db', '#2ecc71'],
        hoverBackgroundColor: ['#2980b9', '#27ae60'],
      },
    ],
  };

  const visitorOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            family: 'Arial',
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (Fixed for Web) */}
      <div className="w-64 text-white p-4 hidden md:block">
        {/* Sidebar content goes here */}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="text-white p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Profile</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gray-50 flex-1 overflow-auto">
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card Items */}
            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <img src="../favicon.ico" alt="Total Users" className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-2xl font-bold text-blue-500">1,234</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <img src="../favicon.ico" alt="Total Products" className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-2xl font-bold text-yellow-500">567</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <img src="../favicon.ico" alt="Total Orders" className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-2xl font-bold text-green-700">89</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <img src="../favicon.ico" alt="Earnings Growth" className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Earnings Growth</h2>
                <p className="text-2xl font-bold text-blue-700">$12,345</p>
              </div>
            </div>
          </div>

          {/* Graphs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Goal Completion</h2>
              <div className="h-96">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Visitor Performance</h2>
              <div className="h-96 mt-20" style={{ height: '300px' }}>
                <Bar data={visitorData} options={visitorOptions} />
              </div>
            </div>
          </div>

          {/* Customer Review Section */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
            <div className="flex items-center space-x-4">
              <img src="/example-user.png" alt="User" className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-500">"Great service and quality products!"</p>
                <div className="flex mt-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-500">&#9733;</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
