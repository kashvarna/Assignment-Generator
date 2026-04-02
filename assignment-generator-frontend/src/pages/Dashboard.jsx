import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(Auth);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/api/assignments/user/${user.id}`
      );

      setAssignments(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  fetchAssignments();
}, []);

  const attemptedAssignments = assignments.filter(
    (a) => a.status === "Completed"
  );

  const averageScore =
    attemptedAssignments.length > 0
      ? (
          attemptedAssignments.reduce((sum, a) => sum + (a.score || 0), 0) /
          attemptedAssignments.length
        ).toFixed(1)
      : 0;

  const bestScore =
    attemptedAssignments.length > 0
      ? Math.max(...attemptedAssignments.map((a) => a.score || 0))
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here’s your assignment performance overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Assignments
            </h3>
            <p className="text-4xl font-bold text-blue-700 mt-3">
              {assignments.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-green-100">
            <h3 className="text-sm font-medium text-gray-500">
              Assignments Attempted
            </h3>
            <p className="text-4xl font-bold text-green-700 mt-3">
              {attemptedAssignments.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-purple-100">
            <h3 className="text-sm font-medium text-gray-500">
              Average Score
            </h3>
            <p className="text-4xl font-bold text-purple-700 mt-3">
              {averageScore}%
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-yellow-100">
            <h3 className="text-sm font-medium text-gray-500">Best Score</h3>
            <p className="text-4xl font-bold text-yellow-600 mt-3">
              {bestScore}%
            </p>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Created Assignments
            </h2>
            <Link
              to="/create-assignment"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              + Create New
            </Link>
          </div>

          {assignments.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No assignments created yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-3">Title</th>
                    <th className="py-3">Languages</th>
                    <th className="py-3">Difficulty</th>
                    <th className="py-3">Questions</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium text-gray-800">
                        {assignment.title}
                      </td>
                      <td className="py-4 text-gray-600">
                        {assignment.languages.join(", ")}
                      </td>
                      <td className="py-4 text-gray-600">
                        {assignment.difficulty}
                      </td>
                      <td className="py-4 text-gray-600">
                        {assignment.questionCount}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            assignment.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() =>
                            navigate(`/take-assignment/${assignment.id}`)
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Start Test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;