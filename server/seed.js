require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = db; // export DB for server


// Seed Data
const seedData = {
  name: "Shriya Gupta",
  title: "Full Stack Developer & CP Enthusiast",
  email: "9shriyag@gmail.com",
  education: [
    { degree: "B.Tech in Civil Engineering", institution: "NIT Delhi", year: "2023-2027", score: "CGPA: 7.26" },
    { degree: "Minor in Artificial Intelligence & Data Science", institution: "NIT Delhi", year: "2025-2027"}
  ],
  work: [
    { 
      role: "Campus Ambassador", 
      company: "Cisco", 
      duration: "Oct 2024 - Oct 2025", 
      description: "Spearheaded campus engagement initiatives by organizing technical workshops for 200+ students, bridging the gap between industry and academia." 
    }
  ],
  skills: [
    { category: "Languages", list: ["C", "C++", "Python", "Java"] },
    { category: "Web & Framework", list: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose", "Bootstrap", "PostgreSQL", "NoSQL"] },
    { category: "Concepts", list: ["Data Structures & Algorithms", "Competitive Programming", "Problem Solving", "Object Oriented Programming", "Database Management System"] },
    { category: "AI & ML", list: ["Machine Learning", "Deep Learning", "Reinforcement Learning", "Generative AI", "Data Analysis", "Scikit-learn", "Jupyter Notebook", "OpenAI API", "Pandas"] },
    { category: "Tools", list: ["Pygame", "Raylib", "Git", "GitHub", "UI/UX Design"] }
  ],
  projects: [
    { 
      title: "SocioGen – Social Media Content Generator", 
      description: "Developed an intelligent social media content generator using Next.js and OpenAI's GPT models. The tool automates caption writing, hashtag generation, and sentiment analysis, reducing content creation time by 40%.", 
      techStack: ["Next.js", "React.js", "OpenAI API", "Tailwind CSS"],
      githubLink: "https://github.com/ShriyaGupta09/SocioGen",
      preview: "https://drive.google.com/drive/u/2/folders/1aPu9-loPmC8VDS6F1HtvL_juYFNUrc3Q",
      image: "https://placehold.co/600x400/2c3e50/white?text=SocioGen+UI"
    },
    { 
      title: "PacMan & Tetris Game – Arcade Engine in Python", 
      description: "Built a custom arcade game engine from scratch using Python. Implemented the A* Pathfinding algorithm for intelligent ghost behavior and optimized collision detection mechanics for smooth 60 FPS rendering.", 
      techStack: ["Python", "PyGame", "Algorithms", "AI Pathfinding"],
      githubLink: [
        { label: "PacMan Code", url: "https://github.com/ShriyaGupta09/PacMan" },
        { label: "Tetris Code", url: "https://github.com/ShriyaGupta09/Tetris" }
      ],
      preview: "https://drive.google.com/drive/u/2/folders/1aPu9-loPmC8VDS6F1HtvL_juYFNUrc3Q", 
      image: "https://placehold.co/600x400/2c3e50/white?text=Arcade+Engine+UI"
    }
  ],
  achievements: [
    "Winner of Smart India Hackathon 2024",
    "Top 50 in Global Coding Challenge",
    "Selected as a Frontend Developer Intern at VRV Technologies",
    "Active contributor to the Linux Development Program under Meshery open-source project",
    "Achieved Global Rank 500 in CodeChef Starters 210 out of 2,47,000+ participants",
    "Secured Rank 953 in Codeforces Round 1062 out of 50,000+ participants",
    "Active participant in Google Cloud Arcade Program",
    "Published 100+ solutions on various coding platforms to support tech learners"
  ],
  competitiveProgramming: [
    { platform: "LeetCode", username: "DevilishAxis09", rating: "Max Rating: 1850 (Knight)", link: "https://leetcode.com/DevilishAxis09/" },
    { platform: "CodeForces", username: "DevilishAxis", rating: "Specialist (1413)", link: "https://codeforces.com/profile/DevilishAxis" },
    { platform: "CodeChef", username: "DevilishAxis", rating: "1456", link: "https://www.codechef.com/users/DevilishAxis" },
    { platform: "GeeksForGeeks", username: "passionate24ee", rating: "Institute Rank - 13", link: "https://auth.geeksforgeeks.org/user/passionate24ee/" },
    { platform: "Codolio", username: "passionate917", rating: "Institute Rank - 3 | Problems Solved - 1450+", link: "https://codolio.com/profile/passionate917" }
  ],
  socials: {
    github: "https://github.com/ShriyaGupta09",
    linkedin: "https://www.linkedin.com/in/shriya-gupta-3b3853307/",
    email: "9shriyag@gmail.com"
  }
};

// Seed function
const seedDB = async () => {
  try {
    const collectionRef = db.collection('profiles');

    await collectionRef.doc('mainProfile').delete().catch(() => {});
    await collectionRef.doc('mainProfile').set(seedData);

    console.log("✅ Database Seeded successfully!");
    process.exit(0); // exit after seeding
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

// Run seed only if this file is executed directly
if (require.main === module) {
  seedDB();
}
