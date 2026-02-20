'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const TERMINAL_LINES = [
  { delay: 0,    text: '$ phantomit watch --on-save --daemon', type: 'cmd' },
  { delay: 800,  text: '✓ phantomit daemon started (pid 12847)', type: 'success' },
  { delay: 1400, text: 'mode: on-save — 8s debounce', type: 'dim' },
  { delay: 1800, text: 'watching: .', type: 'dim' },
  { delay: 3200, text: '[9:14:32 AM] ✎ src/auth.ts, ✚ src/middleware.ts', type: 'dim' },
  { delay: 4200, text: 'generating commit message...', type: 'thinking' },
  { delay: 5800, text: '✦ Commit message:', type: 'label' },
  { delay: 6300, text: '"feat(auth): add JWT validation middleware with token expiry handling"', type: 'message' },
  { delay: 7100, text: '[Y] commit & push   [E] edit   [N] skip', type: 'dim' },
  { delay: 7700, text: '→ y', type: 'cmd' },
  { delay: 8300, text: '✔ committed: feat(auth): add JWT validation middleware', type: 'success' },
  { delay: 8900, text: '✔ pushed to origin/main', type: 'success' },
];

function Terminal() {
  const [visible, setVisible] = useState<number[]>([]);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible([]);
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisible(prev => [...prev, i]);
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
      }, line.delay);
      timers.push(t);
    });
    const loop = setTimeout(() => setTick(t => t + 1), 12000);
    timers.push(loop);
    return () => timers.forEach(clearTimeout);
  }, [tick]);

  const color = (type: string) => {
    if (type === 'success') return 'text-emerald-400';
    if (type === 'message') return 'text-fuchsia-400';
    if (type === 'thinking') return 'text-fuchsia-400';
    if (type === 'label') return 'text-white/70';
    if (type === 'dim') return 'text-white/40';
    return 'text-slate-200';
  };

  return (
    <div className="rounded-xl overflow-hidden border border-fuchsia-500/20 shadow-[0_0_80px_rgba(217,70,239,0.1),0_40px_80px_rgba(0,0,0,0.5)]">
      <div className="bg-zinc-900 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ background: c }} className="w-2.5 h-2.5 rounded-full" />
        ))}
        <span className="ml-3 text-white/25 text-xs font-mono">phantomit — bash</span>
      </div>
      <div ref={ref} className="bg-[#0d0d0d] p-5 min-h-[300px] max-h-[340px] overflow-y-auto font-mono text-[13px] leading-relaxed">
        {TERMINAL_LINES.map((line, i) => (
          visible.includes(i) && (
            <div key={i} className={`mb-1.5 ${color(line.type)}`}>
              {line.type === 'thinking' ? (
                <span className="inline-flex items-center gap-2">
                  <span>{line.text}</span>
                  <span className="inline-flex gap-1">
                    {[0,1,2].map(d => (
                      <span key={d} className="w-1 h-1 rounded-full bg-fuchsia-400 inline-block animate-pulse" style={{ animationDelay: `${d*0.2}s` }} />
                    ))}
                  </span>
                </span>
              ) : line.text}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const MODES = [
  { cmd: 'phantomit watch --on-save', title: 'On Save', desc: 'Commits 8 seconds after your last save. All edits within the window batch into one clean commit.' },
  { cmd: 'phantomit watch --every 30', title: 'Interval', desc: 'Commits every X minutes if there are changes. Set it and forget it.' },
  { cmd: 'phantomit watch --lines 20', title: 'By Lines', desc: 'Commits when your diff crosses a line count threshold. Great for dense coding bursts.' },
  { cmd: 'phantomit push', title: 'Manual', desc: 'Trigger AI commit generation on demand. You control when, phantomit handles the message.' },
];

const STEPS = [
  { n:'01', title:'Install globally', desc:'One command, works in any git project.', code:'npm install -g phantomit' },
  { n:'02', title:'Init & add key', desc:'Creates config, then add your free Groq key.', code:'phantomit init' },
  { n:'03', title:'Start watching', desc:'Runs silently in the background while you code.', code:'phantomit watch --on-save --daemon' },
  { n:'04', title:'Approve & push', desc:'Y to push, E to edit, N to skip. Or daemon does it automatically.', code:'→ y  ✔ pushed to origin/main' },
];

export default function Landing() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText('npm install -g phantomit');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap');`}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <span className="font-mono text-sm text-white">phantom<span className="text-fuchsia-400">it</span></span>
        <div className="flex items-center gap-4 md:gap-7">
          <a href="#modes" className="hidden md:block text-xs text-white/50 hover:text-white transition-colors">Modes</a>
          <a href="#how" className="hidden md:block text-xs text-white/50 hover:text-white transition-colors">How it works</a>
          <Link href="/phantomit" className="hidden md:block text-xs text-white/50 hover:text-white transition-colors">Docs</Link>
          <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer"
            className="text-xs font-mono border border-white/15 text-white/50 px-3 py-1.5 rounded-md hover:border-fuchsia-400 hover:text-fuchsia-400 transition-all">
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full px-3.5 py-1 font-mono text-[11px] text-fuchsia-400 tracking-widest mb-7">
            ⚡ FREE & OPEN SOURCE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
            Git commits.<br /><span className="text-fuchsia-400">On autopilot.</span>
          </h1>
          <p className="text-[15px] font-light text-white/50 leading-relaxed mb-9 max-w-md">
            Phantomit watches your code, diffs your changes, and generates professional commit messages via Groq AI. Your GitHub graph stays green while you stay in flow.
          </p>
          <div className="flex items-center bg-zinc-900 border border-white/12 rounded-xl overflow-hidden max-w-xs mb-6">
            <span className="font-mono text-[13px] text-emerald-400 px-4 py-3 flex-1">npm install -g phantomit</span>
            <button onClick={copy} className="bg-fuchsia-500/10 border-l border-white/10 text-white/40 hover:text-fuchsia-400 hover:bg-fuchsia-500/20 px-4 py-3 font-mono text-[11px] transition-all">
              {copied ? 'copied!' : 'copy'}
            </button>
          </div>
          <div className="flex gap-3">
            <Link href="/phantomit" className="bg-fuchsia-500 text-white text-sm font-medium px-6 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(217,70,239,0.5)] transition-all shadow-[0_0_28px_rgba(217,70,239,0.3)]">
              Read the docs
            </Link>
            <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer"
              className="border border-white/12 text-white/50 text-sm px-6 py-3 rounded-lg hover:border-white/25 hover:text-white transition-all">
              View on GitHub
            </a>
          </div>
        </div>
        <div className="w-full">
          <Terminal />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-12" />

      {/* Modes */}
      <section id="modes" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-fuchsia-400 mb-3">Watch Modes</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12" style={{ fontFamily: "'Syne', sans-serif" }}>Works the way you work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODES.map(m => (
            <div key={m.title} className="bg-zinc-900/60 border border-white/[0.07] rounded-2xl p-7 hover:border-fuchsia-500/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(217,70,239,0.05)] transition-all duration-300">
              <div className="inline-block font-mono text-xs text-fuchsia-400 bg-fuchsia-500/8 border border-fuchsia-500/15 rounded-md px-3 py-1.5 mb-4">{m.cmd}</div>
              <div className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{m.title}</div>
              <p className="text-[13px] font-light text-white/45 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-12" />

      {/* How it works */}
      <section id="how" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-fuchsia-400 mb-3">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12" style={{ fontFamily: "'Syne', sans-serif" }}>Simple by design</h2>
        <div className="border-t border-white/[0.07]">
          {STEPS.map(s => (
            <div key={s.n} className="grid grid-cols-[48px_1fr] gap-6 py-8 border-b border-white/[0.07] items-start">
              <div className="text-4xl font-black text-fuchsia-500/20 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
              <div>
                <div className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{s.title}</div>
                <p className="text-[13px] font-light text-white/45 leading-relaxed mb-3">{s.desc}</p>
                <code className="inline-block font-mono text-[12px] text-emerald-400 bg-zinc-900 border border-white/[0.07] rounded-md px-3 py-2">{s.code}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-12" />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
          Ready to never write a<br /><span className="text-fuchsia-400">commit message again?</span>
        </h2>
        <p className="text-sm font-light text-white/40 mb-10">Free forever. No credit card. One command to install.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/phantomit" className="bg-fuchsia-500 text-white text-sm font-medium px-8 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all shadow-[0_0_28px_rgba(217,70,239,0.3)] hover:shadow-[0_0_48px_rgba(217,70,239,0.5)]">
            Get Started →
          </Link>
          <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer"
            className="border border-white/12 text-white/50 text-sm px-8 py-3.5 rounded-lg hover:border-white/25 hover:text-white transition-all">
            Star on GitHub ★
          </a>
        </div>
      </section>

      {/* Built by section */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 md:mx-12" />
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-zinc-900/40 border border-white/[0.07] rounded-2xl px-8 py-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-fuchsia-400 mb-2">The Developer</p>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Raphael Samuel
            </h3>
            <p className="text-[13px] font-light text-white/45 leading-relaxed max-w-xs">
              Fullstack developer. Built phantomit to solve a real problem — an empty GitHub graph despite coding every day.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Next.js','TypeScript','PHP','PostgreSQL','Go'].map(t => (
                <span key={t} className="font-mono text-[11px] text-white/30 bg-white/[0.04] border border-white/[0.07] rounded-md px-2.5 py-1">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <a href="https://github.com/var-raphael" target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400 text-sm px-5 py-2.5 rounded-lg hover:bg-fuchsia-500/20 transition-all whitespace-nowrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://var-raphael.vercel.app" target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 border border-white/10 text-white/40 text-sm px-5 py-2.5 rounded-lg hover:border-white/25 hover:text-white transition-all whitespace-nowrap">
              ↗ Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-white/20 tracking-wide">© 2026 phantomit — built by <a href="https://github.com/var-raphael" className="text-fuchsia-400">var-raphael</a></p>
        <div className="flex gap-6">
          <Link href="/phantomit" className="font-mono text-[11px] text-white/20 hover:text-white/50 transition-colors">Docs</Link>
          <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/20 hover:text-white/50 transition-colors">GitHub</a>
          <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/20 hover:text-white/50 transition-colors">Get Groq Key</a>
        </div>
      </footer>
    </div>
  );
}
