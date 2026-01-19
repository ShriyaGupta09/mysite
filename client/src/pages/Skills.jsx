import { useLocation } from 'react-router-dom';

function Skills({ skills }) {
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2c3e50" }}>🛠 Technical Skills</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {skills?.map((skillGroup, index) => {
          
          // Check if ANY skill in this list matches the search
          const hasMatch = query && skillGroup.list.some(s => s.toLowerCase().includes(query.toLowerCase()));

          return (
            <div key={index} style={{ 
              background: "white",
              padding: "20px", 
              borderRadius: "10px", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              // ✅ GREEN BORDER if category contains the searched skill
              border: hasMatch ? "4px solid #27ae60" : "1px solid #eee",
              transition: "0.3s"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#34495e", borderBottom: "2px solid #3498db", display: "inline-block", paddingBottom: "5px" }}>
                {skillGroup.category}
              </h3>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skillGroup.list.map((tech, i) => {
                  
                  // Check if THIS SPECIFIC skill matches
                  const isSkillMatch = query && tech.toLowerCase().includes(query.toLowerCase());

                  return (
                    <span key={i} style={{ 
                      // ✅ YELLOW HIGHLIGHT on the specific text
                      background: isSkillMatch ? "#f1c40f" : "#ecf0f1",
                      color: "#2c3e50", 
                      padding: "8px 15px", 
                      borderRadius: "20px", 
                      fontSize: "0.95rem",
                      fontWeight: "500",
                      transition: "0.3s"
                    }}>
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;