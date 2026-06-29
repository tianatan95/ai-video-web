"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah browser melakukan refresh halaman
    // Validasi HTML5 otomatis jalan karena input punya atribut `required`
    // Kalau berhasil tembus validasi, langsung arahkan ke Dashboard
    router.push('/create');
  };

  return (
    <main style={{ minHeight: "85vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
            Enter your details to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" required className="textarea-premium" placeholder="you@example.com" style={{ minHeight: "45px" }} />
          </div>

          <div className="input-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label className="input-label" style={{ marginBottom: 0 }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: "0.85rem", color: "#a855f7", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity="0.8"} onMouseLeave={(e) => e.target.style.opacity="1"}>
                Forgot password?
              </Link>
            </div>
            <input type="password" required className="textarea-premium" placeholder="••••••••" style={{ minHeight: "45px" }} />
          </div>

          <button type="submit" className="btn-premium" style={{ border: "none", cursor: "pointer", textAlign: "center", padding: "0.8rem", fontSize: "1rem", marginTop: "1rem" }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "white", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
            Sign up here
          </Link>
        </div>
      </div>
    </main>
  );
}
