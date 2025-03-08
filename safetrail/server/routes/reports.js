const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const Report = require("../models/Report");
const auth = require("../middleware/authMiddleware");


// Route to get count of missing children reports
router.get("/search", async (req, res) => {
    try {
        const query = req.query.name || "";
        const reports = await Report.find({ name: { $regex: query, $options: "i" } }); // Case-insensitive search
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        if (req.user.role !== "law_enforcement" && req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access Denied" });
        }

        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
