'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

type Tab = 'rag' | 'vitals' | 'pos';

interface RagStage {
  step: string;
  name: string;
  tech: string;
  badge: string;
  latency: string;
  desc: string;
  codePreview: {
    filename: string;
    json: string;
  };
}

const ragStages: RagStage[] = [
  {
    step: '01',
    name: 'Natural Query',
    tech: 'Client Input',
    badge: 'Input',
    latency: '< 5ms',
    desc: 'Unstructured natural language query captured with shopper locale & currency context.',
    codePreview: {
      filename: '01-search-request.json',
      json: JSON.stringify(
        {
          raw_query: 'wireless ANC earbuds under 15k',
          context: { locale: 'en-PK', currency: 'PKR' },
        },
        null,
        2
      ),
    },
  },
  {
    step: '02',
    name: 'Intent Extraction',
    tech: 'Gemini + Pydantic v2',
    badge: 'Parsing',
    latency: '85ms',
    desc: 'Zero-shot extraction of price ceilings, category filters, and intent into strict Pydantic schemas.',
    codePreview: {
      filename: '02-extracted-intent.json',
      json: JSON.stringify(
        {
          category: 'audio',
          price_max_pkr: 15000,
          features: ['anc'],
          confidence: 0.98,
        },
        null,
        2
      ),
    },
  },
  {
    step: '03',
    name: 'Local Embeddings',
    tech: 'bge-small-en-v1.5',
    badge: '0-Cost',
    latency: '18ms',
    desc: '384-dimensional dense vectors generated locally on CPU via ONNX. Zero API token fees or rate limits.',
    codePreview: {
      filename: '03-vector-embedding.json',
      json: JSON.stringify(
        {
          model: 'BAAI/bge-small-en-v1.5',
          dims: 384,
          runtime: 'Local CPU (ONNX)',
          cost: '$0.00',
        },
        null,
        2
      ),
    },
  },
  {
    step: '04',
    name: 'Vector Retrieval',
    tech: 'Qdrant Vector DB',
    badge: 'Sub-50ms',
    latency: '22ms',
    desc: 'Cosine semantic similarity combined with strict payload filters guarantees 100% in-stock catalog precision.',
    codePreview: {
      filename: '04-qdrant-filter.json',
      json: JSON.stringify(
        {
          collection: 'catalog_products',
          filter: { price: { lte: 15000 }, in_stock: true },
          retrieved: 12,
        },
        null,
        2
      ),
    },
  },
  {
    step: '05',
    name: 'Payload Delivery',
    tech: 'FastAPI + Next.js',
    badge: 'Verified',
    latency: '12ms',
    desc: 'Ranked, verified product cards delivered directly to the storefront UI with edge-cached payload responses.',
    codePreview: {
      filename: '05-catalog-response.json',
      json: JSON.stringify(
        {
          status: 200,
          matches: 12,
          top_result: { id: 'tb-8821', title: 'ANC Earbuds', price: 11499, score: 0.94 },
        },
        null,
        2
      ),
    },
  },
];

