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
    name: 'Natural Language Query',
    tech: 'Client Input',
    badge: 'Input',
    latency: '< 5ms',
    desc: 'Unstructured user search query received from the client-side search bar with user locale and currency context.',
    codePreview: {
      filename: '01-search-request.json',
      json: JSON.stringify(
        {
          raw_query: 'wireless ANC earbuds under 15k with long battery',
          client_context: {
            locale: 'en-PK',
            currency: 'PKR',
            channel: 'mobile_web',
          },
        },
        null,
        2
      ),
    },
  },
  {
    step: '02',
    name: 'Zero-Shot Intent Extraction',
    tech: 'Gemini + Pydantic v2',
    badge: 'Parsing',
    latency: '85ms',
    desc: 'Google Gemini extracts structured parameters, category constraints, and price ceilings into strict Pydantic v2 schemas.',
    codePreview: {
      filename: '02-extracted-intent.json',
      json: JSON.stringify(
        {
          intent: 'catalog_search',
          category: 'audio_wearables',
          parsed_filters: {
            price_max_pkr: 15000,
            features: ['active_noise_cancellation', 'extended_battery'],
            in_stock_only: true,
          },
          confidence: 0.98,
        },
        null,
        2
      ),
    },
  },
  {
    step: '03',
    name: 'Local Vector Embeddings',
    tech: 'BAAI/bge-small-en-v1.5',
    badge: '0-Cost Embedding',
    latency: '18ms',
    desc: 'Generates 384-dimensional dense vectors locally on CPU via ONNX runtime, eliminating external API rate limits and recurring token costs.',
    codePreview: {
      filename: '03-vector-embedding.json',
      json: JSON.stringify(
        {
          embedding_model: 'BAAI/bge-small-en-v1.5',
          dimensions: 384,
          runtime: 'Local CPU (ONNX)',
          vector_sample: [0.0381, -0.0912, 0.0543, 0.1128, -0.0452, '... +379 dims'],
          api_token_cost: '$0.00',
        },
        null,
        2
      ),
    },
  },
  {
    step: '04',
    name: 'Hybrid Metadata Retrieval',
    tech: 'Qdrant Vector DB',
    badge: 'Sub-50ms',
    latency: '22ms',
    desc: 'Combines cosine semantic similarity with strict SQL-like payload filters for 100% in-stock catalog precision.',
    codePreview: {
      filename: '04-qdrant-filter.json',
      json: JSON.stringify(
        {
          collection: 'techbazaar_products',
          vector_similarity: 'CosineSimilarity',
          payload_filter: {
            must: [
              { key: 'price', range: { lte: 15000 } },
              { key: 'stock_quantity', range: { gt: 0 } },
            ],
          },
          retrieved_records: 12,
        },
        null,
        2
      ),
    },
  },
  {
    step: '05',
    name: 'Grounded JSON Delivery',
    tech: 'FastAPI + Next.js',
    badge: 'Verified Output',
    latency: '12ms',
    desc: 'Delivers ranked, verified product cards directly to the Next.js catalog component with instant client-side caching.',
    codePreview: {
      filename: '05-catalog-response.json',
      json: JSON.stringify(
        {
          status: 200,
          total_matches: 12,
          top_results: [
            { id: 'tb-8821', title: 'Soundpeats T2 ANC Earbuds', price_pkr: 11499, score: 0.94 },
            { id: 'tb-6540', title: 'QCY HT05 Melobuds ANC', price_pkr: 8999, score: 0.91 },
          ],
          cache_ttl: '300s',
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
    <div className="w-full rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden">
      {/* 1. Header Bar: Window controls + Tab switcher */}
      <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Left: Window pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <Terminal size={13} className="text-amber" />
            <span>system-inspector.ts</span>
          </div>
        </div>

        {/* Center/Right: Tab Selector */}
        <div className="flex rounded-lg border border-white/10 bg-black/50 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('rag')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'rag'
                ? 'bg-amber/20 text-amber shadow-sm font-semibold'
                : 'text-muted hover:text-cream'
            }`}
          >
            <Bot size={13} />
            <span>AI & RAG Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vitals')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'vitals'
                ? 'bg-amber/20 text-amber shadow-sm font-semibold'
                : 'text-muted hover:text-cream'
            }`}
          >
            <Gauge size={13} />
            <span>Core Web Vitals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'pos'
                ? 'bg-amber/20 text-amber shadow-sm font-semibold'
                : 'text-muted hover:text-cream'
            }`}
          >
            <Layers size={13} />
            <span>POS Architecture</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Canvas */}
      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {/* TAB 1: AI & RAG PIPELINE */}
          {activeTab === 'rag' && (
            <motion.div
              key="rag"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">
                    TechVault AI: Production RAG & Vector Pipeline
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    End-to-end flow from natural query extraction down to sub-50ms vector catalog retrieval.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                    <CheckCircle2 size={12} />
                    <span>Production Deployed</span>
                  </span>
                </div>
              </div>

              {/* 5-Stage Horizontal Pipeline Flow */}
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                  Pipeline Execution Stages (Click to Inspect Data Contract):
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
                  {ragStages.map((stage, idx) => {
                    const isSelected = selectedRagIndex === idx;
                    return (
                      <button
                        key={stage.step}
                        type="button"
                        onClick={() => setSelectedRagIndex(idx)}
                        className={`group relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all duration-150 ${
                          isSelected
                            ? 'border-amber bg-amber/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-xs font-bold ${
                              isSelected ? 'text-amber' : 'text-muted'
                            }`}
                          >
                            {stage.step}
                          </span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                            {stage.latency}
                          </span>
                        </div>

                        <div className="mt-3">
                          <p className="font-display text-xs font-semibold leading-tight text-cream">
                            {stage.name}
                          </p>
                          <p className="mt-1 font-mono text-[10px] text-sand/70 truncate">
                            {stage.tech}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                          <span className={`${isSelected ? 'text-amber' : 'text-muted'}`}>
                            {stage.badge}
                          </span>
                          <ArrowRight
                            size={11}
                            className={`transition-transform group-hover:translate-x-0.5 ${
                              isSelected ? 'text-amber' : 'text-muted'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Inspector: Split Execution Rationale & Data Payload */}
              <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-sand">
                    <span className="font-bold text-amber">STAGE {ragStages[selectedRagIndex].step}:</span>
                    <span className="text-cream font-semibold">{ragStages[selectedRagIndex].name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    {ragStages[selectedRagIndex].codePreview.filename}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                  {/* Left: Engineering Rationale */}
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        Architectural Role & Logic
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-sand">
                        {ragStages[selectedRagIndex].desc}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3.5 space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-amber font-semibold">
                        Technical Guarantee:
                      </span>
                      <p className="text-xs text-muted leading-relaxed">
                        {selectedRagIndex === 0 && 'Validated on input to protect backend services against prompt injection and malformed query strings.'}
                        {selectedRagIndex === 1 && 'Strict Pydantic v2 validation guarantees typed integer ceilings, stock booleans, and valid catalog taxonomy.'}
                        {selectedRagIndex === 2 && 'Runs 100% locally on CPU with ONNX runtime. Zero recurring third-party API costs or quota exhaustion risks.'}
                        {selectedRagIndex === 3 && 'Cosine vector distance combined with payload filters ensures zero out-of-stock or out-of-budget recommendations.'}
                        {selectedRagIndex === 4 && 'Pre-serialized response cached at edge layer with 300s TTL for identical queries.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted">
                      <span>Latency: <strong className="text-cream">{ragStages[selectedRagIndex].latency}</strong></span>
                      <span>·</span>
                      <span>Tech: <strong className="text-amber">{ragStages[selectedRagIndex].tech}</strong></span>
                    </div>
                  </div>

                  {/* Right: Live Data Contract / JSON Preview */}
                  <div className="p-4 bg-[#07090e] overflow-x-auto">
                    <pre className="font-mono text-xs text-emerald-400 leading-relaxed">
                      <code>{ragStages[selectedRagIndex].codePreview.json}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CORE WEB VITALS & SCALE */}
          {activeTab === 'vitals' && (
            <motion.div
              key="vitals"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">
                    TechBazaar.pk: 92+ Lighthouse Performance Architecture
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Engineered for sub-second paint times on high-density 40K+ item e-commerce catalogs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-xs text-amber">
                    <Sparkles size={12} />
                    <span>Lighthouse Score: 92 / 100</span>
                  </span>
                </div>
              </div>

              {/* 4 Symmetric Core Web Vitals Blocks */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* Metric 1 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">LCP</span>
                      <span className="rounded bg-emerald/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald">Good &lt;2.5s</span>
                    </div>
                    <div className="mt-2 font-display text-3xl font-bold text-cream">1.1s</div>
                    <p className="mt-1 text-xs font-semibold text-sand">Largest Contentful Paint</p>
                  </div>
                  <p className="mt-3 border-t border-white/5 pt-2 font-mono text-[11px] text-muted">
                    Pre-rendered hero assets & static shell streaming.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">FCP</span>
                      <span className="rounded bg-emerald/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald">Good &lt;1.8s</span>
                    </div>
                    <div className="mt-2 font-display text-3xl font-bold text-cream">0.8s</div>
                    <p className="mt-1 text-xs font-semibold text-sand">First Contentful Paint</p>
                  </div>
                  <p className="mt-3 border-t border-white/5 pt-2 font-mono text-[11px] text-muted">
                    Sub-second initial server response.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">CLS</span>
                      <span className="rounded bg-emerald/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald">Zero Shift</span>
                    </div>
                    <div className="mt-2 font-display text-3xl font-bold text-cream">0.00</div>
                    <p className="mt-1 text-xs font-semibold text-sand">Cumulative Layout Shift</p>
                  </div>
                  <p className="mt-3 border-t border-white/5 pt-2 font-mono text-[11px] text-muted">
                    Explicit aspect-ratio bounds on all catalog media.
                  </p>
                </div>

                {/* Metric 4 */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">SCALE</span>
                      <span className="rounded bg-amber/10 px-1.5 py-0.5 font-mono text-[9px] text-amber">Active</span>
                    </div>
                    <div className="mt-2 font-display text-3xl font-bold text-amber">300K+</div>
                    <p className="mt-1 text-xs font-semibold text-sand">Monthly Active Users</p>
                  </div>
                  <p className="mt-3 border-t border-white/5 pt-2 font-mono text-[11px] text-muted">
                    Over 40,000+ live product listings.
                  </p>
                </div>
              </div>

              {/* 2 Symmetric Architectural Optimizations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/25 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber font-display text-sm font-bold">
                    <Cpu size={16} />
                    <span>Rendering & Streaming Boundaries</span>
                  </div>
                  <ul className="space-y-2 text-xs leading-relaxed text-sand/90">
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>Server Components Shell:</strong> Decoupled heavy catalog search grids from interactive client islands, keeping initial bundle size minimal.
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>Prioritized Image Preloading:</strong> Applied explicit WebP responsive breakpoints and high-priority fetch hints for above-the-fold heroes.
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>Zero Runtime CSS Overhead:</strong> Compiled styling with Tailwind CSS eliminating runtime stylesheet injection delays.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/25 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber font-display text-sm font-bold">
                    <Zap size={16} />
                    <span>State Caching & Invalidation Architecture</span>
                  </div>
                  <ul className="space-y-2 text-xs leading-relaxed text-sand/90">
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>Zustand Atomic Selectors:</strong> Granular sliced stores ensure cart or wishlist mutations never re-render unrelated catalog cards.
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>TanStack Query v5 Stale-While-Revalidate:</strong> Instant cached reads with background synchronization for dynamic stock and flash deals.
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                      <strong>Optimistic UI Updates:</strong> Instant visual cart feedback on mobile with automated rollback upon network drops.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: POS ARCHITECTURE & APPLICATION CONTEXT */}
          {activeTab === 'pos' && (
            <motion.div
              key="pos"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">
                    Enterprise POS & Merchant Operations Architecture
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Mission-critical retail workflows handling high transaction volumes with zero data loss.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-xs text-amber">
                    <Database size={12} />
                    <span>Scale: 11,000+ Transactions</span>
                  </span>
                </div>
              </div>

              {/* 3 Symmetric Operational Pillars */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-amber">
                      <ShieldCheck size={18} />
                      <h4 className="font-display text-sm font-bold text-cream">
                        Authoritative Verification
                      </h4>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-sand/90">
                      Zero client-side trust: all item pricing, tax schedules, and discount vouchers are verified server-side with expected-total checksums.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-muted">
                    Guarantee: <span className="text-amber">100% Financial Accuracy</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-amber">
                      <Database size={18} />
                      <h4 className="font-display text-sm font-bold text-cream">
                        11,000+ Transactions
                      </h4>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-sand/90">
                      Real-time inventory synchronization across multi-branch warehouses with optimistic local UI rollbacks on network drops.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-muted">
                    Throughput: <span className="text-amber">11,000+ Completed Sales</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-amber">
                      <Sparkles size={18} />
                      <h4 className="font-display text-sm font-bold text-cream">
                        Live Merchant Dispatch
                      </h4>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-sand/90">
                      Automated customer SMS verification triggers, spam protection queues, and instant shopkeeper dispatch workflows for rapid retail fulfillment.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-muted">
                    Reliability: <span className="text-emerald">99.9% Queue Success</span>
                  </div>
                </div>
              </div>

              {/* Operational Telemetry Banner */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-sand">
                  <span className="h-2 w-2 rounded-full bg-emerald" />
                  <span>Production Retail Operations Live</span>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-muted">
                  <span>11K+ Total Sales</span>
                  <span>·</span>
                  <span>Multi-Branch Inventory Sync</span>
                  <span>·</span>
                  <span>Sub-150ms Checkout Dispatch</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
