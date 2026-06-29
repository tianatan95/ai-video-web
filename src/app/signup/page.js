"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError(""); // reset pesan error

    // Validasi tambahan: Cek kalau passwordnya beda
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    // Validasi tambahan: Password terlalu pendek
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Kalau lolos semua validasi, lanjut ke halaman verifikasi email
    router.push('/verify-email');
  };

  return (
    <main style={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Create Account</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
            Join FluxStudio AI today.
          </p>
        </div>

        {/* Kotak Error, muncul cuma pas ada error doang */}
        {error && (
          <div style={{ padding: "0.8rem", background: "rgba(255, 60, 60, 0.2)", border: "1px solid rgba(255, 60, 60, 0.5)", borderRadius: "8px", color: "#ff8888", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" required className="textarea-premium" placeholder="John Doe" style={{ minHeight: "45px" }} />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" required className="textarea-premium" placeholder="you@example.com" style={{ minHeight: "45px" }} />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textarea-premium" 
              placeholder="••••••••" 
              style={{ minHeight: "45px" }} 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="textarea-premium" 
              placeholder="••••••••" 
              style={{ minHeight: "45px" }} 
            />
          </div>

          <button type="submit" className="btn-premium" style={{ border: "none", cursor: "pointer", textAlign: "center", padding: "0.8rem", fontSize: "1rem", marginTop: "1rem" }}>
            Sign Up
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "white", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
            Log in here
          </Link>
        </div>
      </div>
    </main>
  );
}
