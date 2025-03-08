const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Connect to MongoDB (if not already connected)
if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("✅ Connected to MongoDB"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

// ✅ Define MongoDB Schema for Regular Tweets
const tweetSchema = new mongoose.Schema({
    tweet_id: String,
    text: String,
    timestamp: String,
    author_id: String
});

const flaggedTweetSchema = new mongoose.Schema({
    tweet_id: String,
    text: String,
    timestamp: Date,
    author_id: String,
    persons: [String],   // Names of detected people
    locations: [String]  // Detected locations
});

const Tweet = mongoose.model("Tweet", tweetSchema);
const FlaggedTweet = mongoose.model("FlaggedTweet", flaggedTweetSchema);

// ✅ API Route to Fetch Regular Tweets
router.get("/", async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ timestamp: -1 }).limit(10);
        res.json(tweets);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ API Route to Fetch Flagged Tweets (NEW)
router.get("/flagged", async (req, res) => {
    try {
        const tweets = await FlaggedTweet.find().sort({ timestamp: -1 }).limit(10);
        res.json(tweets);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;