'use client';

import { useState } from 'react';
import Link from 'next/link';

const SECTIONS = [
  { id: 'installation', label: 'Installation' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'commands', label: 'Commands' },
  { id: 'modes', label: 'Watch Modes' },
  { id: 'prompt', label: 'The Prompt' },
  { id: 'config', label: 'Configuration' },
  { id: 'apikeys', label: 'API Keys' },
  { id: 'gitignore', label: '.gitignore' },
  { id: 'howitworks', label: 'How It Works' },
];

const COMMANDS = [
  { cmd: 'phantomit init', desc: 'Create .phantomit.json config in current project' },
  { cmd: 'phantomit watch --every 30', desc: 'Auto commit every 30 minutes if changes exist' },
  { cmd: 'phantomit watch --lines 20', desc: 'Auto commit when 20+ lines have changed' },
  { cmd: 'phantomit watch --on-save', desc: 'Commit 8s after your last file save' },
  { cmd: 'phantomit watch --on-save --daemon', desc: 'Same but runs silently in background' },
  { cmd: 'phantomit push', desc: 'Manually trigger an AI commit right now' },
  { cmd: 'phantomit push --mock', desc: 'Test the flow without a Groq API key' },
  { cmd: 'phantomit stop', desc: 'Stop the background daemon' },
  { cmd: 'phantomit status', desc: 'Check if daemon is running + recent activity' },
];

