"use client";

import { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tool {
  id: number;
  icon: string;
  title: string;
  desc: string;
  longDesc: string;
  gradient: string;
  glowColor: string;
  category: string;
  tag: string;
  tagColor: string;
  uses: string;
  time: string;
  free: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Captions", "Hashtags", "Ideas", "Profile", "Strategy"];

const TOOLS: Tool[] = [
  {
    id: 1,
    icon: "✍️",
    title: "Caption Generator",
    desc: "Craft scroll-stopping captions that spark engagement and drive follows.",
    longDesc: "Generate 30 unique captions tailored to your niche, tone, and platform in under 5 seconds.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    glowColor: "rgba(139,92,246,0.3)",
    category: "Captions",
    tag: "🔥 Popular",
    tagColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    uses: "1.2M+ uses",
    time: "~3 sec",
    free: true,
  },
  {
    id: 2,
    icon: "🏷️",
    title: "Hashtag Generator",
    desc: "Find high-reach niche hashtags that push your content to new audiences.",
    longDesc: "AI scans your content and generates a mix of micro, mid, and broad hashtags for maximum reach.",
    gradient: "from-pink-500 via-rose-500 to-red-400",
    glowColor: "rgba(236,72,153,0.3)",
    category: "Hashtags",
    tag: "⚡ Hot",
    tagColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    uses: "980K+ uses",
    time: "~2 sec",
    free: true,
  },
  {
    id: 3,
    icon: "🪝",
    title: "Hook Generator",
    desc: "Write opening lines so powerful, viewers can't swipe away.",
    longDesc: "Generate 20 proven hook formulas based on your niche — optimized for Reels & Shorts retention.",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    glowColor: "rgba(249,115,22,0.3)",
    category: "Captions",
    tag: "📈 Trending",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    uses: "750K+ uses",
    time: "~2 sec",
    free: true,
  },
  {
    id: 4,
    icon: "👤",
    title: "Bio Generator",
    desc: "Turn your profile into a follow magnet with an irresistible creator bio.",
    longDesc: "Enter your niche and personality — get 10 bio variations optimized to convert visitors to followers.",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    glowColor: "rgba(6,182,212,0.3)",
    category: "Profile",
    tag: "✨ Essential",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    uses: "620K+ uses",
    time: "~4 sec",
    free: true,
  },
  {
    id: 5,
    icon: "🔤",
    title: "Username Generator",
    desc: "Discover brandable, memorable handles that are actually available.",
    longDesc: "Combines your niche, keywords, and style to generate unique usernames with availability hints.",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    glowColor: "rgba(52,211,153,0.3)",
    category: "Profile",
    tag: "🆕 New",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    uses: "340K+ uses",
    time: "~2 sec",
    free: true,
  },
  {
    id: 6,
    icon: "⏰",
    title: "Best Time to Post",
    desc: "AI-powered scheduling based on your niche and target audience timezone.",
    longDesc: "Analyzes your niche's engagement patterns globally to recommend the exact hours and days to post.",
    gradient: "from-yellow-400 via-orange-400 to-orange-500",
    glowColor: "rgba(251,191,36,0.3)",
    category: "Strategy",
    tag: "🧠 Smart",
    tagColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    uses: "510K+ uses",
    time: "~1 sec",
    free: false,
  },
  {
    id: 7,
    icon: "🎬",
    title: "Reel Ideas Generator",
    desc: "Never run out of content with AI-driven viral Reel concepts for your niche.",
    longDesc: "Get 15 detailed Reel ideas including hook, script outline, and trending audio suggestions.",
    gradient: "from-fuchsia-500 via-purple-500 to-violet-600",
    glowColor: "rgba(192,38,211,0.3)",
    category: "Ideas",
    tag: "🚀 Viral",
    tagColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
    uses: "890K+ uses",
    time: "~5 sec",
    free: false,
  },
  {
    id: 8,
    icon: "🔥",
    title: "Trending Hashtags",
    desc: "Real-time trending tags refreshed every 30 minutes across all niches.",
    longDesc: "Live dashboard of the top trending hashtags by niche, refreshed constantly so you never post stale tags.",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    glowColor: "rgba(239,68,68,0.3)",
    category: "Hashtags",
    tag: "🔴 Live",
    tagColor: "bg-red-500/20 text-red-300 border-red-500/30",
    uses: "1.5M+ uses",
    time: "Real-time",
    free: false,
  },
];

// ─── Tool Modal ────────────────────────────────────────────────────────────────
function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const placeholders: Record<number, string> = {
    1: "e.g. Fitness motivation, morning routine...",
    2: "e.g. Skincare, beauty tips...",
    3: "e.g. Personal finance for millennials...",
    4: "e.g. Travel photographer & storyteller...",
    5: "e.g. fitness, wellness, mindset...",
    6: "e.g. Fashion, lifestyle, India...",
    7: "e.g. cooking, food recipes, Indian cuisine...",
    8: "e.g. Tech, AI, gadgets...",
  };

  const mockResults: Record<number, string[]> = {
    1: [
      "You don't need motivation. You need discipline. 🔥 #MindsetShift",
      "The only bad workout is the one that didn't happen. 💪",
      "Small steps every day = massive results every year. 📈 #GrowthMindset",
      "Your future self is watching your choices right now. Choose wisely. ⚡",
    ],
    2: [
      "#skincareroutine #glowingskin #skintok #cleanbeauty #koreanbeauty",
      "#skincaretips #selfcare #beautytips #glowup #skincarecommunity",
      "#niacinamide #hyaluronicacid #spf #moisturizer #acneskin",
    ],
    3: [
      "3 things nobody tells you about building wealth in your 20s 👇",
      "I saved $10,000 in 6 months doing this one weird thing...",
      "Stop budgeting. Start doing THIS instead. 🤫 #MoneyTips",
      "The money advice your parents never gave you (thread) 🧵",
    ],
    4: [
      "📸 Capturing moments that matter | Travel + Lifestyle | 47 countries & counting ✈️",
      "Storyteller with a camera 🌍 | Turning ordinary days into extraordinary memories",
      "Travel photographer 📷 | DM for collabs | New post every Tuesday 🗓️",
    ],
    5: [
      "@fitnesswithfire_", "@mindsetmover", "@trainharddaily",
      "@sweatandsucceed", "@grindandglow_", "@fitlifefuel",
    ],
    6: [
      "🏆 Best time: Tuesday & Thursday 7–9 PM IST",
      "📊 Highest reach: Saturday 6 AM & Sunday 8 PM",
      "🎯 Your audience is most active: Weekdays 12–2 PM",
    ],
    7: [
      "🎬 'POV: You started cooking at home instead of ordering out' — Show a satisfying meal prep with trending audio",
      "🎬 '3 ingredients, 10 minutes, restaurant quality' — Quick recipe reveal with text overlays",
      "🎬 'Things I wish I knew before learning to cook' — Talking head + B-roll of cooking fails & wins",
      "🎬 'Rate my meal prep for the week' — Sunday prep montage with satisfying cuts",
    ],
    8: [
      "#AItools 🔴 +240% this week", "#ChatGPT 🔴 Evergreen top 10",
      "#tecktok 🔴 Rising fast", "#futureofwork 🔴 Trending globally",
      "#artificialintelligence 🔴 Stable top 5", "#machinelearning 🔴 +18% today",
    ],
  };

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      setResults(mockResults[tool.id] || []);
      setLoading(false);
    }, 1400);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Panel */}
      <div
        className="relative z-10 w-full sm:max-w-lg bg-[#111118] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 80px ${tool.glowColor}` }}
      >
        {/* Header */}
        <div className={`relative p-6 bg-gradient-to-br ${tool.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{tool.icon}</span>
              <div>
                <h2 className="text-white font-black text-xl">{tool.title}</h2>
                <p className="text-white/70 text-sm mt-0.5">{tool.longDesc}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white text-2xl leading-none ml-4 mt-0.5"
            >
              ×
            </button>
          </div>
          <div className="relative flex gap-3 mt-4 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-semibold">{tool.uses}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-semibold">⚡ {tool.time}</span>
            {tool.free && (
              <span className="px-2.5 py-1 rounded-full bg-green-500/40 text-green-200 font-semibold">Free</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Input */}
          <div className="mb-4">
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block font-semibold">
              Your Niche / Topic
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder={placeholders[tool.id]}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/25 focus:bg-white/8 transition-all"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 bg-gradient-to-r ${tool.gradient} disabled:opacity-40 hover:scale-105 active:scale-95 whitespace-nowrap`}
              >
                {loading ? "..." : "Generate"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-2.5 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-xl bg-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && !loading && (
            <div className="space-y-2.5 mt-1 max-h-64 overflow-y-auto pr-1 custom-scroll">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between gap-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-4 py-3 transition-all duration-150"
                >
                  <p className="text-white/75 text-sm leading-relaxed">{result}</p>
                  <button
                    onClick={() => handleCopy(result, i)}
                    className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg transition-all duration-200 ${
                      copied === i
                        ? "bg-green-500/20 text-green-400"
                        : "text-white/20 hover:text-white/60 hover:bg-white/5"
                    }`}
                  >
                    {copied === i ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pro upsell */}
          {!tool.free && results.length === 0 && !loading && (
            <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-violet-900/30 to-fuchsia-900/20 border border-violet-500/20 text-center">
              <p className="text-white/60 text-sm mb-3">
                🔒 Unlock unlimited generations with <span className="text-fuchsia-400 font-bold">Creator Pro</span>
              </p>
              <a
                href="/pricing"
                className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold hover:scale-105 transition-transform"
              >
                Upgrade — $12/mo →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tool Card ────────────────────────────────────────────────────────────────
function ToolCard({ tool, onClick }: { tool: Tool; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl p-6 border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
      style={{ "--glow": tool.glowColor } as React.CSSProperties}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${tool.glowColor}, transparent 70%)` }}
      />

      {/* Tag */}
      <div className="flex items-center justify-between mb-5">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${tool.tagColor}`}>
          {tool.tag}
        </span>
        {!tool.free && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            Pro
          </span>
        )}
        {tool.free && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            Free
          </span>
        )}
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        style={{ boxShadow: `0 8px 24px ${tool.glowColor}` }}
      >
        {tool.icon}
      </div>

      {/* Content */}
      <h3 className="text-white font-black text-lg mb-2 group-hover:text-white transition-colors">
        {tool.title}
      </h3>
      <p className="text-white/45 text-sm leading-relaxed mb-5">{tool.desc}</p>

      {/* Footer meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-white/30">
          <span>{tool.uses}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>⚡ {tool.time}</span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0`}
        >
          Try it <span>→</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: "radial-gradient(ellipse at top left, #0f0020 0%, #0a0a0f 50%)",
        fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        h1,h2,h3,h4,.font-black { font-family: 'Syne', system-ui, sans-serif; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
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
            <a href="/pricing" className="hidden sm:block text-sm text-white/50 hover:text-white transition-colors">
              Pricing
            </a>
            <a
              href="/pricing"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-violet-500/20"
            >
              Go Pro →
            </a>
          </div>
        </div>
      </header>

      {/* ── Page Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12 px-4 overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fuchsia-700/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-semibold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            Creator Toolkit
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            All{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              8 AI Tools
            </span>
            , One Place
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Pick a tool, describe your niche, and let AI do the heavy lifting. Free to start.
          </p>
        </div>
      </section>

      {/* ── Filters + Search ──────────────────────────────────────────────── */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools — captions, hashtags, ideas..."
              className="w-full bg-white/[0.05] border border-white/[0.09] hover:border-white/[0.14] focus:border-violet-500/50 focus:bg-white/[0.07] rounded-2xl pl-12 pr-5 py-3.5 text-white text-sm placeholder-white/25 outline-none transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent shadow-lg shadow-violet-500/20 scale-105"
                    : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.07]"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Result count */}
            <span className="ml-2 text-xs text-white/25 font-medium">
              {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── Tools Grid ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-white/60 font-bold text-xl mb-2">No tools found</h3>
              <p className="text-white/30 text-sm">Try a different search or category</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-6 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm hover:bg-white/10 transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => setActiveTool(tool)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Pro Banner ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center border border-white/10 bg-gradient-to-br from-violet-900/40 to-fuchsia-900/20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Unlock All Tools.{" "}
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Go Pro.
                </span>
              </h2>
              <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
                Unlimited generations, all 8 tools, live trending data — for less than a coffee a week.
              </p>
              <a
                href="/pricing"
                className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
              >
                Start Creator Pro — $12/mo →
              </a>
              <p className="mt-4 text-white/25 text-sm">Cancel anytime. No lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool Modal ────────────────────────────────────────────────────── */}
      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}
    </main>
  );
}
