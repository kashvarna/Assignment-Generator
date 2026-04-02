import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const TakeAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/assignments/${id}`
      );

      const data = res.data.assignment;

    

const questions =
  typeof data.questions === "string"
    ? JSON.parse(data.questions)
    : data.questions;

setAssignment({
  ...data,
  questions,
});

      setAssignment({
        ...data,
        questions,
      });

    } catch (err) {
      console.log("FETCH ERROR:", err);
      toast.error("Failed to load assignment");
    }
  };

  const handleOptionChange = (qid, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qid]: option,
    });
  };

  const handleSubmit = async () => {
    if (!assignment) return;

    let score = 0;

    assignment.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });

    const percentage = (
      (score / assignment.questions.length) *
      100
    ).toFixed(0);

    try {
      await axios.put(
        `http://localhost:5000/api/assignments/submit/${assignment.id}`,
        { score: Number(percentage) }
      );

      toast.success(`Score: ${percentage}%`);
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Submit failed");
    }
  };

  if (!assignment) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>

      {assignment.questions.map((q, index) => (
        <div key={q.id} className="mb-6 p-4 border rounded">
          <h3>
            Q{index + 1}. {q.question}
          </h3>

          {q.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`q-${q.id}`}
                onChange={() =>
                  handleOptionChange(q.id, opt)
                }
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default TakeAssignment;