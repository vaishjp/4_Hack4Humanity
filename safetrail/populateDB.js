const mongoose = require("mongoose");
const Report = require("./server/models/Report.js"); // Ensure you have this model

// Your MongoDB Atlas connection string
const MONGO_URI = "mongodb+srv://acmw_2025:acmw2025@hack4humanity.u4j0c.mongodb.net/?retryWrites=true&w=majority&appName=hack4humanity";

// Replace <username> and <password> with actual values

// List of missing girls to insert into the database
const reports = [
  {
    name: "Aaradhya Kapoor",
    age: 6,
    description: "Wearing a yellow frock with white shoes",
    lastSeenLocation: "Central Park, Mumbai",
    missingSince: new Date("2025-03-01T11:00:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Suman Kapoor",
    contactInfo: "a4b8f2d7e9c1g6h3k5m7p0q2s9t8v4w",
    reportedAt: new Date("2025-03-06T10:00:00.000Z")
  },
  {
    name: "Sanya Verma",
    age: 5,
    description: "Pink dress, short hair, carrying a teddy bear",
    lastSeenLocation: "School Playground, Delhi",
    missingSince: new Date("2025-02-25T08:30:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Neha Verma",
    contactInfo: "x3z6y9w2v8u5t1s7r0q4p3n6m5k2j8h",
    reportedAt: new Date("2025-03-06T10:30:00.000Z")
  },
  {
    name: "Ishita Malhotra",
    age: 9,
    description: "Black t-shirt, blue jeans, ponytail",
    lastSeenLocation: "Mall near Sector 18, Noida",
    missingSince: new Date("2025-02-28T15:45:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Pooja Malhotra",
    contactInfo: "d7e2f8g4h1j5k9m3n0p6q7r2t8v5w4y",
    reportedAt: new Date("2025-03-06T11:10:00.000Z")
  },
  {
    name: "Ananya Singh",
    age: 6,
    description: "Red top, carrying a small school bag",
    lastSeenLocation: "Bus Stand, Lucknow",
    missingSince: new Date("2025-03-02T07:15:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Ravi Singh",
    contactInfo: "m5p9q7r0s4t1u8v2w6x3y8z5d7e2f1g",
    reportedAt: new Date("2025-03-06T11:30:00.000Z")
  },
  {
    name: "Kavya Menon",
    age: 8,
    description: "Wearing a floral dress, long curly hair",
    lastSeenLocation: "Near beach, Chennai",
    missingSince: new Date("2025-03-04T18:00:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Anjali Menon",
    contactInfo: "j1k5m9n3p7q2r0s4t8v6w5x3y9z8d2f",
    reportedAt: new Date("2025-03-06T12:00:00.000Z")
  },
  {
    name: "Diya Reddy",
    age: 7,
    description: "Wearing blue shorts and a white t-shirt",
    lastSeenLocation: "Outside apartment complex, Hyderabad",
    missingSince: new Date("2025-03-03T14:20:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Rajesh Reddy",
    contactInfo: "f2g7h1j9k5m3n0p4q8r6t7v2w5x9y8z",
    reportedAt: new Date("2025-03-06T12:20:00.000Z")
  },
  {
    name: "Meera Choudhary",
    age: 4,
    description: "Wearing a white frock with pink sandals",
    lastSeenLocation: "Temple entrance, Jaipur",
    missingSince: new Date("2025-03-05T09:00:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Manisha Choudhary",
    contactInfo: "s4t8v2w6x3y9z7d5e1f8g0h2j9k7m3p",
    reportedAt: new Date("2025-03-06T13:00:00.000Z")
  },
  {
    name: "Isha Bose",
    age: 10,
    description: "School uniform, black shoes, carrying a red backpack",
    lastSeenLocation: "Near railway station, Kolkata",
    missingSince: new Date("2025-02-28T07:50:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Arjun Bose",
    contactInfo: "q7r0s4t9u1v6w3x8y5z2d8e5f1g9h7k",
    reportedAt: new Date("2025-03-06T13:30:00.000Z")
  },
  {
    name: "Pihu Sharma",
    age: 5,
    description: "Yellow skirt, blue top, carrying a doll",
    lastSeenLocation: "Fairground, Patna",
    missingSince: new Date("2025-03-06T16:00:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Sunita Sharma",
    contactInfo: "p3q7r9s0t2u5v8w4x6y1z8d5e9f2g7h",
    reportedAt: new Date("2025-03-06T14:00:00.000Z")
  },
  {
    name: "Jhanvi Rathore",
    age: 6,
    description: "Red and white school dress, black shoes",
    lastSeenLocation: "Near grocery store, Bhopal",
    missingSince: new Date("2025-03-01T08:10:00.000Z"),
    photoUrl: "",
    status: "Missing",
    reportedBy: "Prakash Rathore",
    contactInfo: "k5m9n3p7q1r0s4t8v2w6x9y5z8d7e2f",
    reportedAt: new Date("2025-03-06T14:30:00.000Z")
  }
];

// Connect to MongoDB and insert the reports
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing records (optional)
    await Report.deleteMany({}); // This will delete all existing reports before adding new ones

    // Insert new data
    await Report.insertMany(reports);
    console.log("Reports inserted successfully");

    mongoose.connection.close();
  })
  .catch(err => console.error("Error:", err));
