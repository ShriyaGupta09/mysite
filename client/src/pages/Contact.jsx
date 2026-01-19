import { useLocation } from 'react-router-dom';

function Contact({ email, socials }) {
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  // Helper to check if a specific button should highlight (from search)
  const checkHighlight = (text) => {
    return query && text.toLowerCase().includes(query.toLowerCase());
  };

  return (
    <div style={{ 
      padding: "60px 20px", 
      maxWidth: "800px", 
      margin: "0 auto", 
      textAlign: "center" 
    }}>
      
      <h2 style={{ color: "#2c3e50", marginBottom: "10px", fontSize: "2.5rem" }}>
        📬 Get In Touch
      </h2>
      <p style={{ color: "#7f8c8d", marginBottom: "50px", fontSize: "1.1rem" }}>
        I am currently open to work! Feel free to reach out.
      </p>

      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        alignItems: "center" 
      }}>

        {/* 1. EMAIL BUTTON */}
        {(email || socials?.email) && (
          <a 
            href={`mailto:${email || socials?.email}`}
            style={{
              ...btnBase,
              background: "#e74c3c", // Red for Email
              border: checkHighlight("email") ? "5px solid #27ae60" : "none"
            }}
          >
            📧 Send an Email
          </a>
        )}

        {/* 2. LINKEDIN BUTTON */}
        {socials?.linkedin && (
          <a 
            href={socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              ...btnBase,
              background: "#0077b5", // LinkedIn Blue
              border: checkHighlight("linkedin") ? "5px solid #27ae60" : "none"
            }}
          >
            👔 Connect on LinkedIn
          </a>
        )}

        {/* 3. GITHUB BUTTON */}
        {socials?.github && (
          <a 
            href={socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              ...btnBase,
              background: "#333", // GitHub Black
              border: checkHighlight("github") ? "5px solid #27ae60" : "none"
            }}
          >
            🐙 Check Code on GitHub
          </a>
        )}

      </div>
    </div>
  );
}

// Shared Button Styles
const btnBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "400px",
  padding: "15px 20px",
  color: "white",
  textDecoration: "none",
  borderRadius: "10px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  cursor: "pointer"
};

export default Contact;