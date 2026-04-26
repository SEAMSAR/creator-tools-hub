"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "login" | "signup" | "forgot";

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-white/[0.05] border border-white/[0.09] text-white/70 text-sm font-semibold hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-white transition-all duration-200 active:scale-[0.98]">
      {icon}
      {label}
    </button>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({
  label, type = "text", placeholder, value, onChange, hint, show, onToggle,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  show?: boolean;
  onToggle?: () => void;
}) {
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/[0.05] border border-white/[0.09] focus:border-violet-500/60 focus:bg-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none transition-all duration-200 pr-11"
        />
        {isPassword && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors text-base"
          >
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-white/25">{hint}</p>}
    </div>
  );
}

// ─── Strength bar ─────────────────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  if (!password) return null;
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : "bg-white/10"}`}
          />
        ))}
      </div>
      <span className={`text-xs font-semibold transition-colors ${score >= 3 ? "text-green-400" : score === 2 ? "text-yellow-400" : "text-red-400"}`}>
        {labels[score]}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!email) { setError("Email is required."); return; }
    if (mode !== "forgot" && !password) { setError("Password is required."); return; }
    if (mode === "signup" && !agree) { setError("Please accept the terms to continue."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "forgot") setDone(true);
    }, 1600);
  };

  const switchMode = (m: Mode) => {
    setMode(m); setError(""); setDone(false);
    setEmail(""); setPassword(""); setName(""); setNiche("");
  };

  // ── Forgot password success state ──
  if (mode === "forgot" && done) {
    return (
      <Shell>
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-violet-500/30">
            📬
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Check your inbox</h2>
          <p className="text-white/45 text-sm mb-8">
            We sent a reset link to <span className="text-white/70 font-semibold">{email}</span>.<br />
            It expires in 15 minutes.
          </p>
          <button
            onClick={() => switchMode("login")}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200"
          >
            Back to Login
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* ── Mode tabs ───────────────────────────────────────────────────── */}
      {mode !== "forgot" && (
        <div className="flex bg-white/[0.04] border border-white/[0.07] rounded-xl p-1 mb-8">
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
                mode === m
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>
      )}

      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <div className="mb-7">
        {mode === "login" && (
          <>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Welcome back 👋</h1>
            <p className="text-white/40 text-sm">Log in to your CreatorBoost account.</p>
          </>
        )}
        {mode === "signup" && (
          <>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Join 2.4M creators 🚀</h1>
            <p className="text-white/40 text-sm">Create your free account. No card needed.</p>
          </>
        )}
        {mode === "forgot" && (
          <>
            <button
              onClick={() => switchMode("login")}
              className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm mb-5 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Reset password 🔑</h1>
            <p className="text-white/40 text-sm">Enter your email and we'll send a reset link.</p>
          </>
        )}
      </div>

      {/* ── Social buttons (login / signup only) ────────────────────────── */}
      {mode !== "forgot" && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <SocialButton
              label="Google"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }
            />
            <SocialButton
              label="Instagram"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f09433"/>
                      <stop offset=".25" stopColor="#e6683c"/>
                      <stop offset=".5" stopColor="#dc2743"/>
                      <stop offset=".75" stopColor="#cc2366"/>
                      <stop offset="1" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect width="20" height="20" x="2" y="2" rx="5" stroke="url(#ig)" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="url(#ig)"/>
                </svg>
              }
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
        </>
      )}

      {/* ── Form fields ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 mb-5">
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name" placeholder="e.g. Priya Singh" value={name} onChange={setName} />
            <Field label="Your Niche" placeholder="e.g. Fitness" value={niche} onChange={setNiche} />
          </div>
        )}

        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
        />

        {mode !== "forgot" && (
          <div>
            <Field
              label="Password"
              type="password"
              placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"}
              value={password}
              onChange={setPassword}
              show={showPass}
              onToggle={() => setShowPass(!showPass)}
            />
            {mode === "signup" && <PasswordStrength password={password} />}
          </div>
        )}
      </div>

      {/* ── Extras ───────────────────────────────────────────────────────── */}
      {mode === "login" && (
        <div className="flex items-center justify-between mb-6 -mt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-4 h-4">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-4 h-4 rounded bg-white/5 border border-white/15 peer-checked:bg-violet-600 peer-checked:border-violet-500 transition-all" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-black opacity-0 peer-checked:opacity-100 pointer-events-none">✓</span>
            </div>
            <span className="text-white/35 text-xs">Remember me</span>
          </label>
          <button
            onClick={() => switchMode("forgot")}
            className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors"
          >
            Forgot password?
          </button>
        </div>
      )}

      {mode === "signup" && (
        <label className="flex items-start gap-3 cursor-pointer mb-6 -mt-1 group">
          <div className="relative w-4 h-4 mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded bg-white/5 border border-white/15 peer-checked:bg-violet-600 peer-checked:border-violet-500 transition-all" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-black opacity-0 peer-checked:opacity-100 pointer-events-none">✓</span>
          </div>
          <span className="text-white/35 text-xs leading-relaxed">
            I agree to CreatorBoost's{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Privacy Policy</a>
          </span>
        </label>
      )}

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* ── Submit ───────────────────────────────────────────────────────── */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="relative w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black text-base shadow-xl shadow-violet-500/25 hover:shadow-violet-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Shimmer on loading */}
        {loading && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1s_infinite] -translate-x-full" />
        )}
        <span className="relative">
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Log In to Dashboard →"
            : mode === "signup"
            ? "Create Free Account →"
            : "Send Reset Link →"}
        </span>
      </button>

      {/* ── Bottom link ──────────────────────────────────────────────────── */}
      {mode !== "forgot" && (
        <p className="text-center text-xs text-white/30 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => switchMode("signup")} className="text-violet-400 hover:text-violet-300 font-bold transition-colors">
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="text-violet-400 hover:text-violet-300 font-bold transition-colors">
                Log in
              </button>
            </>
          )}
        </p>
      )}

      {/* ── Trust badges ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/[0.06]">
        {["🔒 SSL Secure", "✨ No spam", "🚫 No card needed"].map((b) => (
          <span key={b} className="text-[11px] text-white/20 font-medium">{b}</span>
        ))}
      </div>
    </Shell>
  );
}

// ─── Shell (layout wrapper with decorative side) ──────────────────────────────
function Shell({ children }: { children: React.ReactNode }) {
  const perks = [
    { icon: "✍️", label: "Caption Generator" },
    { icon: "🏷️", label: "Hashtag Generator" },
    { icon: "🪝", label: "Hook Generator" },
    { icon: "🎬", label: "Reel Ideas Generator" },
    { icon: "🔥", label: "Trending Hashtags" },
    { icon: "⏰", label: "Best Time to Post" },
  ];

  return (
    <div
      className="min-h-screen flex items-stretch text-white overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top left, #0f0020 0%, #0a0a0f 60%)",
        fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        h1,h2,h3,.font-black { font-family: 'Syne', system-ui, sans-serif; }
        @keyframes shimmer { to { transform: translateX(200%); } }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float { animation: floatUp 4s ease-in-out infinite; }
        .float-delay { animation: floatUp 4s 1.5s ease-in-out infinite; }
      `}</style>

      {/* ── Left panel (decorative — hidden on mobile) ─────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-14">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-[#0d0018] to-fuchsia-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(192,38,211,0.15),transparent_60%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Logo */}
        <div className="relative">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              CreatorBoost
            </span>
          </a>
        </div>

        {/* Center content */}
        <div className="relative space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-3">
              Everything you need
            </p>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              The unfair advantage for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                short-form creators
              </span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed max-w-sm">
              Join 2.4 million creators who use CreatorBoost daily to craft viral content faster.
            </p>
          </div>

          {/* Perk cards */}
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {perks.map((p, i) => (
              <div
                key={p.label}
                className={`flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 ${i % 3 === 1 ? "float-delay" : i % 2 === 0 ? "float" : ""}`}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="text-white/60 text-xs font-semibold">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["🧑‍🎨", "👩‍💻", "🧑‍🎤", "👩‍🍳", "🧑‍🏋️"].map((e, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 border-2 border-[#0a0a0f] flex items-center justify-center text-base shadow"
                >
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
              <p className="text-white/40 text-xs">Loved by 2.4M+ creators</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative">
          <blockquote className="border-l-2 border-fuchsia-500/40 pl-4">
            <p className="text-white/50 text-sm italic leading-relaxed">
              "CreatorBoost cut my content creation time in half. My reach literally 3×'d in 30 days."
            </p>
            <footer className="mt-2 text-white/30 text-xs font-semibold">
              — @sellearn · 180K followers
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── Right panel (form) ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-10">
        {/* Mobile logo */}
        <a href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            CreatorBoost
          </span>
        </a>

        {/* Card */}
        <div className="w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-sm">
          {children}
        </div>

        <p className="mt-6 text-white/20 text-xs text-center max-w-xs">
          By continuing, you agree to receive product updates. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
