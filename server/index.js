require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // Your downloaded key

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
console.log("✅ Connected to Firebase Firestore");

const app = express();
app.use(express.json());
app.use(cors());

// GET Profile
app.get('/profile', async (req, res) => {
  try {
    const snapshot = await db.collection('profile').limit(1).get();
    if (snapshot.empty) return res.status(404).json({ message: "No profile found" });
    const profile = snapshot.docs[0].data();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH Endpoint
app.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const snapshot = await db.collection('profile').get();
    const results = snapshot.docs
      .map(doc => doc.data())
      .filter(p => 
        (p.skills?.some(cat => cat.list.some(skill => skill.toLowerCase().includes(q?.toLowerCase()))) ||
         p.projects?.some(proj => proj.title.toLowerCase().includes(q?.toLowerCase())))
      );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE / UPSERT Profile
app.put('/profile', async (req, res) => {
  try {
    const updatedData = req.body;
    const collectionRef = db.collection('profile');

    // Clear old profile (if exists)
    const snapshot = await collectionRef.get();
    snapshot.docs.forEach(doc => doc.ref.delete());

    // Create new
    await collectionRef.doc('mainProfile').set(seedData);
    res.json({ message: "Success", data: updatedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
const PORT = process.env.PORT || 5000;
app.get('/health', (req, res) => res.status(200).json({ status: "OK", message: "Server is healthy" }));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
