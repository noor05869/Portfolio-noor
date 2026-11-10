'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Activity, Database, Gauge, Users } from 'lucide-react';

interface MetricItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  icon: typeof Users;
}

const metrics: MetricItem[] = [
  {
    value: 4,
    suffix: '+',
    label: 'Years Experience',
    icon: Activity,
  },
  {
    value: 300,
    suffix: 'K+',
    label: 'Active Users',
    icon: Users,
  },
  {
    value: 40,
    suffix: 'K+',
    label: 'Catalog Products',
    icon: Database,
  },
  {
    value: 92,
    suffix: '+',
    label: 'Lighthouse Score',
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
    const duration = 900;
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
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="group relative flex items-center justify-between rounded-xl border border-ink/[0.08] bg-surface px-4 py-3.5 sm:px-5 shadow-card transition-all duration-150 hover:border-amber/35 hover:shadow-card-hover"
    >
      <div>
        <div className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl leading-none tabular-nums">
          {metric.prefix}{displayValue}{metric.suffix}
        </div>
        <p className="mt-1.5 font-mono text-xs text-ink-muted tracking-tight">{metric.label}</p>
      </div>

      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/[0.08] bg-canvas-subtle text-ink-muted transition-colors group-hover:border-amber/30 group-hover:bg-amber/[0.08] group-hover:text-amber">
        <Icon size={15} aria-hidden="true" />
      </span>
    </motion.div>
  );
}

export default function TelemetryBar() {
  return (
    <div aria-label="Key Production Telemetry" className="w-full">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
}
