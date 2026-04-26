"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Billing = "monthly" | "yearly";

interface Feature {
  label: string;
  free: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  gradient: string;
  glow: string;
  border: string;
  highlight: boolean;
  cta: string;
  ctaStyle: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Perfect to explore & start creating",
    monthlyPrice: 0,
    yearlyPrice: 0,
    gradient: "from-slate-700 to-slate-800",
    glow: "rgba(100,100,120,0.15)",
    border: "border-white/[0.08]",
    highlight: false,
    cta: "Get Started Free",
    ctaStyle: "ghost",
    icon: "🌱",
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Most Popular",
    tagline: "For creators serious about growth",
    monthlyPrice: 99,
    yearlyPrice: 79,
    gradient: "from-violet-600 to-fuchsia-600",
    glow: "rgba(139,92,246,0.25)",
    border: "border-violet-500/40",
    highlight: true,
    cta: "Start Pro →",
    ctaStyle: "primary",
    icon: "⚡",
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Best Value",
    tagline: "For agencies & power creators",
    monthlyPrice: 299,
    yearlyPrice: 239,
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "rgba(192,38,211,0.2)",
    border: "border-fuchsia-500/30",
    highlight: false,
    cta: "Go Premium →",
    ctaStyle: "fuchsia",
    icon: "👑",
  },
];

const FEATURES: Feature[] = [
  { label: "AI Generations / day",      free: "5",          pro: "Unlimited",   premium: "Unlimited"  },
  { label: "Caption Generator",         free: true,         pro: true,          premium: true         },
  { label: "Hashtag Generator",         free: true,         pro: true,          premium: true         },
  { label: "Hook Generator",            free: "3/day",      pro: true,          premium: true         },
  { label: "Bio Generator",             free: true,         pro: true,          premium: true         },
  { label: "Username Generator",        free: true,         pro: true,          premium: true         },
  { label: "Reel Ideas Generator",      free: false,        pro: true,          premium: true         },
  { label: "Best Time to Post",         free: false,        pro: true,          premium: true         },
  { label: "Trending Hashtags (Live)",  free: false,        pro: true,          premium: true         },
  { label: "Analytics Dashboard",       free: false,        pro: "Basic",       premium: "Advanced"   },
  { label: "Content Calendar",          free: false,        pro: false,         premium: true         },
  { label: "Team Seats",                free: "1",          pro: "3",           premium: "10"         },
  { label: "Export to CSV / PDF",       free: false,        pro: true,          premium: true         },
  { label: "API Access",                free: false,        pro: false,         premium: true         },
  { label: "White-label Exports",       free: false,        pro: false,         premium: true         },
  { label: "Priority Support",          free: false,        pro: "Email",       premium: "24/7 Chat"  },
  { label: "Custom Integrations",       free: false,        pro: false,         premium: true         },
  { label: "Dedicated Account Manager", free: false,        pro: false,         premium: true         },
];

