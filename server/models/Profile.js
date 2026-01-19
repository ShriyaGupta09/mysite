const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  education: [{ degree: String, institution: String, year: String, score: String }],
  work: [{ role: String, company: String, duration: String, description: String }],
  skills: [{ category: String, list: [String] }],
  projects: [{ 
    title: String, 
    description: String, 
    techStack: [String],
    githubLink: mongoose.Schema.Types.Mixed,
    Preview: String,
    image: String
  }],
  achievements: [String],
  competitiveProgramming: [{ platform: String, username: String, rating: String, link: String }],
  socials: { github: String, linkedin: String, twitter: String }
});

module.exports = mongoose.model('Profile', ProfileSchema);