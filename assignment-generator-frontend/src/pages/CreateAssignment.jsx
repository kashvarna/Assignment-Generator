import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(Auth); // ✅ FIX

  const [formData, setFormData] = useState({
    title: "",
    languages: [],
    difficulty: "",
    questionCount: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const { title, languages, difficulty, questionCount } = formData;

  const languageOptions = [
    "Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#",
    "Go", "Rust", "Kotlin", "Swift", "PHP", "Ruby", "SQL",
    "HTML", "CSS", "Node.js", "React", "Angular", "Vue",
    "Django", "Flask", "Spring Boot"
  ];

  const handleLanguageChange = (language) => {
    if (languages.includes(language)) {
      setFormData({
        ...formData,
        languages: languages.filter((lang) => lang !== language),
      });
    } else {
      if (languages.length >= 5) {
        toast.error("Max 5 languages");
        return;
      }
      setFormData({
        ...formData,
        languages: [...languages, language],
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ⛔ wait for auth

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!languages.length || !difficulty) {
      toast.error("Select language & difficulty");
      return;
    }

    if (submitting) return;

    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:5000/api/assignments/create",
        {
          user_id: user.id,
          title,
          languages,
          difficulty,
          questionCount,
        }
      );

      toast.success("Assignment created!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create assignment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Assignment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
          />

          <div className="grid grid-cols-2 gap-2">
            {languageOptions.map((lang) => (
              <label key={lang} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={languages.includes(lang)}
                  onChange={() => handleLanguageChange(lang)}
                />
                {lang}
              </label>
            ))}
          </div>

          <select
            name="difficulty"
            value={difficulty}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Difficulty</option>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>

          <select
            name="questionCount"
            value={questionCount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Questions</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {submitting ? "Creating..." : "Create Assignment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;