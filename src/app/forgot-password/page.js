"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay to send reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <main style={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {!isSubmitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Reset Password</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input type="email" required className="textarea-premium" placeholder="you@example.com" style={{ minHeight: "45px" }} />
              </div>

              <button type="submit" disabled={isLoading} className="btn-premium" style={{ border: "none", cursor: isLoading ? "wait" : "pointer", textAlign: "center", padding: "0.8rem", fontSize: "1rem", marginTop: "1rem", opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ background: "rgba(34, 197, 94, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem" }}>
              <span style={{ fontSize: "2.5rem" }}>✅</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Check Your Inbox</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              If an account exists for that email, we have sent password reset instructions.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
          Remember your password?{" "}
          <Link href="/login" style={{ color: "white", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