const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes — upgrade or downgrade anytime from your dashboard. When upgrading, you're charged only the prorated difference. Downgrades take effect at your next billing cycle.",
  },
  {
    q: "Do you offer a free trial for Pro or Premium?",
    a: "Every new account gets a 7-day free trial of Pro automatically — no card required. Just sign up and start using all Pro features instantly.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI, Net Banking, and wallets (Paytm, PhonePe, Google Pay) via Razorpay — India's most trusted payment gateway.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell or share your data with third parties.",
  },
  {
    q: "Can I use CreatorBoost for my clients?",
    a: "Yes! The Premium plan includes 10 team seats and white-label export, making it perfect for social media agencies and freelancers managing multiple creator accounts.",
  },
  {
    q: "What happens when I hit the Free plan limit?",
    a: "You'll see a friendly prompt to upgrade. Your existing content is never deleted. You can still access and copy everything you generated — just can't generate more until the next day or you upgrade.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FeatureValue({ val }: { val: boolean | string }) {
  if (val === true)  return <span className="text-green-400 text-lg">✓</span>;
  if (val === false) return <span className="text-white/15 text-lg">—</span>;
  return <span className="text-white/60 text-xs font-semibold">{val}</span>;
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
        open ? "bg-white/[0.06] border-white/[0.12]" : "bg-white/[0.03] border-white/[0.07] hover:border-white/[0.12]"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3 className="text-white/80 font-semibold text-sm leading-snug">{q}</h3>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 text-sm transition-all duration-300 ${
            open ? "rotate-45 bg-violet-600/30 border-violet-500/40 text-violet-300" : ""
          }`}
        >
          +
        </span>
      </div>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-white/45 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [activePlan, setActivePlan] = useState<string | null>(null);

  const getPrice = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return "Free";
    const p = billing === "yearly" ? plan.yearlyPrice! : plan.monthlyPrice!;
    return `₹${p}`;
  };

  const getSavings = (plan: Plan) => {
    if (!plan.monthlyPrice) return null;
    const saved = (plan.monthlyPrice! - plan.yearlyPrice!) * 12;
    return saved > 0 ? saved : null;
  };

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: "radial-gradient(ellipse at top, #0f0020 0%, #0a0a0f 55%)",
        fontFamily: "'Syne','DM Sans',system-ui,sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family:'DM Sans',system-ui,sans-serif; }
        h1,h2,h3,h4,.font-black { font-family:'Syne',system-ui,sans-serif; }
        @keyframes popIn { from{opacity:0;transform:scale(.94) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .pop-in { animation: popIn 0.4s ease forwards; }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              CreatorBoost
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/tools" className="hidden sm:block text-sm text-white/50 hover:text-white transition-colors">
              Tools
            </a>
            <a href="/login" className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.09] text-white/70 text-sm font-semibold hover:bg-white/[0.09] hover:text-white transition-all">
              Log In
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-14 px-4 text-center overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-violet-700/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-fuchsia-700/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.09] text-xs text-white/50 font-semibold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Simple, transparent pricing
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Creator Growth
            </span>
          </h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto mb-10">
            Start free. Scale when you're ready. Cancel anytime — no questions asked.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white/[0.04] border border-white/[0.08] rounded-2xl p-1.5 gap-1">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200 flex items-center gap-2 ${
                  billing === b
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {b === "yearly" ? "Yearly" : "Monthly"}
                {b === "yearly" && (
                  <span className="px-1.5 py-0.5 rounded-md bg-green-500/20 text-green-400 text-[10px] font-black border border-green-500/25">
                    SAVE 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan, idx) => {
              const savings = getSavings(plan);
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl border overflow-hidden transition-all duration-300 ${plan.border} ${
                    plan.highlight
                      ? "shadow-2xl md:-translate-y-4 md:scale-[1.03]"
                      : "hover:-translate-y-1"
                  }`}
                  style={{
                    background: plan.highlight
                      ? "linear-gradient(160deg,rgba(109,40,217,0.18),rgba(192,38,211,0.10))"
                      : "rgba(255,255,255,0.025)",
                    boxShadow: plan.highlight ? `0 0 80px ${plan.glow}` : undefined,
                    animationDelay: `${idx * 0.08}s`,
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className={`absolute top-0 left-0 right-0 py-2 text-center text-[11px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r ${plan.gradient}`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className={`p-7 ${plan.badge ? "pt-12" : ""}`}>
                    {/* Plan name */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-xl shadow-lg`}
                        style={{ boxShadow: `0 6px 20px ${plan.glow}` }}
                      >
                        {plan.icon}
                      </div>
                      <div>
                        <h2 className="text-white font-black text-xl leading-none">{plan.name}</h2>
                        <p className="text-white/35 text-xs mt-0.5">{plan.tagline}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white">{getPrice(plan)}</span>
                        {plan.monthlyPrice !== 0 && (
                          <span className="text-white/35 text-sm">/mo</span>
                        )}
                      </div>
                      {billing === "yearly" && savings && (
                        <p className="text-green-400 text-xs font-bold mt-1">
                          🎉 You save ₹{savings}/year
                        </p>
                      )}
                      {plan.monthlyPrice === 0 && (
                        <p className="text-white/30 text-xs mt-1">Forever free. No card needed.</p>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.07] my-5" />

                    {/* Features list */}
                    <ul className="space-y-3 mb-7">
                      {[
                        plan.id === "free"     && ["5 AI generations/day", "Caption + Bio + Hashtag tools", "1 user seat", "Community support"],
                        plan.id === "pro"      && ["Unlimited generations", "All 8 creator tools", "3 team seats", "Best Time to Post", "Trending Hashtags (Live)", "CSV/PDF exports", "Email support"],
                        plan.id === "premium"  && ["Everything in Pro", "10 team seats", "API access", "Content Calendar", "White-label exports", "Advanced analytics", "24/7 priority chat", "Dedicated account manager"],
                      ].filter(Boolean).flat().map((f) => (
                        <li key={f as string} className="flex items-start gap-2.5 text-sm">
                          <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                            plan.highlight
                              ? "bg-violet-500/30 text-violet-300"
                              : plan.id === "premium"
                              ? "bg-fuchsia-500/25 text-fuchsia-300"
                              : "bg-white/10 text-white/40"
                          }`}>
                            ✓
                          </span>
                          <span className="text-white/60">{f as string}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/login"
                      className={`block text-center py-3.5 rounded-2xl font-black text-sm transition-all duration-200 ${
                        plan.ctaStyle === "primary"
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-xl hover:scale-[1.03] hover:shadow-2xl`
                          : plan.ctaStyle === "fuchsia"
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:scale-[1.03]`
                          : "bg-white/[0.05] border border-white/[0.10] text-white/70 hover:bg-white/[0.09] hover:text-white"
                      }`}
                      style={plan.highlight ? { boxShadow: `0 8px 32px ${plan.glow}` } : undefined}
                    >
                      {plan.cta}
                    </a>

                    {plan.id !== "free" && (
                      <p className="text-center text-[11px] text-white/20 mt-3">
                        7-day free trial · No card required
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* All plans note */}
          <p className="text-center text-white/25 text-xs mt-8">
            All plans include SSL security · GDPR compliant · Razorpay payments · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Feature Comparison Table ───────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3 block">
              Full Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              What's{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Included
              </span>
            </h2>
            <p className="text-white/40 text-sm">Everything side by side, no surprises.</p>
          </div>

          {/* Table */}
          <div className="rounded-3xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
            {/* Table head */}
            <div className="grid grid-cols-4 border-b border-white/[0.07] bg-white/[0.03]">
              <div className="px-5 py-4 text-white/30 text-xs font-bold uppercase tracking-widest">Feature</div>
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`px-3 py-4 text-center ${plan.highlight ? "bg-violet-600/10" : ""}`}
                >
                  <span className={`text-sm font-black ${
                    plan.highlight ? "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                    : plan.id === "premium" ? "bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                    : "text-white/50"
                  }`}>
                    {plan.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {FEATURES.map((feat, i) => (
              <div
                key={feat.label}
                className={`grid grid-cols-4 border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.025] ${
                  i % 2 === 0 ? "" : "bg-white/[0.01]"
                }`}
              >
                <div className="px-5 py-3.5 text-white/50 text-xs font-medium flex items-center">{feat.label}</div>
                <div className="px-3 py-3.5 flex items-center justify-center"><FeatureValue val={feat.free} /></div>
                <div className="px-3 py-3.5 flex items-center justify-center bg-violet-600/[0.04]"><FeatureValue val={feat.pro} /></div>
                <div className="px-3 py-3.5 flex items-center justify-center"><FeatureValue val={feat.premium} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ───────────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Creators{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Love It
              </span>
            </h2>
            <p className="text-white/40 text-sm">Real results from real creators — not paid ads.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                name: "Aanya Sharma",
                handle: "@aanya.creates",
                niche: "Lifestyle · 210K followers",
                avatar: "🧑‍🎨",
                color: "from-violet-600 to-fuchsia-600",
                text: "I went from 40K to 210K followers in 4 months. The Hook Generator alone changed how I open every Reel. Literally nothing else comes close.",
                plan: "Pro",
              },
              {
                name: "Rahul Verma",
                handle: "@rahulfinds",
                niche: "Finance · 89K followers",
                avatar: "👨‍💼",
                color: "from-cyan-600 to-blue-600",
                text: "The trending hashtags tool is insane — my reach on finance content 3×'d overnight. Best ₹99 I spend every month, period.",
                plan: "Pro",
              },
              {
                name: "Priya & Co.",
                handle: "@priyafitness",
                niche: "Fitness Agency · 12 creators",
                avatar: "🏋️‍♀️",
                color: "from-pink-600 to-rose-600",
                text: "We manage 12 creator accounts with Premium. The white-label exports and team seats save us 20+ hours a week. ROI is incredible.",
                plan: "Premium",
              },
            ].map((t) => (
              <div
                key={t.handle}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xl shadow-lg`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white/80 font-bold text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.niche}</p>
                  </div>
                  <span className={`ml-auto text-[10px] font-black px-2 py-1 rounded-lg bg-gradient-to-r ${t.color} text-white`}>
                    {t.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-3 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Got{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Questions?
              </span>
            </h2>
            <p className="text-white/40 text-sm">Everything you need to know before signing up.</p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden text-center px-8 py-14 border border-white/[0.08] bg-gradient-to-br from-violet-900/40 to-fuchsia-900/20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-violet-600/20 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-[90px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <div className="text-5xl mb-5">⚡</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Start Growing{" "}
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Today — For Free
                </span>
              </h2>
              <p className="text-white/45 text-base mb-9 max-w-md mx-auto">
                No credit card. No commitment. Just 8 powerful tools waiting to 10× your reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/login"
                  className="px-9 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black text-base shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03] transition-all duration-200"
                >
                  Get Started Free →
                </a>
                <a
                  href="/tools"
                  className="px-9 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.10] text-white/70 font-bold text-base hover:bg-white/[0.09] hover:text-white transition-all duration-200"
                >
                  Preview All Tools
                </a>
              </div>
              <p className="mt-6 text-white/20 text-xs">
                Trusted by 2.4M+ creators · 7-day Pro trial · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <span>⚡</span>
            <span className="font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              CreatorBoost
            </span>
          </a>
          <div className="flex items-center gap-6">
            {["Home", "Tools", "Pricing", "Login"].map((l) => (
              <a key={l} href={`/${l.toLowerCase() === "home" ? "" : l.toLowerCase()}`} className="text-xs text-white/25 hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2025 CreatorBoost. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
