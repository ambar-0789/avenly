import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/avenly_db";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

function getDB() {
  return mongoose.connection.db;
}

/* -------------------- SIGNUP ROUTE -------------------- */
app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const db = getDB();

    const result = await db.collection("users").insertOne(userData);

    res.status(201).json({
      message: "User saved successfully",
      result,
    });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({
      message: "Error saving user",
    });
  }
});

/* -------------------- STUDENT PROFILE ROUTE -------------------- */
app.post("/student-profile", async (req, res) => {
  try {
    const studentData = req.body;
    const db = getDB();

    const result = await db.collection("student_profiles").insertOne(studentData);

    res.status(201).json({
      message: "Student profile saved successfully",
      result,
    });
  } catch (error) {
    console.log("Student profile error:", error);
    res.status(500).json({
      message: "Error saving student profile",
    });
  }
});

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});