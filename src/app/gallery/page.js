"use client";
import React from 'react';

// Mock data (dummy history)
const videoHistory = [
  { id: 1, prompt: "A cinematic drone shot of a futuristic neon city at night, 4k resolution, hyper-realistic", date: "2026-06-28", style: "Cinematic", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, prompt: "Anime style samurai fighting a dragon on a snowy mountain", date: "2026-06-27", style: "Anime", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, prompt: "3D animation of a cute robot drinking coffee in a cafe", date: "2026-06-26", style: "3D Animation", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, prompt: "Realistic close up of an astronaut landing on mars", date: "2026-06-25", style: "Realistic", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function Gallery() {
  return (
    <main className="container" style={{ padding: "2rem 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem", marginTop: "1rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Workspace</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
        <a href="/create" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Create</a>
        <a href="/clipper" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Auto Clipper</a>
        <a href="/gallery" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.2)" }}>Gallery</a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
        {videoHistory.map((video) => (
          <div key={video.id} className="glass-panel" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9", background: "black" }}>
              <video 
                src={video.url} 
                controls 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.6rem", borderRadius: "20px" }}>{video.style}</span>
                <span style={{ fontSize: "0.75rem", color: "gray" }}>{video.date}</span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.4", color: "rgba(255,255,255,0.9)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                "{video.prompt}"
              </p>
            </div>
            
            <button className="btn-premium" style={{ padding: "0.5rem", fontSize: "0.9rem" }}>
              Download
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
