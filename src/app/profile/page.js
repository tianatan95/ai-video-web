"use client";
import React from 'react';
import Link from 'next/link';

export default function Profile() {
  return (
    <main style={{ minHeight: "85vh", padding: "3rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/create" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "1.5rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "white"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
        <span style={{ fontSize: "1.2rem" }}>←</span> Back to Workspace
      </Link>

      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Account <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Settings</span></h1>
      
      <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Profile Information</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Full Name</label>
            <div style={{ padding: "0.8rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>John Doe</div>
          </div>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Email Address</label>
            <div style={{ padding: "0.8rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>you@example.com</div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Billing & Credits</h2>
          <a href="/topup" className="btn-premium" style={{ textDecoration: "none", padding: "0.5rem 1.5rem", borderRadius: "20px", fontSize: "0.9rem" }}>Top Up</a>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem", background: "rgba(168, 85, 247, 0.1)", borderRadius: "12px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
          <span style={{ fontSize: "3rem" }}>💳</span>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>Available Balance</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>5 <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>Credits</span></div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Social Connections</h2>
          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.8rem", borderRadius: "20px" }}>Required for Auto-Post</span>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* TikTok Connection */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>🎵</span>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>TikTok</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Not connected</p>
              </div>
            </div>
            <button style={{ padding: "0.6rem 1.5rem", borderRadius: "8px", background: "white", color: "black", fontWeight: "bold", border: "none", cursor: "pointer" }} onClick={() => alert("Simulasi: Redirecting to TikTok OAuth Login...")}>
              Connect
            </button>
          </div>

          {/* Instagram Connection */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>📸</span>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>Instagram Reels</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Not connected</p>
              </div>
            </div>
            <button style={{ padding: "0.6rem 1.5rem", borderRadius: "8px", background: "transparent", color: "white", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }} onClick={() => alert("Simulasi: Redirecting to Instagram OAuth Login...")}>
              Connect
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#ff8888" }}>Danger Zone</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>Once you delete your account, there is no going back. Please be certain.</p>
        <button style={{ padding: "0.8rem 1.5rem", background: "transparent", border: "1px solid #ff8888", color: "#ff8888", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Delete Account</button>
      </div>
    </main>
  );
}
