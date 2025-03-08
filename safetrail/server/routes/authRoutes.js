const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// 🔹 User Registration (For Admin to Create Law Enforcement Accounts)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, password });
    await user.save();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 🔹 User Login (Law Enforcement)
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
