"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5s");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("Warming up GPUs...");
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setVideoUrl(null);
    
    // Teks animasi loading
    setLoadingText("Warming up GPUs...");
    const stages = ["Generating frames...", "Refining details...", "Finalizing video..."];
    let step = 0;
    const interval = setInterval(() => {
      if(step < stages.length) {
        setLoadingText(stages[step]);
        step++;
      }
    }, 1200);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, style, aspectRatio, duration })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setVideoUrl(data.videoUrl);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Failed to connect to backend");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <main className="container">
      <div style={{ textAlign: "center", marginBottom: "1.5rem", marginTop: "1rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Workspace</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <a href="/create" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.2)" }}>Create</a>
        <a href="/clipper" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Auto Clipper</a>
        <a href="/gallery" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Gallery</a>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Left Column: Input Panel */}
        <div className="glass-panel" style={{ flex: "1 1 400px" }}>
          <div className="input-group">
            <label className="input-label">Describe your vision</label>
            <textarea 
              className="textarea-premium" 
              placeholder="E.g., A cinematic drone shot of a futuristic neon city at night, 4k resolution, hyper-realistic..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Style</label>
            <select className="textarea-premium" style={{ minHeight: "50px" }} value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="Cinematic">Cinematic</option>
              <option value="Anime">Anime</option>
              <option value="3D Animation">3D Animation</option>
              <option value="Realistic">Realistic</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="input-label">Aspect Ratio</label>
              <select className="textarea-premium" style={{ minHeight: "50px" }} value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                <option value="16:9">16:9 (Landscape)</option>
                <option value="9:16">9:16 (Portrait)</option>
                <option value="1:1">1:1 (Square)</option>
              </select>
            </div>
            
            <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="input-label">Duration</label>
              <select className="textarea-premium" style={{ minHeight: "50px" }} value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="3s">3 Seconds</option>
                <option value="5s">5 Seconds</option>
                <option value="10s">10 Seconds</option>
              </select>
            </div>
          </div>

          <button 
            className="btn-premium" 
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{ opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? (
              <span className="animate-pulse">✨ Generating Video...</span>
            ) : (
              "Generate Video"
            )}
          </button>
        </div>

        {/* Right Column: Output Panel */}
        <div className="glass-panel" style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          {isGenerating ? (
            <div style={{ textAlign: "center" }}>
              <div className="animate-pulse" style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--accent-gradient)", margin: "0 auto 1rem", boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}></div>
              <p style={{ color: "var(--accent-gradient)", fontWeight: "bold", fontSize: "1.1rem" }}>{loadingText}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.5rem" }}>Please wait, magic is happening...</p>
            </div>
          ) : videoUrl ? (
            <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-glass)" }}>
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                style={{ width: "100%", display: "block" }} 
              />
            </div>
          ) : (
            <div style={{ textAlign: "center", opacity: 0.5 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: "1rem" }}>
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
              <p>Your masterpiece will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
