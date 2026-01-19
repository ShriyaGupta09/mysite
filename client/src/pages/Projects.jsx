import { useLocation } from 'react-router-dom';

function Projects({ projects }) {
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h2 className="section-title">🚀 My Projects</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
        {projects?.map((proj, index) => {
          
          // Check if Title OR Tech Stack matches
          const isMatch = query && (
             proj.title.toLowerCase().includes(query.toLowerCase()) || 
             proj.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()))
          );

          return (
            <div 
              key={index} 
              // --- THIS IS THE CRITICAL LINE FOR SCROLLING ---
              id={`proj-${index}`} 
              // -----------------------------------------------
              className="card" // Use the global card class for hover effects
              style={{
                background: "white",
                // ✅ GREEN BORDER if matched (Overriding default border)
                border: isMatch ? "4px solid #27ae60" : "1px solid #eee",
                display: "flex", 
                flexDirection: "column",
                overflow: "hidden",
                transition: "0.3s"
              }}
            >
              {/* Image */}
              {proj.image && (
                <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              )}

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>{proj.title}</h3>
                <p style={{ color: "#555", fontSize: "0.95rem", flex: 1 }}>{proj.description}</p>
                
                {/* Tech Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", margin: "15px 0" }}>
                  {proj.techStack.map((tech, i) => (
                    <span key={i} style={{ 
                      // Highlight tech stack text if it matches
                      background: (query && tech.toLowerCase().includes(query.toLowerCase())) ? "#f1c40f" : "#f0f2f5", 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      fontSize: "0.8rem", 
                      color: "#333" 
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "auto" }}>
                  {/* GitHub */}
                  {Array.isArray(proj.githubLink) ? (
                    proj.githubLink.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={btnStyle}>{link.label}</a>
                    ))
                  ) : (
                    proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" style={btnStyle}>GitHub</a>
                  )}

                  {/* Preview */}
                  {proj.preview && (
                    <a href={proj.preview} target="_blank" rel="noopener noreferrer"
                       style={{ ...btnStyle, background: "#27ae60" }}>
                       👀 Preview
                    </a>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const btnStyle = {
  textDecoration: "none",
  background: "#24292e",
  color: "white",
  padding: "8px 12px",
  borderRadius: "5px",
  fontSize: "0.85rem",
  fontWeight: "bold",
  whiteSpace: "nowrap"
};

export default Projects;