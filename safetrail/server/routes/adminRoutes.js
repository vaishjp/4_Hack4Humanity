const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Report = require("../models/Report");
const auth = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
    res.json({ msg: "Admin API is working!" });
});

// ✅ Get all users (Only Admin can access)
router.get("/users", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access Denied" });
        }
        const users = await User.find().select("-password"); // Exclude password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
});

// ✅ Get all reports (Only Admin can access)
router.get("/reports", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access Denied" });
        }
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reports", error: err.message });
    }
});

module.exports = router;
