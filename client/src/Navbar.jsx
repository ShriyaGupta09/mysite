import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ data }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    
    const term = search.toLowerCase();

    // 1. SKILLS
    const hasSkill = data.skills?.some(category => 
      category.list.some(skill => skill.toLowerCase().includes(term))
    );
    if (hasSkill) {
      navigate(`/skills?q=${search}`);
      setSearch("");
      return;
    }

    // 2. PROJECTS
    const hasProject = data.projects?.some(p => 
      p.title.toLowerCase().includes(term) || 
      p.techStack.some(tech => tech.toLowerCase().includes(term))
    );
    if (hasProject) {
      navigate(`/projects?q=${search}`);
      setSearch("");
      return;
    }

    // 3. EXPERIENCE
    const hasWork = data.work?.some(w => 
      w.company.toLowerCase().includes(term) || 
      w.role.toLowerCase().includes(term)
    );
    if (hasWork) {
      navigate(`/experience?q=${search}`);
      setSearch("");
      return;
    }

    // 4. EDUCATION
    const hasEducation = data.education?.some(edu => 
      edu.degree.toLowerCase().includes(term) || 
      edu.institution.toLowerCase().includes(term)
    );
    if (hasEducation) {
      navigate(`/education?q=${search}`);
      setSearch("");
      return;
    }

    // 5. ACHIEVEMENTS (Text Awards)
    const hasAchievement = data.achievements?.some(ach => 
      ach.toLowerCase().includes(term)
    );
    if (hasAchievement) {
      navigate(`/achievements?q=${search}`);
      setSearch("");
      return;
    }

    // ✅ 6. CODING PROFILES (NEW ADDITION)
    // Checks Platform (LeetCode) or Username (DevilishAxis)
    const hasCP = data.competitiveProgramming?.some(cp => 
      cp.platform.toLowerCase().includes(term) || 
      cp.username.toLowerCase().includes(term)
    );
    if (hasCP) {
      navigate(`/achievements?q=${search}`); // Send to same page as Achievements
      setSearch("");
      return;
    }

    // 7. CONTACT
    if (data.socials) {
      const isContactMatch = Object.values(data.socials).some(val => 
        val && val.toLowerCase().includes(term)
      );
      if (isContactMatch || ["contact", "email", "mail"].some(k => k.includes(term))) {
        navigate(`/contact?q=${search}`);
        setSearch("");
        return;
      }
    }

    alert(`No results found for "${search}"`);
  };

  return (
    <nav className="navbar-fixed">
      <div className="navbar-inner">
      {/* 1. Logo */}
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.3rem" }}>
         {data?.name || "Portfolio"}
      </Link>

      {/* 2. Links */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <Link to="/experience" style={linkStyle}>Experience</Link>
        <Link to="/education" style={linkStyle}>Education</Link>
        <Link to="/projects" style={linkStyle}>Projects</Link>
        <Link to="/skills" style={linkStyle}>Skills</Link>
        <Link to="/achievements" style={linkStyle}>Awards</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/admin" style={{ ...linkStyle, color: "#e74c3c", fontWeight: "bold" }}>👤Admin</Link>
      </div>

      {/* 3. Global Search Bar */}
      <form onSubmit={handleSearch} style={{ display: "flex" }}>
        <input 
          type="text" 
          placeholder="🔍 Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "5px 0 0 5px", border: "none", outline: "none" }}
        />
        <button type="submit" style={{ padding: "8px 15px", cursor: "pointer", background: "#3498db", color: "white", border: "none", borderRadius: "0 5px 5px 0", fontWeight: "bold" }}>
          Go
        </button>
      </form>
      </div>
    </nav>
  );
}

const linkStyle = { color: "#ecf0f1", textDecoration: "none", fontSize: "1rem", fontWeight: "500", transition: "color 0.2s" };

export default Navbar;