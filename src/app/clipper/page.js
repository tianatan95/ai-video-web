"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Clipper() {
  const [videoUrl, setVideoUrl] = useState("");
  const [showLockModal, setShowLockModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [clipResult, setClipResult] = useState(null);
  
  // Simulated user balance. (0 = locked, >=10 = unlocked)
  const userCredits = 0; // KEMBALI KE 0 BIAR DIGEMBOK
  const isLocked = userCredits < 10;

  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [autoSubtitles, setAutoSubtitles] = useState(true);
  const [autoUpload, setAutoUpload] = useState(false);

  const handleInteraction = (e) => {
    if (isLocked) {
      e.preventDefault();
      setShowLockModal(true);
    } else if (e.type === 'click' && e.currentTarget.tagName === 'BUTTON') {
      setIsGenerating(true);
      setClipResult(null);
      setProgress(0);
      
      // Simulate progress bar filling up over 4 seconds
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5; // increment by 5-20%
        });
      }, 500);
    }
  };

  const handleAutoUploadToggle = (e) => {
    if (e.target.checked) {
      setShowConnectModal(true);
      setAutoUpload(false); // Force it back to unchecked
    } else {
      setAutoUpload(false);
    }
  };

  useEffect(() => {
    if (progress >= 100 && isGenerating) {
      setTimeout(() => {
        setIsGenerating(false);
        setShowSuccessNotif(true);
      }, 500);
    }
  }, [progress, isGenerating]);

  const handleCloseSuccess = () => {
    setShowSuccessNotif(false);
    setClipResult({
      title: "Viral Clip 1: The Ultimate Hook",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    });
  };

  return (
    <main className="container" style={{ padding: "2rem 1rem", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem", marginTop: "1rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Workspace</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
        <a href="/create" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Create</a>
        <a href="/clipper" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "rgba(255,255,255,0.1)", color: "white", textDecoration: "none", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.2)" }}>Auto Clipper</a>
        <a href="/gallery" style={{ padding: "0.6rem 2rem", borderRadius: "30px", background: "transparent", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: "bold", border: "1px solid transparent", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>Gallery</a>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Header Content */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ display: "inline-block", background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.3)", padding: "0.5rem 1.5rem", borderRadius: "30px", color: "var(--accent)", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "1.5rem", letterSpacing: "1px" }}>
            ✨ AI-POWERED EXTRACTION
          </div>
          <h2 style={{ fontSize: "3rem", marginBottom: "1.5rem", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: "1.2" }}>
            Turn Long Videos into<br/>Viral Shorts Instantly
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Drop a YouTube link or upload a file. Our AI agent will watch the entire video, pinpoint the most engaging moments, and cut them into ready-to-post vertical clips with dynamic captions.
          </p>
        </div>

        {/* Input Panel */}
        <div className="glass-panel" style={{ padding: "3rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
          
          <div className="input-group">
            <label className="input-label" style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "white" }}>Paste YouTube URL</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", color: "rgba(255,255,255,0.5)" }}>🔗</span>
              <input 
                type="text" 
                className="textarea-premium" 
                placeholder="https://www.youtube.com/watch?v=..." 
                style={{ minHeight: "60px", fontSize: "1.1rem", paddingLeft: "3.5rem", cursor: isLocked ? "pointer" : "text" }}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onClick={handleInteraction}
                readOnly={isLocked}
              />
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", margin: "2rem 0", opacity: 0.5 }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }}></div>
            <span style={{ padding: "0 1rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>Or Upload File</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }}></div>
          </div>
          
          <div 
            onClick={handleInteraction}
            style={{ border: "2px dashed rgba(168, 85, 247, 0.4)", borderRadius: "16px", padding: "2rem", textAlign: "center", cursor: "pointer", background: "rgba(168, 85, 247, 0.03)", marginBottom: "2.5rem", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(168, 85, 247, 0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(168, 85, 247, 0.03)"}
          >
            <div style={{ background: "rgba(168,85,247,0.1)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1rem" }}>
              <span style={{ fontSize: "1.8rem" }}>📤</span>
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "white" }}>Drag & drop your video here</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Supports MP4, MOV, WEBM (Max 2GB or 2 hours)</p>
          </div>

          {/* NEW PRO FEATURES TOGGLES */}
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2.5rem", border: "1px solid rgba(255,255,255,0.05)" }} onClick={handleInteraction}>
            <h3 style={{ fontSize: "1rem", color: "white", marginBottom: "1.5rem" }}>Processing Settings</h3>
            
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ display: "block", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>Aspect Ratio</label>
                <select className="textarea-premium" style={{ minHeight: "45px" }} value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} disabled={isLocked}>
                  <option value="9:16">📱 9:16 (TikTok/Reels/Shorts)</option>
                  <option value="1:1">🔲 1:1 (Instagram Square)</option>
                  <option value="16:9">💻 16:9 (YouTube Landscape)</option>
                </select>
              </div>

              <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={autoSubtitles} onChange={(e) => setAutoSubtitles(e.target.checked)} disabled={isLocked} style={{ width: "18px", height: "18px", accentColor: "#a855f7" }} />
                  <span style={{ fontSize: "0.95rem" }}>💬 Auto-Generate Dynamic Subtitles</span>
                </label>
                
                <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={autoUpload} onChange={handleAutoUploadToggle} disabled={isLocked} style={{ width: "18px", height: "18px", accentColor: "#a855f7" }} />
                  <span style={{ fontSize: "0.95rem" }}>🚀 Auto-Post to TikTok & IG Reels</span>
                </label>
              </div>
            </div>
          </div>

          {!isGenerating ? (
            <button 
              className="btn-premium" 
              style={{ width: "100%", padding: "1.2rem", fontSize: "1.2rem", border: "none", cursor: "pointer", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              onClick={handleInteraction}
            >
              <span style={{ fontSize: "1.3rem" }}>✨</span> Auto Generate Clips
            </button>
          ) : (
            <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                <span style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Analyzing & Clipping...</span>
                <span style={{ color: "white", fontWeight: "bold" }}>{progress > 100 ? 100 : progress}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent-gradient)", transition: "width 0.3s ease" }}></div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "1rem", textAlign: "center" }}>Our AI is detecting faces, cutting silences, and applying subtitles...</p>
            </div>
          )}
          
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <span style={{ display: "inline-block", background: "rgba(34, 197, 94, 0.1)", color: "rgb(74, 222, 128)", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>
              FREE - 0 Credits Per Video
            </span>
          </div>
        </div>

        {/* OUTPUT PANEL */}
        {clipResult && (
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "24px", border: "1px solid rgba(168, 85, 247, 0.5)", animation: "fadeIn 0.5s ease" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🎉 <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Clip Successfully Generated!</span>
            </h3>
            
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ width: "250px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)", background: "black" }}>
                <video src={clipResult.url} controls style={{ width: "100%", display: "block", aspectRatio: "9/16", objectFit: "cover" }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{clipResult.title}</h4>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem" }}>Viral Score: 98/100 🔥</span>
                  <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem" }}>{aspectRatio}</span>
                </div>
                
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: "1.5" }}>
                  AI has extracted the most engaging 30 seconds of your video. We've added dynamic subtitles to maximize retention.
                </p>
                
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button className="btn-premium" style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}>Download MP4</button>
                  <button style={{ padding: "0.8rem 1.5rem", borderRadius: "30px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", fontWeight: "bold" }}>Post to TikTok</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DYNAMIC LOCK MODAL (POP-UP) */}
      {showLockModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.8)", zIndex: 100, backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease-out" }}>
          <div className="glass-panel" style={{ width: "90%", maxWidth: "480px", padding: "3rem 2rem", position: "relative", border: "1px solid rgba(168, 85, 247, 0.6)", boxShadow: "0 20px 60px rgba(0,0,0,0.8)", textAlign: "center" }}>
            <button onClick={() => setShowLockModal(false)} style={{ position: "absolute", top: "15px", right: "20px", background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.8rem", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>×</button>
            
            <div style={{ background: "rgba(239, 68, 68, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              <span style={{ fontSize: "2.5rem" }}>🔒</span>
            </div>
            
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "white" }}>Unlock Auto Clipper</h2>
            
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", lineHeight: "1.6", fontSize: "1.05rem" }}>
              To prevent bot spam, this free feature requires your account to have a minimum balance of <strong>10 Credits</strong>. 
              <br/><br/>
              Don't worry, processing videos in Auto Clipper is <strong>completely free</strong> and will NOT deduct your credits!
            </p>
            
            <Link href="/topup" className="btn-premium" style={{ display: "block", width: "100%", padding: "1rem", fontSize: "1.1rem", textDecoration: "none", fontWeight: "bold", borderRadius: "10px" }}>
              Top Up Now to Unlock
            </Link>
          </div>
        </div>
      )}

      {/* SUCCESS NOTIFICATION MODAL */}
      {showSuccessNotif && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.8)", zIndex: 200, backdropFilter: "blur(5px)", animation: "fadeIn 0.2s ease-out" }}>
          <div className="glass-panel" style={{ width: "90%", maxWidth: "400px", padding: "2.5rem 2rem", border: "1px solid rgba(34, 197, 94, 0.5)", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
            <div style={{ background: "rgba(34, 197, 94, 0.1)", width: "70px", height: "70px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              <span style={{ fontSize: "2.5rem" }}>✅</span>
            </div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem", color: "white" }}>Clipping Success!</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", fontSize: "1rem" }}>
              Your long video has been successfully converted into engaging short clips.
            </p>
            <button onClick={handleCloseSuccess} className="btn-premium" style={{ width: "100%", padding: "0.8rem", fontSize: "1rem", border: "none", cursor: "pointer", borderRadius: "10px", background: "rgba(34, 197, 94, 0.9)" }}>
              View Result
            </button>
          </div>
        </div>
      )}

      {/* CONNECT SOCIAL MODAL */}
      {showConnectModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.8)", zIndex: 300, backdropFilter: "blur(5px)", animation: "fadeIn 0.2s ease-out" }}>
          <div className="glass-panel" style={{ width: "90%", maxWidth: "400px", padding: "2.5rem 2rem", border: "1px solid rgba(168, 85, 247, 0.5)", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
            <div style={{ background: "rgba(168, 85, 247, 0.1)", width: "70px", height: "70px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
              <span style={{ fontSize: "2.5rem" }}>🔗</span>
            </div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem", color: "white" }}>Action Required</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", fontSize: "1rem", lineHeight: "1.5" }}>
              Please connect your TikTok or Instagram account in your Profile settings before enabling Auto-Post.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link href="/profile" className="btn-premium" style={{ width: "100%", padding: "0.8rem", fontSize: "1rem", textDecoration: "none", borderRadius: "10px", fontWeight: "bold" }}>
                Connect Account
              </Link>
              <button onClick={() => setShowConnectModal(false)} style={{ width: "100%", padding: "0.8rem", fontSize: "1rem", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", borderRadius: "10px", background: "transparent", color: "white", fontWeight: "bold" }}>
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
