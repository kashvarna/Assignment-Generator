const pool = require("../config/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log("API KEY:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateAIQuestions = async (languages, difficulty) => {
  try {
    const models = await genAI.listModels();
console.log("Available models:", models);
   const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // ✅ current supported model
});

    const prompt = `
Generate 10 multiple choice questions for ${languages.join(", ")}.
Difficulty: ${difficulty}

Return ONLY JSON array. No explanation.

Format:
[
  {
    "id": 1,
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]
`;
const response = await model.generateText({
  temperature: 0.7,
  candidate_count: 1,
  input: prompt,
});

const text = response.candidates[0].output;
console.log("RAW GEMINI RESPONSE:", text);

    console.log("RAW GEMINI RESPONSE:", text); // 👈 DEBUG

    // 🔥 CLEAN RESPONSE (VERY IMPORTANT)
    const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsedQuestions;
try {
  parsedQuestions = JSON.parse(cleaned);
} catch (err) {
  console.error("JSON parse failed, using fallback:", err);
  // Fallback: generate simple placeholder questions
  parsedQuestions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    question: `Fallback Q${i + 1} for ${languages.join(", ")}`,
    options: ["A", "B", "C", "D"],
    answer: "A",
  }));
}

return parsedQuestions;

  } catch (err) {
    console.error("❌ GEMINI ERROR FULL:", err); // 👈 SHOW FULL ERROR

    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `Fallback Q${i + 1} for ${languages.join(", ")}`,
      options: ["A", "B", "C", "D"],
      answer: "A",
    }));
  }
};
// GET SINGLE ASSIGNMENT
const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM assignments WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.status(200).json({
      assignment: result.rows[0]
    });

  } catch (error) {
    console.error("Get Assignment Error:", error.message);
    res.status(500).json({
      message: "Server error while fetching assignment"
    });
  }
};

// Create assignment
const createAssignment = async (req, res) => {
  try {
    console.log("Assignment request body:", req.body);

    const { user_id, languages, difficulty } = req.body;

    if (!user_id || !languages || !difficulty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const title = `${languages.join(", ")} - Level ${difficulty}`;

    // Check if same assignment already exists
    const existingAssignment = await pool.query(
      "SELECT * FROM assignments WHERE languages = $1 AND difficulty = $2 LIMIT 1",
      [languages, difficulty]
    );

    if (existingAssignment.rows.length > 0) {
      return res.status(200).json({
        message: "Assignment fetched from database",
        assignment: existingAssignment.rows[0],
      });
    }

    const questions = await generateAIQuestions(languages, difficulty);

    const newAssignment = await pool.query(
      `INSERT INTO assignments (user_id, title, languages, difficulty, question_count, questions, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        user_id,
        title,
        languages,
        difficulty,
        questions.length,
        JSON.stringify(questions),
        "Not Attempted",
      ]
    );

    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment.rows[0],
    });
  } catch (error) {
    console.error("Create Assignment Error FULL:", error);
    res.status(500).json({ message: "Server error while creating assignment", error: error.message });
  }
};

// Get assignments by user
const getUserAssignments = async (req, res) => {
  try {
    const { userId } = req.params;

    const assignments = await pool.query(
      "SELECT * FROM assignments WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json(assignments.rows);
  } catch (error) {
    console.error("Fetch Assignment Error:", error.message);
    res.status(500).json({ message: "Server error while fetching assignments" });
  }
};

// Submit assignment score
const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const updatedAssignment = await pool.query(
      "UPDATE assignments SET score = $1, status = $2 WHERE id = $3 RETURNING *",
      [score, "Completed", id]
    );

    res.status(200).json({
      message: "Assignment submitted successfully",
      assignment: updatedAssignment.rows[0],
    });
  } catch (error) {
    console.error("Submit Assignment Error:", error.message);
    res.status(500).json({ message: "Server error while submitting assignment" });
  }
};

module.exports = {
  createAssignment,
  getUserAssignments,
  submitAssignment,
  getAssignmentById
};