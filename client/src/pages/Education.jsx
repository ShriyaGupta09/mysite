import { useLocation } from 'react-router-dom';

function Education({ education }) {
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2c3e50" }}>🎓 Education</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {education?.map((edu, index) => {
          
          const isMatch = query && (
            edu.institution.toLowerCase().includes(query.toLowerCase()) || 
            edu.degree.toLowerCase().includes(query.toLowerCase())
          );

          return (
            <div key={index} className="card" id={`edu-${index}`} style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              borderLeft: "5px solid #3498db", // Normal blue accent
              // ✅ Green Outline if searched
              border: isMatch ? "4px solid #27ae60" : "1px solid #eee" 
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>{edu.degree}</h3>
              <p style={{ fontWeight: "bold", color: "#555" }}>{edu.institution}</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", color: "#7f8c8d" }}>
                <span>{edu.year}</span>
                {edu.score && <span>{edu.score}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Education;
