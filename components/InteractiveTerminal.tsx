'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, CornerDownLeft } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { soundFx } from '@/lib/sound';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <p className="text-amber font-semibold">⚡ Noor Ullah interactive terminal initialized.</p>
          <p className="text-sand text-xs mt-1">
            Type <code className="text-amber bg-amber/10 px-1 rounded">help</code> to see available commands or click quick shortcuts below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    soundFx.playHoverTick();

    let outputResponse: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        outputResponse = (
          <div className="space-y-1 text-xs">
            <p className="text-amber">Available commands:</p>
            <p><span className="text-amber font-mono">whoami</span> - About Noor Ullah</p>
            <p><span className="text-amber font-mono">skills</span> - Engineering stack & specialization</p>
            <p><span className="text-amber font-mono">contact</span> - Email & phone info</p>
            <p><span className="text-amber font-mono">hire</span> - Work inquiry details</p>
            <p><span className="text-amber font-mono">clear</span> - Clear terminal window</p>
          </div>
        );
        break;

      case 'whoami':
        outputResponse = (
          <div className="text-xs space-y-1">
            <p className="text-cream">{personalInfo.name} — Frontend Engineer</p>
            <p className="text-sand">{personalInfo.tagline}</p>
            <p className="text-muted">Based in {personalInfo.location}</p>
          </div>
        );
        break;

      case 'skills':
        outputResponse = (
          <div className="text-xs space-y-1">
            <p className="text-amber font-semibold">Core Engineering Stack:</p>
            <p className="text-sand">React · Next.js · TypeScript · TailwindCSS · WebGL / Three.js · GSAP · State Management</p>
          </div>
        );
        break;

      case 'contact':
        outputResponse = (
          <div className="text-xs space-y-1">
            <p className="text-amber">Email: <a href={`mailto:${personalInfo.email}`} className="underline text-sand">{personalInfo.email}</a></p>
            <p className="text-amber">Phone: {personalInfo.phone}</p>
            <p className="text-amber">GitHub: {personalInfo.github}</p>
          </div>
        );
        break;

      case 'hire':
        outputResponse = (
          <div className="text-xs p-3 rounded border border-amber/30 bg-amber/10 text-amber space-y-1">
            <p className="font-bold uppercase tracking-wider">🚀 Available for Full-Time & Select Contract Work</p>
            <p className="text-sand">Send a message to {personalInfo.email} to start a conversation!</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputResponse = (
          <p className="text-xs text-red-400">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-amber">help</span> for commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputResponse }]);
    setInput('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
  };

  return (
    <div className="warm-card overflow-hidden rounded-2xl border border-amber/20 bg-background/90 shadow-2xl">
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between border-b border-amber/15 bg-surface/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber flex items-center gap-1.5">
            <Terminal size={14} /> noor-ullah@portfolio:~
          </span>
        </div>
        <button
          type="button"
          onClick={() => setHistory([])}
          className="text-muted hover:text-amber transition"
          title="Clear Terminal"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Terminal Body Window */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-muted">
              <span className="text-amber">❯</span>
              <span className="text-sand font-semibold">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar & Quick Buttons */}
      <div className="border-t border-amber/15 bg-surface/50 p-3">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {['help', 'whoami', 'skills', 'contact', 'hire'].map((quickCmd) => (
            <button
              key={quickCmd}
              type="button"
              onClick={() => handleCommand(quickCmd)}
              className="rounded border border-amber/20 bg-amber/[0.06] px-2.5 py-1 text-[10px] font-mono text-amber hover:bg-amber/20 transition"
            >
              {quickCmd}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <span className="text-amber font-mono font-bold">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. skills, whoami)..."
            className="flex-1 bg-transparent font-mono text-xs text-cream outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            className="text-amber hover:text-white transition p-1"
            title="Execute command"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
