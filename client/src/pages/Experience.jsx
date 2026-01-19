import { useLocation } from 'react-router-dom';

function Experience({ work }) {
  // 1. Get the search term from URL (e.g., ?q=Cisco)
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2c3e50" }}>💼 Work Experience</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {work?.map((job, index) => {
          
          // 2. Check for Match
          const isMatch = query && (
            job.company.toLowerCase().includes(query.toLowerCase()) || 
            job.role.toLowerCase().includes(query.toLowerCase())
          );

          return (
            <div key={index} className="card" id={`work-${index}`} style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              // 3. Apply GREEN BORDER if matched
              border: isMatch ? "4px solid #27ae60" : "1px solid #eee", 
              transition: "0.3s"
            }}>
              <h3 style={{ color: "#2980b9", margin: "0 0 5px 0" }}>{job.role}</h3>
              <h4 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>@ {job.company}</h4>
              <p style={{ fontStyle: "italic", color: "#7f8c8d", marginBottom: "15px" }}>{job.duration}</p>
              <p style={{ lineHeight: "1.6", color: "#555" }}>{job.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experience;