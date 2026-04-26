"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Tool {
  id: number;
  icon: string;
  title: string;
  desc: string;
  gradient: string;
  tag: string;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  cta: string;
  gradient: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const TOOLS: Tool[] = [
  { id: 1, icon: "✍️", title: "Caption Generator",      desc: "Craft viral captions that stop the scroll instantly.",       gradient: "from-violet-500 to-fuchsia-500",   tag: "Popular" },
  { id: 2, icon: "🏷️", title: "Hashtag Generator",     desc: "Find niche hashtags that push your content to new eyes.",   gradient: "from-pink-500 to-rose-500",        tag: "Hot" },
  { id: 3, icon: "🪝", title: "Hook Generator",         desc: "Write opening lines that force people to keep watching.",   gradient: "from-orange-500 to-amber-400",     tag: "Trending" },
  { id: 4, icon: "👤", title: "Bio Generator",          desc: "Turn your profile into a follow magnet in seconds.",        gradient: "from-cyan-500 to-blue-500",        tag: "Essential" },
  { id: 5, icon: "🔤", title: "Username Generator",     desc: "Discover brandable, memorable handles that are available.", gradient: "from-green-400 to-emerald-500",    tag: "New" },
  { id: 6, icon: "⏰", title: "Best Time to Post",      desc: "AI-powered scheduling based on your niche audience.",       gradient: "from-yellow-400 to-orange-500",    tag: "Smart" },
  { id: 7, icon: "🎬", title: "Reel Ideas Generator",   desc: "Never run out of content with AI-driven Reel concepts.",   gradient: "from-fuchsia-500 to-purple-600",   tag: "Viral" },
  { id: 8, icon: "🔥", title: "Trending Hashtags",      desc: "Real-time trending tags refreshed every 30 minutes.",      gradient: "from-red-500 to-pink-500",         tag: "Live" },
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    highlight: false,
    features: ["5 AI generations/day", "3 tools included", "Basic analytics", "Community support"],
    cta: "Start Free",
    gradient: "from-slate-700 to-slate-800",
  },
  {
    name: "Creator Pro",
    price: "$12",
    period: "/month",
    highlight: true,
    badge: "Most Popular",
    features: ["Unlimited generations", "All 8 tools", "Trending analytics", "Priority support", "Hashtag tracker", "Schedule optimizer"],
    cta: "Go Pro →",
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    name: "Agency",
    price: "$39",
    period: "/month",
    highlight: false,
    features: ["Everything in Pro", "10 team seats", "White-label exports", "API access", "Dedicated manager", "Custom integrations"],
    cta: "Contact Sales",
    gradient: "from-slate-700 to-slate-800",
  },
];

const REASONS = [
  { icon: "⚡", title: "Instant Results",    desc: "Generate 30 captions, hooks, or hashtag sets in under 10 seconds." },
  { icon: "🎯", title: "Niche-Aware AI",     desc: "Our AI learns your niche and speaks your audience's language." },
  { icon: "📈", title: "Growth-Focused",     desc: "Every tool is engineered around one goal: more views, more follows." },
  { icon: "🔄", title: "Always Updated",     desc: "Trends shift daily. CreatorBoost refreshes its data every 30 minutes." },
];