export default function ArchitectureHub() {
  const [activeTab, setActiveTab] = useState<Tab>('rag');
  const [selectedRagIndex, setSelectedRagIndex] = useState(1);

  return (
    <div className="w-full rounded-2xl border border-ink/10 bg-surface shadow-card overflow-hidden">
      {/* 1. Header Bar */}
      <div className="flex flex-col gap-3 border-b border-ink/[0.08] bg-canvas-subtle/70 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <Terminal size={13} className="text-amber" />
          <span className="text-ink font-medium">System Architecture</span>
          <span className="text-ink/20">/</span>
          <span className="text-ink-muted text-[11px]">Production Telemetry</span>
        </div>

        {/* Segmented Control Tab Selector */}
        <div className="flex rounded-lg border border-ink/[0.08] bg-canvas-subtle p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('rag')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
              activeTab === 'rag'
                ? 'bg-surface text-ink shadow-sm font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Bot size={13} className={activeTab === 'rag' ? 'text-amber' : ''} />
            <span>AI &amp; RAG Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vitals')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
              activeTab === 'vitals'
                ? 'bg-surface text-ink shadow-sm font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Gauge size={13} className={activeTab === 'vitals' ? 'text-amber' : ''} />
            <span>Core Web Vitals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
              activeTab === 'pos'
                ? 'bg-surface text-ink shadow-sm font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Layers size={13} className={activeTab === 'pos' ? 'text-amber' : ''} />
            <span>POS Architecture</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Canvas */}
      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: AI & RAG PIPELINE */}
          {activeTab === 'rag' && (
            <motion.div
              key="rag"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4 sm:space-y-5"
            >
              {/* 5-Stage Horizontal Pipeline Flow */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {ragStages.map((stage, idx) => {
                  const isSelected = selectedRagIndex === idx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => setSelectedRagIndex(idx)}
                      className={`group relative flex flex-col justify-between rounded-xl border p-2.5 sm:p-3 text-left transition-all duration-150 ${
                        isSelected
                          ? 'border-amber/40 bg-amber/[0.06] shadow-sm'
                          : 'border-ink/[0.08] bg-canvas hover:border-ink/20 hover:bg-canvas-subtle'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold tabular-nums ${isSelected ? 'text-amber' : 'text-ink-muted'}`}>
                          {stage.step}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted tabular-nums">
                          {stage.latency}
                        </span>
                      </div>

                      <div className="mt-2 sm:mt-3">
                        <p className="font-display text-xs font-semibold leading-tight text-ink">
                          {stage.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-ink-secondary truncate">
                          {stage.tech}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-1.5 border-t border-ink/[0.06] flex items-center justify-between font-mono text-[10px]">
                        <span className={isSelected ? 'text-amber font-semibold' : 'text-ink-muted'}>
                          {stage.badge}
                        </span>
                        <ArrowRight
                          size={11}
                          className={`transition-transform group-hover:translate-x-0.5 ${
                            isSelected ? 'text-amber' : 'text-ink-muted'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Inspector: Compact Rationale + Light IDE Data Payload */}
              <div className="rounded-xl border border-ink/10 bg-canvas overflow-hidden">
                <div className="flex items-center justify-between border-b border-ink/[0.08] bg-canvas-subtle/60 px-4 py-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber font-bold">0{selectedRagIndex + 1}</span>
                    <span className="text-ink font-semibold">{ragStages[selectedRagIndex].name}</span>
                    <span className="text-ink-muted text-[11px]">({ragStages[selectedRagIndex].tech})</span>
                  </div>
                  <span className="text-ink-muted text-[11px]">{ragStages[selectedRagIndex].codePreview.filename}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-ink/[0.08]">
                  <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3 bg-surface">
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {ragStages[selectedRagIndex].desc}
                    </p>

                    <div className="flex items-center gap-3 font-mono text-xs text-ink-muted pt-2 border-t border-ink/[0.06]">
                      <span className="inline-flex items-center gap-1 text-emerald font-medium">
                        <CheckCircle2 size={12} /> Production Verified
                      </span>
                      <span>·</span>
                      <span>Latency: <strong className="text-ink tabular-nums">{ragStages[selectedRagIndex].latency}</strong></span>
                    </div>
                  </div>

                  {/* Compact Stone Code Preview */}
                  <div className="p-3.5 bg-canvas-subtle overflow-x-auto flex items-center">
                    <pre className="font-mono text-xs text-ink leading-snug">
                      <code>{ragStages[selectedRagIndex].codePreview.json}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CORE WEB VITALS */}
          {activeTab === 'vitals' && (
            <motion.div
              key="vitals"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-3.5">
                  <span className="font-mono text-[10px] uppercase text-ink-muted">LCP</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink tabular-nums">1.1s</div>
                  <p className="font-mono text-[11px] text-emerald font-medium">Target &lt; 2.5s</p>
                </div>
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-3.5">
                  <span className="font-mono text-[10px] uppercase text-ink-muted">FCP</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink tabular-nums">0.8s</div>
                  <p className="font-mono text-[11px] text-emerald font-medium">Sub-second Paint</p>
                </div>
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-3.5">
                  <span className="font-mono text-[10px] uppercase text-ink-muted">CLS</span>
                  <div className="mt-1 font-display text-2xl font-bold text-ink tabular-nums">0.00</div>
                  <p className="font-mono text-[11px] text-emerald font-medium">Zero Layout Shift</p>
                </div>
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-3.5">
                  <span className="font-mono text-[10px] uppercase text-ink-muted">Scale</span>
                  <div className="mt-1 font-display text-2xl font-bold text-amber tabular-nums">300K+</div>
                  <p className="font-mono text-[11px] text-ink-secondary">Active Shoppers</p>
                </div>
              </div>

              {/* 2 Clean Architectural Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber font-display text-xs font-bold">
                    <Cpu size={14} />
                    <span>Streaming &amp; SSR Boundaries</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Decoupled server component catalog shells from dynamic client islands to minimize initial JS bundle size.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber font-display text-xs font-bold">
                    <Zap size={14} />
                    <span>State Caching Architecture</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Atomic Zustand selectors combined with TanStack Query v5 prevent cascading re-renders across the 40K+ item grid.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: POS ARCHITECTURE */}
          {activeTab === 'pos' && (
            <motion.div
              key="pos"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* 3 Focused Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber font-display text-xs font-bold">
                    <ShieldCheck size={15} />
                    <span>Server-Authoritative</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Zero client-side trust: all item pricing, tax rules, and discount vouchers verified with expected-total checksums.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber font-display text-xs font-bold">
                    <Database size={15} />
                    <span>11,000+ Transactions</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Real-time inventory synchronization across multi-branch warehouses with optimistic local UI rollbacks on network drops.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/[0.08] bg-canvas p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber font-display text-xs font-bold">
                    <Sparkles size={15} />
                    <span>Merchant Dispatch</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Automated SMS verification triggers, spam protection queues, and instant shopkeeper dispatch workflows for retail order fulfillment.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
