const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const verifyToken = require("../middleware/authMiddleware");

// ✅ Fetch all reports
router.get("/", async (req, res) => {
  try {
    console.log("📢 Fetching all reports...");
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Search for reports by name (case-insensitive)
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Please provide a name to search." });
    }

    console.log("🔍 Searching reports for:", name);
    const reports = await Report.find({ name: { $regex: new RegExp(name, "i") } });

    if (reports.length === 0) {
      return res.status(404).json({ message: "No reports found." });
    }

    res.json(reports);
  } catch (error) {
    console.error("❌ Search Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Submit a new report
router.post("/", async (req, res) => {
  try {
    console.log("🔍 Received report data:", req.body);
    const newReport = new Report(req.body);
    await newReport.save();
    console.log("✅ Report saved successfully!");
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving report:", error);
    res.status(500).json({ error: "Failed to submit report.", details: error.message });
  }
});


router.get("/", verifyToken, async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