const CONFIG = [
  { f:'mode',     d:'"interval"', desc:'Watch mode: interval, lines, on-save, manual' },
  { f:'interval', d:'30',         desc:'Minutes between commits in interval mode' },
  { f:'lines',    d:'20',         desc:'Line threshold for lines mode' },
  { f:'debounce', d:'8',          desc:'Seconds to wait after last save before triggering' },
  { f:'autoPush', d:'true',       desc:'Auto push to remote after committing' },
  { f:'watch',    d:'["."]',      desc:'Directories to watch. Defaults to entire project.' },
  { f:'ignore',   d:'[...]',      desc:'Extra ignore patterns. Merged with .gitignore automatically.' },
  { f:'branch',   d:'"main"',     desc:'Branch to push to' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CodeBlock({ children, lang, copyText }: { children: React.ReactNode; lang?: string; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#111]">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/[0.06]">
        <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">{lang ?? 'bash'}</span>
        {copyText && (
          <button onClick={copy} className={`font-mono text-[10px] border px-2.5 py-1 rounded transition-all ${copied ? 'border-emerald-500/50 text-emerald-400' : 'border-white/10 text-white/30 hover:border-fuchsia-400/50 hover:text-fuchsia-400'}`}>
            {copied ? 'copied!' : 'copy'}
          </button>
        )}
      </div>
      <div className="px-5 py-4 font-mono text-[13px] leading-[2] overflow-x-auto">{children}</div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 border border-fuchsia-500/25 bg-fuchsia-500/[0.06] rounded-lg px-5 py-4 text-[13px] font-light text-white/50 leading-relaxed">
      {children}
    </div>
  );
}

function Ic({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[12px] bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded px-1.5 py-0.5">{children}</code>;
}

export default function DocsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('installation');

  const handleNav = (id: string) => {
    setActive(id);
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap');`}</style>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/[0.06] flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="font-mono text-sm text-white">phantom<span className="text-fuchsia-400">it</span> <span className="text-white/25">/ docs</span></Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white/40 hover:text-white transition-colors">
          {menuOpen ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l12 12M15 3L3 15"/></svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 5h14M2 9h14M2 13h14"/></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-[49px] left-0 right-0 z-40 bg-[#111] border-b border-white/[0.06] py-3">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => handleNav(s.id)}
              className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${active === s.id ? 'text-fuchsia-400' : 'text-white/40 hover:text-white'}`}>
              {s.label}
            </button>
          ))}
          <div className="mx-5 mt-3 pt-3 border-t border-white/[0.06] flex gap-4">
            <Link href="/" className="text-xs font-mono text-white/25 hover:text-white/50 transition-colors">← Landing</Link>
            <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer" className="text-xs font-mono text-white/25 hover:text-white/50 transition-colors">GitHub ↗</a>
          </div>
        </div>
      )}

      <div className="lg:flex">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-60 bg-[#111] border-r border-white/[0.07] overflow-y-auto z-40">
          <div className="px-6 pt-7 pb-5 border-b border-white/[0.07]">
            <Link href="/" className="font-mono text-[15px] text-white hover:text-fuchsia-400 transition-colors block">
              phantom<span className="text-fuchsia-400">it</span>
            </Link>
            <p className="font-mono text-[11px] text-white/25 mt-1">v1.0.0 — documentation</p>
          </div>
          <nav className="flex-1 py-5">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20 px-6 pb-3">Getting Started</p>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => handleNav(s.id)}
                className={`w-full text-left px-6 py-2 text-[13px] transition-all border-l-2 ${
                  active === s.id
                    ? 'text-fuchsia-400 border-fuchsia-400 bg-fuchsia-500/[0.07]'
                    : 'text-white/40 border-transparent hover:text-white hover:bg-white/[0.03]'
                }`}>
                {s.label}
              </button>
            ))}
          </nav>
          <div className="px-6 py-5 border-t border-white/[0.07] flex flex-col gap-3">
            <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer"
              className="font-mono text-[11px] text-white/25 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
              ↗ GitHub
            </a>
            <a href="https://console.groq.com" target="_blank" rel="noreferrer"
              className="font-mono text-[11px] text-white/25 hover:text-fuchsia-400 transition-colors">
              ↗ Get Groq Key
            </a>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:ml-60 flex-1 min-w-0 px-6 md:px-14 pt-20 lg:pt-14 pb-24 lg:max-w-4xl">

          {/* Installation */}
          <section id="installation" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>Installation</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">Phantomit is a global CLI tool. Install it once and use it in any git project on your machine.</p>
            <CodeBlock copyText="npm install -g phantomit">
              <div><span className="text-white/30">$</span> <span className="text-slate-200">npm install -g phantomit</span></div>
            </CodeBlock>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">
              Requires Node.js 18+. You'll also need a free Groq API key from{' '}
              <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-fuchsia-400 hover:underline">console.groq.com</a> — no credit card required.
            </p>
          </section>

          {/* Quick Start */}
          <section id="quickstart" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>Quick Start</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">Up and running in under a minute.</p>
            <CodeBlock>
              <div className="text-white/25"># 1. go into any git project</div>
              <div><span className="text-white/30">$</span> <span className="text-slate-200">cd your-project</span></div>
              <br/>
              <div className="text-white/25"># 2. setup phantomit</div>
              <div><span className="text-white/30">$</span> <span className="text-slate-200">phantomit init</span></div>
              <div className="text-emerald-400">✓ .phantomit.json created</div>
              <br/>
              <div className="text-white/25"># 3. add your groq key</div>
              <div><span className="text-white/30">$</span> <span className="text-slate-200">echo <span className="text-emerald-400">"GROQ_API_KEY=your_key"</span> &gt;&gt; .env</span></div>
              <br/>
              <div className="text-white/25"># 4. start watching in background</div>
              <div><span className="text-white/30">$</span> <span className="text-slate-200">phantomit watch --on-save --daemon</span></div>
              <div className="text-emerald-400">✓ phantomit daemon started (pid 12847)</div>
            </CodeBlock>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">That's it. Edit files, save them, and phantomit handles the rest silently in the background.</p>
          </section>

          {/* Commands */}
          <section id="commands" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>Commands</h2>

            {/* Mobile — stacked cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {COMMANDS.map(c => (
                <div key={c.cmd} className="bg-zinc-900/60 border border-white/[0.07] rounded-xl p-4">
                  <div className="font-mono text-[12px] text-fuchsia-400 mb-2 break-all">{c.cmd}</div>
                  <div className="text-[13px] font-light text-white/40">{c.desc}</div>
                </div>
              ))}
            </div>

            {/* Desktop — table */}
            <div className="hidden md:block rounded-xl overflow-x-auto border border-white/[0.07]">
              <table className="w-full text-[13px] min-w-[560px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="font-mono text-[10px] tracking-widest uppercase text-white/20 text-left px-4 py-3">Command</th>
                    <th className="font-mono text-[10px] tracking-widest uppercase text-white/20 text-left px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMANDS.map((c, i) => (
                    <tr key={c.cmd} className={`${i < COMMANDS.length - 1 ? 'border-b border-white/[0.05]' : ''} hover:bg-white/[0.02] transition-colors`}>
                      <td className="font-mono text-[12px] text-fuchsia-400 px-4 py-3 whitespace-nowrap">{c.cmd}</td>
                      <td className="text-white/40 font-light px-4 py-3">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Watch Modes */}
          <section id="modes" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>Watch Modes</h2>

            <h3 className="text-base font-bold text-white mt-7 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>--on-save</h3>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">Triggers a commit 8 seconds after your last file save. All saves within that window are batched into one commit — so editing 5 files quickly results in one clean commit, not five.</p>
            <CodeBlock>
              <div><span className="text-slate-200">phantomit watch --on-save</span><span className="text-white/25">           # foreground</span></div>
              <div><span className="text-slate-200">phantomit watch --on-save --daemon</span><span className="text-white/25">  # background</span></div>
            </CodeBlock>

            <h3 className="text-base font-bold text-white mt-7 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>--every &lt;minutes&gt;</h3>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">Commits on a fixed time interval if there are uncommitted changes. Fully hands-off.</p>
            <CodeBlock>
              <div><span className="text-slate-200">phantomit watch --every 30</span><span className="text-white/25">   # every 30 minutes</span></div>
              <div><span className="text-slate-200">phantomit watch --every 10</span><span className="text-white/25">   # every 10 minutes</span></div>
            </CodeBlock>

            <h3 className="text-base font-bold text-white mt-7 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>--lines &lt;count&gt;</h3>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">Commits when the accumulated diff exceeds a line count. Best for dense coding bursts.</p>
            <CodeBlock>
              <div><span className="text-slate-200">phantomit watch --lines 20</span><span className="text-white/25">   # every 20 lines</span></div>
            </CodeBlock>

            <h3 className="text-base font-bold text-white mt-7 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>phantomit push</h3>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">No automation — trigger AI commit generation manually whenever you're ready.</p>
            <CodeBlock>
              <div><span className="text-slate-200">phantomit push</span><span className="text-white/25">         # commit now</span></div>
              <div><span className="text-slate-200">phantomit push --mock</span><span className="text-white/25">   # test without Groq key</span></div>
            </CodeBlock>

            <Callout>
              <strong className="text-fuchsia-400 font-medium">--daemon flag</strong> — append to any watch command to run phantomit in the background. Logs go to <Ic>.phantomit.log</Ic>. Use <Ic>phantomit status</Ic> to check activity, <Ic>phantomit stop</Ic> to kill it.
            </Callout>
          </section>

          {/* The Prompt */}
          <section id="prompt" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>The Prompt</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-5">In foreground mode, every commit trigger shows you the AI-generated message before doing anything. You are always in control.</p>
            <div className="rounded-xl overflow-hidden border border-fuchsia-500/20 font-mono text-[13px]">
              <div className="bg-zinc-900 px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.05]">
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ background: c }} className="w-2.5 h-2.5 rounded-full" />)}
                <span className="ml-2 text-white/25 text-xs">phantomit</span>
              </div>
              <div className="bg-[#0d0d0d] p-5 leading-[2.1]">
                <div className="text-white/35">[9:14 AM] ✎ src/auth.ts, ✚ src/middleware.ts</div>
                <br/>
                <div className="text-white/65">✦ Commit message:</div>
                <div className="text-fuchsia-400">"feat(auth): add JWT validation middleware with token expiry handling"</div>
                <br/>
                <div className="text-white/30">[Y] commit & push   [E] edit message   [N] skip</div>
                <br/>
                <div className="text-white/55">→ <span className="text-slate-200">y</span></div>
                <div className="text-emerald-400">✔ committed: feat(auth): add JWT validation middleware</div>
                <div className="text-emerald-400">✔ pushed to origin/main</div>
              </div>
            </div>
            <ul className="mt-5 space-y-2">
              {[
                ['Y', 'Commit and push with the generated message'],
                ['E', 'Edit the message before committing'],
                ['N', 'Skip this commit entirely'],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start gap-3 text-[13px] font-light text-white/45">
                  <span className="text-fuchsia-400 font-mono font-medium mt-0.5">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mt-5">In daemon mode (<Ic>--daemon</Ic>), the prompt is skipped and commits happen automatically. All activity is logged to <Ic>.phantomit.log</Ic>.</p>
          </section>

          {/* Config */}
          <section id="config" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>Configuration</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">Running <Ic>phantomit init</Ic> creates a <Ic>.phantomit.json</Ic> in your project root. CLI flags always override config values.</p>
            <CodeBlock lang="json">
              <div className="text-white/50">{'{'}</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"mode"</span>: <span className="text-emerald-400">"interval"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"interval"</span>: <span className="text-emerald-400">30</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"lines"</span>: <span className="text-emerald-400">20</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"debounce"</span>: <span className="text-emerald-400">8</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"autoPush"</span>: <span className="text-emerald-400">true</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"watch"</span>: <span className="text-emerald-400">["." ]</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"ignore"</span>: <span className="text-emerald-400">["node_modules", ".git"]</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-fuchsia-400">"branch"</span>: <span className="text-emerald-400">"main"</span></div>
              <div className="text-white/50">{'}'}</div>
            </CodeBlock>
            <div className="rounded-xl overflow-hidden border border-white/[0.07] mt-4">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="font-mono text-[10px] tracking-widest uppercase text-white/20 text-left px-4 py-3">Field</th>
                    <th className="font-mono text-[10px] tracking-widest uppercase text-white/20 text-left px-4 py-3">Default</th>
                    <th className="font-mono text-[10px] tracking-widest uppercase text-white/20 text-left px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {CONFIG.map((r, i) => (
                    <tr key={r.f} className={`${i < CONFIG.length - 1 ? 'border-b border-white/[0.05]' : ''} hover:bg-white/[0.02] transition-colors`}>
                      <td className="font-mono text-[12px] text-fuchsia-400 px-4 py-3 whitespace-nowrap">{r.f}</td>
                      <td className="font-mono text-[12px] text-emerald-400/80 px-4 py-3 whitespace-nowrap">{r.d}</td>
                      <td className="text-white/40 font-light px-4 py-3">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* API Keys */}
          <section id="apikeys" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>API Keys</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">Phantomit reads your Groq key from <Ic>.env</Ic>. It supports unlimited keys for automatic rotation — useful for spreading rate limits across free accounts.</p>
            <CodeBlock lang="env">
              <div className="text-white/25"># single key — works fine</div>
              <div><span className="text-slate-200">GROQ_API_KEY</span>=<span className="text-emerald-400">your_key_here</span></div>
              <br/>
              <div className="text-white/25"># multiple keys — no limit, picked at random per commit</div>
              <div><span className="text-slate-200">GROQ_API_KEY_1</span>=<span className="text-emerald-400">first_key</span></div>
              <div><span className="text-slate-200">GROQ_API_KEY_2</span>=<span className="text-emerald-400">second_key</span></div>
              <div><span className="text-slate-200">GROQ_API_KEY_3</span>=<span className="text-emerald-400">third_key</span></div>
              <div className="text-white/25"># GROQ_API_KEY_4, _5, _10... all work</div>
            </CodeBlock>
            <p className="text-[14px] font-light text-white/50 leading-relaxed">
              Any env variable matching <Ic>GROQ_API_KEY_*</Ic> is picked up automatically. Get free keys at{' '}
              <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-fuchsia-400 hover:underline">console.groq.com</a>.
            </p>
            <Callout>
              <strong className="text-fuchsia-400 font-medium">Never commit your .env file.</strong> Make sure <Ic>.env</Ic> is in your <Ic>.gitignore</Ic>. Phantomit reads your gitignore automatically and won't watch or commit your <Ic>.env</Ic>.
            </Callout>
          </section>

          {/* gitignore */}
          <section id="gitignore" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>.gitignore Integration</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">
              Phantomit automatically reads your <Ic>.gitignore</Ic> and uses it as the watcher's ignore list. You never have to duplicate your ignore patterns.
            </p>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-4">
              The <Ic>ignore</Ic> field in <Ic>.phantomit.json</Ic> is additive — it merges on top of your gitignore. So <Ic>node_modules</Ic>, <Ic>dist</Ic>, <Ic>.env</Ic> and anything else in gitignore is automatically excluded.
            </p>
            <Callout>
              All standard gitignore syntax is supported — negations (<Ic>!important.js</Ic>), globs (<Ic>**/*.log</Ic>), trailing slashes (<Ic>dist/</Ic>). Powered by the <Ic>ignore</Ic> npm library.
            </Callout>
          </section>

          {/* How it works */}
          <section id="howitworks" className="mb-20 scroll-mt-8">
            <h2 className="text-2xl font-bold text-white tracking-tight pb-4 mb-5 border-b border-white/[0.07]" style={{ fontFamily: "'Syne', sans-serif" }}>How It Works</h2>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mb-5">Four simple steps run on every trigger:</p>
            <div className="space-y-0 border-t border-white/[0.07]">
              {[
                { n:'01', t:'Detect', d: <>File changes are detected by <strong className="text-white/70 font-medium">chokidar</strong> and batched within the debounce window into a single event. All event types are tracked — creates, edits, deletes, and folder changes.</> },
                { n:'02', t:'Diff', d: <><Ic>git add .</Ic> stages everything, then <Ic>git diff --staged</Ic> captures the full diff. Git is the source of truth — no manual file snapshotting needed.</> },
                { n:'03', t:'Generate', d: <>The diff is sent to <strong className="text-white/70 font-medium">Groq's llama-3.1-8b-instant</strong> with a strict conventional commits prompt. Max 60 tokens, 10-20 words, specific and professional.</> },
                { n:'04', t:'Commit & Push', d: <>The message is shown for approval (or auto-committed in daemon mode). If approved, <Ic>git commit</Ic> then <Ic>git push</Ic> sends it to your remote.</> },
              ].map(s => (
                <div key={s.n} className="grid grid-cols-[44px_1fr] gap-5 py-7 border-b border-white/[0.07]">
                  <div className="text-3xl font-black text-fuchsia-500/20 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                  <div>
                    <div className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{s.t}</div>
                    <p className="text-[13px] font-light text-white/45 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[14px] font-light text-white/50 leading-relaxed mt-6">
              If a commit is in progress when a new trigger fires, it's queued and runs immediately after — nothing is ever silently dropped.
            </p>
          </section>

          {/* Bottom nav */}
          <div className="flex items-center justify-between pt-8 border-t border-white/[0.07]">
            <Link href="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              ← Back to landing
            </Link>
            <a href="https://github.com/var-raphael/phantomit" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-fuchsia-400 transition-colors font-mono">
              GitHub ↗
            </a>
          </div>

        </main>
      </div>
    </div>
  );
}
