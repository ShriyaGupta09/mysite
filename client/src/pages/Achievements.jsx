import { useLocation } from 'react-router-dom';

function Achievements({ achievements, cp }) {
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      
      {/* --- SECTION 1: CODING PROFILES --- */}
      <section style={{ marginBottom: "60px" }}>
        <h2 className="section-title">💻 Coding Profiles</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px" 
        }}>
          {cp?.map((profile, index) => (
            <div key={index} className="card" style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "30px 20px",
              minHeight: "150px"
            }}>
              <h3 style={{color: "#2c3e50", margin: "0 0 10px 0"}}>{profile.platform}</h3>
              <p style={{fontWeight: "bold", color: "#3498db", margin: "0 0 10px 0"}}>{profile.handle || profile.username}</p>
              <span style={{background: "#ecf0f1", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem"}}>
                {profile.rating}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: ACHIEVEMENTS --- */}
      <section>
        <h2 className="section-title">🏆 Achievements</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {achievements && achievements.length > 0 ? (
            achievements.map((ach, index) => (
              <div key={index} className="card" style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "20px", 
                width: "100%", 
                padding: "20px",
                textAlign: "left"
              }}>
                <span style={{ fontSize: "1.5rem" }}>🏅</span>
                <div>
                  {/* SINCE 'ach' IS A STRING, JUST RENDER 'ach' DIRECTLY */}
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#2c3e50", fontWeight: "500" }}>
                    {typeof ach === 'string' ? ach : (ach.title || "Achievement")}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: "center", color: "#666"}}>No achievements found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Achievements;