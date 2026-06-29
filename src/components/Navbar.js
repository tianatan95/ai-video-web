"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  // Daftar route publik (di mana user dianggap belum login)
  const publicRoutes = ['/', '/login', '/signup', '/verify-email'];
  const isLoggedIn = !publicRoutes.includes(pathname);

  return (
    <nav style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-glass)", background: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
      {/* BAGIAN KIRI: LOGO */}
      <Link href={isLoggedIn ? "/create" : "/"} style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", flex: 1 }}>
        FluxStudio AI
      </Link>
      
      {/* BAGIAN TENGAH: KOSONG (Dipindah jadi Tab di dalam halaman) */}
      <div style={{ flex: 1 }}></div>

      {/* BAGIAN KANAN: AUTH & PROFILE */}
      <div style={{ display: "flex", gap: "1rem", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            {/* SEBELUM LOGIN */}
            <Link href="/login" style={{ textDecoration: "none", color: "white", fontSize: "0.9rem", fontWeight: "600" }}>
              Login
            </Link>
            <Link href="/signup" style={{ background: "white", color: "black", padding: "0.4rem 1.2rem", fontSize: "0.9rem", borderRadius: "20px", fontWeight: "bold", textDecoration: "none" }}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* SESUDAH LOGIN (Di Halaman Create & Gallery) */}
            <Link href="/topup" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)", padding: "0.3rem 0.8rem", borderRadius: "20px", border: "1px solid var(--border-glass)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background="rgba(255,255,255,0.2)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              <span>💳 5 Credits</span>
              <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold" }}>+ Top Up</span>
            </Link>
            <Link href="/profile" style={{ textDecoration: "none", color: "white", width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent-gradient)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", border: "2px solid rgba(255,255,255,0.2)", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"} title="My Profile">
              U
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "rgba(255, 100, 100, 0.9)", fontSize: "0.85rem", fontWeight: "600", marginLeft: "0.5rem" }}>
              Log out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
