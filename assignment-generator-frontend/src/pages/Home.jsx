import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            AI-Powered <span className="text-blue-700">Assignment Generator</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Create coding assignments instantly based on programming language,
            difficulty level, and question type. Practice smarter with AI-generated
            MCQ assessments and score tracking.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-white text-blue-700 border border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Why Use AssignAI?
          </h2>

          <div className="grid gap-5">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <h3 className="font-semibold text-blue-700">Multi-Language Support</h3>
              <p className="text-sm text-gray-600 mt-1">
                Generate assignments for Java, Python, HTML, CSS and more.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <h3 className="font-semibold text-purple-700">Difficulty-Based Questions</h3>
              <p className="text-sm text-gray-600 mt-1">
                Choose hardness level from 1 to 5 based on your skill level.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
              <h3 className="font-semibold text-green-700">Instant Score Evaluation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Attempt MCQ assignments and get scores automatically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
              <h3 className="font-semibold text-yellow-700">Performance Dashboard</h3>
              <p className="text-sm text-gray-600 mt-1">
                Track generated assignments, attempts, and average scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold text-blue-700">4+</h3>
            <p className="text-gray-600 mt-2">Languages Supported</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold text-purple-700">5</h3>
            <p className="text-gray-600 mt-2">Difficulty Levels</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold text-green-700">10–15</h3>
            <p className="text-gray-600 mt-2">Questions Per Assignment</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-3xl font-bold text-yellow-700">AI</h3>
            <p className="text-gray-600 mt-2">Generated Assessments</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;