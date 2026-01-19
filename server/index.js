// sde/server/index.js
require('dotenv').config(); // MUST BE AT THE VERY TOP

const dbURI = process.env.MONGO_URI; 
if (dbURI) {
    console.log("✅ MONGO_URI is loaded (starts with:", dbURI.substring(0, 10) + "...)");
} else {
    console.log("❌ Error: MONGO_URI is not defined in .env file");
}
console.log("⏳ Starting server script...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import the Profile model
const Profile = require('./models/Profile');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// 1. GET Endpoint: Fetch Profile Data
app.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne(); // Get the first profile
    if (!profile) return res.status(404).json({ message: "No profile found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. SEARCH Endpoint: Simple filter
app.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    // Find a profile where skills OR projects match the query
    const results = await Profile.find({
      $or: [
        { skills: { $regex: q, $options: "i" } },
        { "projects.title": { $regex: q, $options: "i" } }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});
app.put('/profile', async (req, res) => {
  try {
    const updatedData = req.body;
    
    // Find the existing profile and update it
    // (We use a dummy filter {} because there is only one profile)
    const result = await Profile.findOneAndUpdate({}, updatedData, { new: true, upsert: true });
    
    res.json({ message: "Success", data: result });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ error: "Could not save data" });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});