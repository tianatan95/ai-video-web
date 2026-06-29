import React from 'react';

export default function LandingPage() {
  return (
    <main style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)", zIndex: -1 }}></div>
      
      <span style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "30px", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem" }}>
        🚀 FluxStudio AI v2.0 is now live
      </span>
      
      <h1 style={{ fontSize: "4rem", lineHeight: "1.1", marginBottom: "1.5rem", maxWidth: "800px" }}>
        Supercharge your <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Video Creation</span> with AI
      </h1>
      
      <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", marginBottom: "3rem", lineHeight: "1.6" }}>
        Transform your text prompts into cinematic, hyper-realistic videos in seconds. Built for speed, powered by next-gen open-source models.
      </p>
      
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a href="/login" className="btn-premium" style={{ textDecoration: "none", padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
          Start Creating for Free
        </a>
        <a href="#features" style={{ textDecoration: "none", padding: "1rem 2.5rem", fontSize: "1.1rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "white", background: "rgba(255,255,255,0.05)" }}>
          View Gallery
        </a>
      </div>
      
      <div style={{ marginTop: "5rem", display: "flex", gap: "3rem", opacity: 0.6, alignItems: "center" }}>
        <p>Trusted by innovative creators worldwide.</p>
      </div>
    </main>
  );
}
