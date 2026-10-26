'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Activity, Database, Gauge, TrendingUp, Users } from 'lucide-react';

interface MetricItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
  icon: typeof Users;
}

const metrics: MetricItem[] = [
  {
    value: 4,
    suffix: '+',
    label: 'Years Experience',
    detail: 'Senior Frontend & AI Systems',
    icon: Activity,
  },
  {
    value: 300,
    suffix: 'K+',
    label: 'Active Users Scaled',
    detail: 'TechBazaar.pk marketplace',
    icon: Users,
  },
  {
    value: 40,
    suffix: 'K+',
    label: 'Live Product Listings',
    detail: 'High-density catalog scale',
    icon: Database,
  },
  {
    value: 92,
    suffix: '+',
    label: 'Lighthouse Score',
    detail: 'Audited Core Web Vitals',
    icon: Gauge,
  },
];

function MetricCard({ metric, index }: { metric: MetricItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? metric.value : 0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplayValue(metric.value);
      return;
    }
    const duration = 1000;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(metric.value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, metric.value]);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface/80 p-4 sm:p-5 shadow-card transition-all duration-150 hover:border-amber/40 hover:bg-surface-elevated/90"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{metric.label}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-muted transition-colors group-hover:border-amber/30 group-hover:bg-amber/10 group-hover:text-amber">
          <Icon size={14} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
          {metric.prefix}{displayValue}{metric.suffix}
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-sand/70 truncate">{metric.detail}</p>
    </motion.div>
  );
}

export default function TelemetryBar() {
  return (
    <div aria-label="Key Production Telemetry" className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
}
