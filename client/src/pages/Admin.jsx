import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null); // The full portfolio data
  const [activeTab, setActiveTab] = useState("projects"); // Which section are we editing?
  const navigate = useNavigate();

  // --- 1. Fetch Data ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:5000/profile") // Make sure this matches your backend URL
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  // --- 2. Login ---
  const handleLogin = () => {
    if (password === "admin123") setIsAuthenticated(true);
    else alert("❌ Wrong Password");
  };

  // --- 3. Save to Database ---
  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/profile", data);
      alert("✅ Saved Successfully!");
    } catch (err) {
      alert("❌ Save Failed");
      console.error(err);
    }
  };

  // --- 4. Helper: Handle Input Changes ---
  const handleChange = (section, index, field, value) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
  };

  // --- 5. Helper: Delete Item ---
  const handleDelete = (section, index) => {
    if(!window.confirm("Are you sure?")) return;
    const newData = { ...data };
    newData[section].splice(index, 1);
    setData(newData);
  };

  // --- 6. Helper: Add New Item ---
  const handleAdd = (section) => {
    const newData = { ...data };
    // Templates for empty items
    const templates = {
      projects: { title: "New Project", description: "Desc...", techStack: [], githubLink: "", preview: "" },
      work: { company: "New Company", role: "Role", duration: "2024", description: "..." },
      education: { institution: "College", degree: "Degree", year: "2024", score: "9.0" },
      achievements: "New Achievement String"
    };
    
    // Special case for 'achievements' which is just an array of strings, not objects
    if (section === 'achievements') {
        newData.achievements.push("New Achievement");
    } else {
        newData[section].push(templates[section]);
    }
    setData(newData);
  };

  if (!isAuthenticated) return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔒 Admin Login</h2>
      <input type="password" placeholder="PIN" value={password} onChange={e=>setPassword(e.target.value)} style={{padding: "10px"}} />
      <button onClick={handleLogin} style={{padding: "10px 20px", marginLeft: "10px", background: "#3498db", color:"white", border:"none"}}>Login</button>
    </div>
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* --- SIDEBAR --- */}
      <div style={{ width: "250px", background: "#2c3e50", color: "white", padding: "20px" }}>
        <h3>⚙️ Dashboard</h3>
        <button style={tabStyle(activeTab === "projects")} onClick={() => setActiveTab("projects")}>🚀 Projects</button>
        <button style={tabStyle(activeTab === "work")} onClick={() => setActiveTab("work")}>💼 Experience</button>
        <button style={tabStyle(activeTab === "education")} onClick={() => setActiveTab("education")}>🎓 Education</button>
        <button style={tabStyle(activeTab === "achievements")} onClick={() => setActiveTab("achievements")}>🏆 Awards</button>
        <hr style={{ borderColor: "#7f8c8d", margin: "20px 0" }} />
        <button onClick={handleSave} style={{ ...btnBase, background: "#27ae60", width: "100%" }}>💾 SAVE ALL</button>
        <button onClick={() => navigate("/")} style={{ ...btnBase, background: "#e74c3c", width: "100%", marginTop: "10px" }}>Exit</button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto", background: "#ecf0f1" }}>
        
        {/* PROJECTS EDITOR */}
        {activeTab === "projects" && (
          <div>
            <h2>Manage Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} style={cardStyle}>
                <input style={inputStyle} value={proj.title} onChange={(e) => handleChange("projects", i, "title", e.target.value)} placeholder="Title" />
                <textarea style={{...inputStyle, height: "60px"}} value={proj.description} onChange={(e) => handleChange("projects", i, "description", e.target.value)} placeholder="Description" />
                <input style={inputStyle} value={proj.githubLink} onChange={(e) => handleChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub Link" />
                <button onClick={() => handleDelete("projects", i)} style={deleteBtn}>🗑 Remove</button>
              </div>
            ))}
            <button onClick={() => handleAdd("projects")} style={addBtn}>+ Add Project</button>
          </div>
        )}

        {/* EXPERIENCE EDITOR */}
        {activeTab === "work" && (
          <div>
            <h2>Manage Experience</h2>
            {data.work.map((job, i) => (
              <div key={i} style={cardStyle}>
                <input style={inputStyle} value={job.company} onChange={(e) => handleChange("work", i, "company", e.target.value)} placeholder="Company" />
                <input style={inputStyle} value={job.role} onChange={(e) => handleChange("work", i, "role", e.target.value)} placeholder="Role" />
                <input style={inputStyle} value={job.duration} onChange={(e) => handleChange("work", i, "duration", e.target.value)} placeholder="Duration" />
                <textarea style={{...inputStyle, height: "60px"}} value={job.description} onChange={(e) => handleChange("work", i, "description", e.target.value)} placeholder="Description" />
                <button onClick={() => handleDelete("work", i)} style={deleteBtn}>🗑 Remove</button>
              </div>
            ))}
            <button onClick={() => handleAdd("work")} style={addBtn}>+ Add Job</button>
          </div>
        )}

        {/* EDUCATION EDITOR */}
        {activeTab === "education" && (
            <div>
            <h2>Manage Education</h2>
            {data.education.map((edu, i) => (
                <div key={i} style={cardStyle}>
                <input style={inputStyle} value={edu.institution} onChange={(e) => handleChange("education", i, "institution", e.target.value)} placeholder="School/College" />
                <input style={inputStyle} value={edu.degree} onChange={(e) => handleChange("education", i, "degree", e.target.value)} placeholder="Degree" />
                <button onClick={() => handleDelete("education", i)} style={deleteBtn}>🗑 Remove</button>
                </div>
            ))}
            <button onClick={() => handleAdd("education")} style={addBtn}>+ Add Education</button>
            </div>
        )}

        {/* AWARDS EDITOR (Simple List) */}
        {activeTab === "achievements" && (
            <div>
            <h2>Manage Achievements</h2>
            {data.achievements.map((ach, i) => (
                <div key={i} style={{...cardStyle, display: 'flex', gap: '10px'}}>
                <input 
                    style={{...inputStyle, flex: 1}} 
                    value={ach} 
                    onChange={(e) => {
                        const newData = {...data};
                        newData.achievements[i] = e.target.value;
                        setData(newData);
                    }} 
                />
                <button onClick={() => handleDelete("achievements", i)} style={deleteBtn}>🗑</button>
                </div>
            ))}
            <button onClick={() => handleAdd("achievements")} style={addBtn}>+ Add Award</button>
            </div>
        )}

      </div>
    </div>
  );
}

// --- STYLES ---
const tabStyle = (isActive) => ({
  display: "block",
  width: "100%",
  padding: "15px",
  background: isActive ? "#34495e" : "transparent",
  color: "white",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "1.1rem"
});

const cardStyle = {
  background: "white",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "1rem"
};

const btnBase = { padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", color: "white", fontWeight: "bold" };
const deleteBtn = { ...btnBase, background: "#e74c3c", width: "100px", alignSelf: "flex-end" };
const addBtn = { ...btnBase, background: "#3498db", width: "100%", marginTop: "20px" };

export default Admin;