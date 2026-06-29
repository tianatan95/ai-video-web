"use client";
import React, { useState } from 'react';

export default function TopUp() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Select Method, 2: Payment Details, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const packages = [
    { name: "Starter", credits: 500, price: "$5", desc: "Perfect for hobbyists. Generates up to 50 videos." },
    { name: "Creator", credits: 2000, price: "$15", desc: "For regular creators needing consistent output.", popular: true },
    { name: "Pro Studio", credits: 8000, price: "$50", desc: "Maximum power for professional pipelines." }
  ];

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("Please select a payment method first.");
      return;
    }
    setCheckoutStep(2);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulasi loading server payment gateway (misal Midtrans/Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3); // Success step
      
      // Auto-close modal setelah sukses dan pura-puranya update saldo
      setTimeout(() => {
        closeModal();
      }, 3000);
    }, 2000);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setPaymentMethod("");
    setCheckoutStep(1);
    setIsProcessing(false);
  };

  return (
    <main style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 2rem", position: "relative" }}>
      {/* Tombol Back */}
      <a href="/create" style={{ position: "absolute", top: "2rem", left: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "1rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.6)"}>
        ← Back to Workspace
      </a>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Top Up <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Credits</span></h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
          Generate more stunning videos by adding credits to your account.
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "1000px" }}>
        {packages.map((pkg, idx) => (
          <div key={idx} className="glass-panel" style={{ width: "300px", padding: "2rem", display: "flex", flexDirection: "column", position: "relative", border: pkg.popular ? "1px solid rgba(168, 85, 247, 0.5)" : "1px solid rgba(255,255,255,0.1)", transform: pkg.popular ? "scale(1.05)" : "scale(1)", transition: "transform 0.2s ease" }} onMouseEnter={(e) => {if(!pkg.popular) e.currentTarget.style.transform = 'translateY(-5px)'}} onMouseLeave={(e) => {if(!pkg.popular) e.currentTarget.style.transform = 'scale(1)'}}>
            
            {pkg.popular && (
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--accent-gradient)", padding: "0.2rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold", boxShadow: "0 4px 15px rgba(168, 85, 247, 0.4)" }}>
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{pkg.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "2rem", minHeight: "40px" }}>{pkg.desc}</p>
            
            <div style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              {pkg.price}
            </div>
            <div style={{ fontSize: "1.1rem", color: "rgba(168, 85, 247, 0.9)", fontWeight: "bold", marginBottom: "2rem" }}>
              💳 {pkg.credits.toLocaleString()} Credits
            </div>
            
            <button className="btn-premium" onClick={() => setSelectedPackage(pkg)} style={{ marginTop: "auto", padding: "0.8rem", fontSize: "1rem", border: "none", cursor: "pointer", width: "100%" }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: "4rem", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
        <p>⚡ 1 Video Generation costs exactly 10 Credits, regardless of duration.</p>
        <p>🔒 Local & International payments securely processed via Midtrans and Stripe.</p>
      </div>

      {/* PAYMENT MODAL (POPUP) */}
      {selectedPackage && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "1rem" }}>
          
          <div className="glass-panel" style={{ width: "100%", maxWidth: "450px", padding: "2rem", position: "relative", border: "1px solid rgba(168, 85, 247, 0.5)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", animation: "fadeIn 0.2s ease-out" }}>
            
            {checkoutStep !== 3 && (
              <button onClick={closeModal} style={{ position: "absolute", top: "15px", right: "20px", background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.8rem", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="white"} onMouseLeave={(e) => e.target.style.color="rgba(255,255,255,0.5)"}>×</button>
            )}

            {/* STEP 1: SELECT METHOD */}
            {checkoutStep === 1 && (
              <>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Complete Purchase</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", fontSize: "0.9rem" }}>
                  You are buying the <strong>{selectedPackage.name}</strong> package ({selectedPackage.credits.toLocaleString()} Credits) for <strong>{selectedPackage.price}</strong>.
                </p>

                <h3 style={{ fontSize: "0.9rem", marginBottom: "1rem", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "1px" }}>Select Payment Method</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
                  {["DANA", "GoPay", "OVO", "Bank Transfer", "PayPal", "Credit Card"].map((method) => (
                    <div 
                      key={method} 
                      onClick={() => setPaymentMethod(method)}
                      style={{ 
                        padding: "0.8rem", 
                        border: paymentMethod === method ? "2px solid #a855f7" : "1px solid rgba(255,255,255,0.1)", 
                        borderRadius: "8px", 
                        cursor: "pointer", 
                        textAlign: "center", 
                        fontWeight: paymentMethod === method ? "bold" : "normal",
                        background: paymentMethod === method ? "rgba(168, 85, 247, 0.1)" : "rgba(255,255,255,0.05)",
                        transition: "all 0.2s"
                      }}
                    >
                      {method}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleContinue} 
                  className="btn-premium" 
                  style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", border: "none", cursor: "pointer" }}
                >
                  Continue
                </button>
              </>
            )}

            {/* STEP 2: PAYMENT DETAILS FORM */}
            {checkoutStep === 2 && (
              <>
                <button onClick={() => setCheckoutStep(1)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  ← Back
                </button>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Payment Details</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  Pay <strong>{selectedPackage.price}</strong> securely via <strong>{paymentMethod}</strong>.
                </p>

                {paymentMethod === "Credit Card" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                    <div className="input-group">
                      <label className="input-label">Card Number</label>
                      <input type="text" className="textarea-premium" placeholder="0000 0000 0000 0000" style={{ minHeight: "45px" }} />
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <div className="input-group" style={{ flex: 1 }}>
                        <label className="input-label">Expiry (MM/YY)</label>
                        <input type="text" className="textarea-premium" placeholder="MM/YY" style={{ minHeight: "45px" }} />
                      </div>
                      <div className="input-group" style={{ flex: 1 }}>
                        <label className="input-label">CVV</label>
                        <input type="text" className="textarea-premium" placeholder="123" style={{ minHeight: "45px" }} />
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Cardholder Name</label>
                      <input type="text" className="textarea-premium" placeholder="John Doe" style={{ minHeight: "45px" }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginBottom: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.2)" }}>
                    <div style={{ width: "150px", height: "150px", background: "white", margin: "0 auto 1rem", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span style={{ color: "black", fontSize: "0.8rem", fontWeight: "bold" }}>QR CODE<br/>PLACEHOLDER</span>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>Scan this QR code using your <strong>{paymentMethod}</strong> app to complete the purchase.</p>
                  </div>
                )}

                <button 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="btn-premium" 
                  style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", border: "none", cursor: isProcessing ? "wait" : "pointer", opacity: isProcessing ? 0.7 : 1 }}
                >
                  {isProcessing ? "Processing..." : `Confirm & Pay ${selectedPackage.price}`}
                </button>
              </>
            )}

            {/* STEP 3: SUCCESS */}
            {checkoutStep === 3 && (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ background: "rgba(34, 197, 94, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem" }}>
                  <span style={{ fontSize: "2.5rem" }}>✅</span>
                </div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Payment Successful!</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: "1.6" }}>
                  <strong>+{selectedPackage.credits.toLocaleString()} Credits</strong> have been added to your account.
                </p>
                <p style={{ color: "gray", fontSize: "0.85rem", marginTop: "1.5rem" }}>Closing window...</p>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}
