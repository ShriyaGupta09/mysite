import { Link } from 'react-router-dom';

function Home({ profile }) {
  if (!profile) return <div className="container" style={{textAlign: "center", marginTop: "50px"}}><h1>Loading Profile...</h1></div>;

  return (
    <div className="container"> {/* CSS handles width now */}
      
      {/* --- 1. HERO SECTION --- */}
      <div style={{ textAlign: "center", padding: "80px 0 60px" }}>
        <h1 style={{ fontSize: "3.5rem", color: "#2c3e50", marginBottom: "10px" }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: "1.5rem", color: "#7f8c8d", fontWeight: "300" }}>
          {profile.title || "Full Stack Developer"}
        </p>
        
        <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link to="/contact" className="btn-primary">Contact Me</Link>
          <a href={profile.socials?.github} target="_blank" rel="noreferrer" 
             style={{...btnOutline, marginLeft: "10px"}}>
             GitHub
          </a>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "40px 0" }} />

      {/* --- 2. EXPERIENCE SECTION --- */}
      {profile.work && profile.work.length > 0 && (
        <section style={{ marginBottom: "60px" }}>
          <h2 className="section-title">Experience</h2>
          <div style={gridStyle}>
            {profile.work.map((job, index) => (
              // CLICKABLE CARD: Links to /experience#work-0, #work-1, etc.
              <Link 
                to={`/experience#work-${index}`} 
                key={index} 
                className="card"
                style={{ textDecoration: "none", display: "block", color: "inherit" }}
              >
                <h3 style={{ color: "#2c3e50" }}>{job.role}</h3>
                <h4 style={{ color: "#3498db", fontSize: "1.1rem" }}>{job.company}</h4>
                <p style={{ fontStyle: "italic", color: "#95a5a6", fontSize: "0.9rem", marginBottom: "10px" }}>
                  {job.duration}
                </p>
                <p style={{ color: "#555" }}>{job.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- 3. PROJECTS SECTION --- */}
      {profile.projects && profile.projects.length > 0 && (
        <section style={{ marginBottom: "60px" }}>
          <h2 className="section-title">Featured Projects</h2>
          <div style={gridStyle}>
            {profile.projects.map((proj, index) => (
              // CLICKABLE CARD: Links to /projects#proj-0, #proj-1
              <Link 
                to={`/projects#proj-${index}`} 
                key={index} 
                className="card"
                style={{ textDecoration: "none", display: "block", color: "inherit" }}
              >
                <h3 style={{ marginBottom: "5px" }}>{proj.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "#666", marginBottom: "15px" }}>
                  {proj.description.substring(0, 100)}...
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {proj.techStack?.map((tech, i) => (
                    <span key={i} style={tagStyle}>{tech}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
             <Link to="/projects" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>
                View All Projects →
             </Link>
          </div>
        </section>
      )}

      {/* --- 4. EDUCATION SECTION --- */}
      {profile.education && profile.education.length > 0 && (
        <section>
          <h2 className="section-title">Education</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {profile.education.map((edu, index) => (
              // CLICKABLE CARD: Links to /education#edu-0
              <Link 
                to={`/education#edu-${index}`}
                key={index} 
                className="card" 
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <h3 style={{ fontSize: "1.2rem" }}>{edu.institution}</h3>
                  <p style={{ color: "#7f8c8d" }}>{edu.degree}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: "#ecf0f1", padding: "5px 10px", borderRadius: "15px", fontSize: "0.85rem", fontWeight: "bold" }}>
                    {edu.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

// Styles
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
  gap: "20px"
};

const btnOutline = {
  padding: "10px 20px",
  border: "2px solid #2c3e50",
  color: "#2c3e50",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "600",
  transition: "0.3s"
};

const tagStyle = {
  background: "#eef2f3",
  color: "#2c3e50",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "0.8rem",
  fontWeight: "500"
};

export default Home;