const STATS = [
  { value: "2.4M+", label: "Creators" },
  { value: "180M+", label: "Generations" },
  { value: "3.2×",  label: "Avg. Reach Boost" },
  { value: "99.9%", label: "Uptime" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-xl" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            CreatorBoost
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Tools", "Pricing", "Blog", "Login"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a
            href="#pricing"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200"
          >
            Start Free →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 bg-white/70 transition-all duration-300 ${
                i === 1 ? "w-5" : "w-7"
              }`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d18]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {["Tools", "Pricing", "Blog", "Login"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white font-medium py-1"
            >
              {item}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-center"
          >
            Start Free →
          </a>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/15 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-pink-700/10 rounded-full blur-[80px] animate-pulse delay-2000" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Trusted by 2.4M+ creators worldwide
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Create Content</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            That Goes Viral
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          8 AI-powered tools built exclusively for Instagram, Reels & YouTube Shorts creators.
          Generate captions, hooks, hashtags and Reel ideas in seconds.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#tools"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
          >
            Try Free Tools →
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-200"
          >
            See Pricing
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-white/40 mt-1 font-medium uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
      </div>
    </section>
  );
}

function ToolsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="tools" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-4 block">
            Creator Toolkit
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            8 Tools.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Infinite Growth.
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Everything you need to dominate your niche — all in one dashboard.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              onMouseEnter={() => setHovered(tool.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative group cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${
                hovered === tool.id
                  ? "bg-white/[0.07] border-white/20 scale-[1.02] shadow-2xl"
                  : "bg-white/[0.03] border-white/[0.06] hover:border-white/10"
              }`}
            >
              {/* Tag badge */}
              <span
                className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${tool.gradient} text-white`}
              >
                {tool.tag}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg`}
              >
                {tool.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{tool.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{tool.desc}</p>

              {/* Arrow */}
              <div
                className={`mt-5 flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${
                  hovered === tool.id ? "text-fuchsia-400" : "text-white/30"
                }`}
              >
                Try it free
                <span className={`transition-transform duration-200 ${hovered === tool.id ? "translate-x-1" : ""}`}>
                  →
                </span>
              </div>

              {/* Glow on hover */}
              {hovered === tool.id && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-[0.06] pointer-events-none`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400 mb-4 block">
              Why It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Why Creators{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Love Us
              </span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              CreatorBoost isn't another generic AI tool. It's built from the ground up for
              short-form creators who live and breathe Instagram and Reels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {REASONS.map((r) => (
                <div
                  key={r.title}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="text-3xl mb-3">{r.icon}</div>
                  <h3 className="text-white font-bold text-base mb-1">{r.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual: fake dashboard card */}
          <div className="relative">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-6 backdrop-blur-sm">
              {/* Fake terminal header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-white/30 font-mono">caption-generator.ai</span>
              </div>

              {/* Input */}
              <div className="mb-5">
                <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">Your Niche</label>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 text-sm font-mono">
                  Fitness & Mindset 💪
                </div>
              </div>

              {/* Output captions */}
              <div className="space-y-3">
                {[
                  "Your only competition is who you were yesterday. 🔥 #GlowUp",
                  "The gym doesn't care about your excuses. It only counts your reps.",
                  "Progress > Perfection. Every single day. 💯 #FitnessMotivation",
                ].map((caption, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/70 flex items-start justify-between gap-3 group hover:border-fuchsia-500/30 transition-all duration-200"
                  >
                    <span>{caption}</span>
                    <button className="shrink-0 text-white/20 group-hover:text-fuchsia-400 transition-colors text-xs mt-0.5">
                      Copy
                    </button>
                  </div>
                ))}
              </div>

              {/* Refresh button */}
              <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold hover:opacity-90 transition-opacity">
                ⚡ Generate 30 More Captions
              </button>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
              ✓ Generated in 0.8s
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-pink-400 mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              Creator-Friendly
            </span>{" "}
            Pricing
          </h2>
          <p className="text-white/50 text-lg">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-violet-900/60 to-fuchsia-900/40 border-fuchsia-500/40 shadow-2xl shadow-fuchsia-500/20 scale-[1.02]"
                  : "bg-white/[0.03] border-white/[0.07] hover:border-white/15"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-black whitespace-nowrap shadow-lg">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${plan.highlight ? "bg-fuchsia-500/30 text-fuchsia-300" : "bg-white/10 text-white/50"}`}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:scale-105"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center bg-gradient-to-br from-violet-900/50 to-fuchsia-900/30 border border-white/10">
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                10× Your Reach?
              </span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join 2.4 million creators who use CreatorBoost every day to stay ahead of the algorithm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
              >
                Start for Free — No Card Needed →
              </a>
            </div>
            <p className="mt-6 text-white/30 text-sm">Free forever plan available. Upgrade anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Tools: ["Caption Generator", "Hashtag Generator", "Hook Generator", "Bio Generator"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                CreatorBoost
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The AI toolkit that gives creators an unfair advantage on Instagram & Reels.
            </p>
            <div className="flex gap-3 mt-6">
              {["Instagram", "Twitter", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white/70 font-bold text-sm uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">© 2025 CreatorBoost. All rights reserved.</p>
          <p className="text-white/25 text-sm">
            Made with 💜 for creators worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: "radial-gradient(ellipse at top, #12001f 0%, #0a0a0f 50%, #0a0a0f 100%)",
        fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Google Fonts — Syne (display) + DM Sans (body) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        h1, h2, h3, h4, .font-black { font-family: 'Syne', system-ui, sans-serif; }
        ::selection { background: #7c3aed55; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #7c3aed55; border-radius: 99px; }
      `}</style>

      <Navbar />
      <HeroSection />
      <ToolsSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
