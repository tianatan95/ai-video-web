export default function Footer() {
  return (
    <footer style={{ padding: "3rem 2rem", borderTop: "1px solid var(--border-glass)", background: "rgba(10,10,10,0.5)", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
            FluxStudio AI
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>© 2026 FluxStudio. All rights reserved.</p>
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>Terms of Service</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>Contact Support</a>
        </div>
        
      </div>
    </footer>
  );
}
