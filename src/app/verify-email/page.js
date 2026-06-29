"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const [status, setStatus] = useState("waiting"); // status bisa: 'waiting', 'verifying', 'success'
  const router = useRouter();

  useEffect(() => {
    // 1. Simulasi User buka email di HP/Tab lain dan klik link (Anggap butuh waktu 5 detik)
    const detectClickTimer = setTimeout(() => {
      // Sistem mendeteksi user udah klik link
      setStatus("verifying");
      
      // 2. Simulasi server memproses verifikasi (2.5 detik)
      setTimeout(() => {
        setStatus("success");
        
        // 3. Berhasil diverifikasi, kasih jeda 1 detik buat nampilin centang ✅, lalu terbang ke dashboard
        setTimeout(() => {
          router.push('/create');
        }, 1000);

      }, 2500);

    }, 5000);

    return () => clearTimeout(detectClickTimer);
  }, [router]);

  return (
    <main style={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "450px", padding: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "center" }}>
        
        <div style={{ background: "rgba(168, 85, 247, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto", transition: "all 0.4s ease", transform: status !== "waiting" ? "scale(1.1)" : "scale(1)", backgroundColor: status === "success" ? "rgba(34, 197, 94, 0.2)" : "rgba(168, 85, 247, 0.1)" }}>
          <span style={{ fontSize: "2.5rem" }}>
            {status === "waiting" && "📧"}
            {status === "verifying" && "⏳"}
            {status === "success" && "✅"}
          </span>
        </div>

        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          {status === "waiting" && "Check your email"}
          {status === "verifying" && "Verifying Account"}
          {status === "success" && "Verification Complete!"}
        </h2>
        
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: "1.6", minHeight: "3rem" }}>
          {status === "waiting" && "We've sent a verification link to your email. Waiting for you to click it..."}
          {status === "verifying" && "Magic link detected! Confirming your credentials securely..."}
          {status === "success" && "Redirecting to your dashboard..."}
        </p>
        
        {status === "waiting" && (
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
            Didn't receive the email? <span style={{ color: "white", cursor: "pointer", textDecoration: "underline" }}>Click to resend</span>
          </div>
        )}
      </div>
    </main>
  );
}
