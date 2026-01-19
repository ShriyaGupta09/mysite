import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // ✅ Added useLocation here

import Navbar from './Navbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import './App.css';

// --- 1. DEFINE THE HELPER COMPONENT HERE (OUTSIDE App) ---
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlights the card briefly so the user knows which one it is
        element.style.borderColor = "#3498db";
        setTimeout(() => element.style.borderColor = "#eee", 2000);
      }
    }
  }, [hash]); // Runs every time the hash changes

  return null;
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/profile')
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error("Error:", err));
  }, []);

  if (!data) return <h1>Loading Profile...</h1>;

  return (
    <BrowserRouter>
      {/* --- 2. USE THE HELPER COMPONENT HERE --- */}
      <ScrollToHash />
      
      {/* --- 3. CLEAN NAVBAR --- */}
      <Navbar data={data} />
      
      <Routes>
        <Route path="/" element={<Home profile={data} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/skills" element={<Skills skills={data.skills} />} />
        <Route path="/projects" element={<Projects projects={data.projects} />} />
        <Route path="/experience" element={<Experience work={data.work} />} />
        <Route path="/education" element={<Education education={data.education} />} />
        <Route path="/achievements" element={<Achievements achievements={data.achievements} cp={data.competitiveProgramming} />} />
        <Route path="/contact" element={<Contact email={data.email} socials={data.socials} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;