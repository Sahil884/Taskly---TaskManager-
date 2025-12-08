import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Taskly
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Organize your day, track progress, and collaborate effortlessly.
              Taskly helps you turn tasks into triumphs.
            </p>
            <div className="flex gap-4 ">
              <Link to={"/auth?mode=login"}>
                <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">
                  Get Started
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Task Summary
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-gray-500">Total Tasks</p>
                <p className="text-indigo-700 font-bold text-xl">24</p>
                <p className="text-green-500 text-xs mt-1">
                  ▲ 12% from last week
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-500">Pending</p>
                <p className="text-yellow-700 font-bold text-xl">8</p>
                <p className="text-red-500 text-xs mt-1">Need attention</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-500">In Progress</p>
                <p className="text-blue-700 font-bold text-xl">11</p>
                <p className="text-blue-500 text-xs mt-1">Active work</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-500">Completed</p>
                <p className="text-green-700 font-bold text-xl">5</p>
                <p className="text-green-500 text-xs mt-1">Great progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section  */}
      <section id="features" className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Taskly?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Organize with Clarity
              </h3>
              <p className="text-gray-600">
                Create lists, set priorities, and filter tasks with ease.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Collaborate in Real Time
              </h3>
              <p className="text-gray-600">
                Share boards and sync updates instantly across your team.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Celebrate Progress
              </h3>
              <p className="text-gray-600">
                Track streaks, earn badges, and stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
