const express = require("express");
const pool = require("../config/db"); 
const router = express.Router();

const {
  createAssignment,
  getUserAssignments,
  submitAssignment,
  getAssignmentById
} = require("../controllers/assignmentController");

// CREATE
router.post("/create", createAssignment);

// ✅ THIS WAS MISSING (IMPORTANT)
// GET assignments for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const assignments = await pool.query(
      "SELECT * FROM assignments WHERE user_id = $1 ORDER BY created_at DESC",
      [req.params.userId]
    );

    res.json(assignments.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET SINGLE
router.get("/:id", getAssignmentById);

// SUBMIT
router.put("/submit/:id", submitAssignment);

module.exports = router;