"use client";

import { rand, useTick, type PreviewProps } from "./shared";

const PODS = [
  "api-7f9c",
  "api-2b1d",
  "users-8e4a",
  "users-c03f",
  "orders-5d71",
  "orders-a9e2",
  "gateway-11b",
  "worker-6f0",
];

const CYCLE = 6;
const SAMPLES = 30;

const copy = {
  en: { users: "Simulated users", uptime: "Availability", p95: "p95 latency", pods: "Pods", latency: "Latency (ms)", logs: "Live logs" },
  es: { users: "Usuarios simulados", uptime: "Disponibilidad", p95: "Latencia p95", pods: "Pods", latency: "Latencia (ms)", logs: "Logs en vivo" },
};

function latency(n: number) {
  const phase = ((n % CYCLE) + CYCLE) % CYCLE;
  const spike = phase === 0 ? 150 : phase === 1 ? 95 : phase === 2 ? 40 : 0;
  return 34 + rand(n) * 16 + spike;
}

function podState(t: number, index: number) {
  const victim = Math.floor(t / CYCLE) % PODS.length;
  if (index !== victim) return "running";
  const phase = t % CYCLE;
  if (phase === 0) return "error";
  if (phase === 1) return "backoff";
  if (phase === 2) return "creating";
  return "running";
}

const STATE_STYLE = {
  running: { dot: "#22c55e", label: "Running", text: "#86efac" },
  error: { dot: "#ef4444", label: "Error 137", text: "#fca5a5" },
  backoff: { dot: "#ef4444", label: "BackOff", text: "#fca5a5" },
  creating: { dot: "#f59e0b", label: "Creating", text: "#fcd34d" },
} as const;

function logLine(n: number) {
  const victim = PODS[Math.floor(n / CYCLE) % PODS.length];
  const hex = Math.floor(rand(n + 7) * 0xffffff).toString(16).padStart(6, "0");
  switch (n % CYCLE) {
    case 0:
      return { c: "#fca5a5", text: `[k8s]   pod/${victim} terminated · exit 137 (OOMKilled)` };
    case 1:
      return { c: "#fcd34d", text: `[k8s]   back-off restarting failed container ${victim}` };
    case 2:
      return { c: "#9ca3af", text: `[k8s]   pod/${victim} scheduled → node-${1 + (n % 3)}` };
    case 3:
      return { c: "#86efac", text: `[probe] ${victim} readiness OK · 200 · recovered` };
    case 4:
      return { c: "#93c5fd", text: `[otel]  trace ${hex} GET /checkout ${Math.round(latency(n) * 4)}ms` };
    default:
      return { c: "#9ca3af", text: `[load]  50,000 users · ${1800 + Math.round(rand(n) * 400)} req/s` };
  }
}

export default function KubePreview({ active, lang }: PreviewProps) {
  const t = useTick(active, 750, 13);
  const c = copy[lang];

  const series = Array.from({ length: SAMPLES }, (_, i) => latency(t - SAMPLES + 1 + i));
  const max = 220;
  const w = 268;
  const h = 104;
  const points = series.map((v, i) => [(i / (SAMPLES - 1)) * w, h - (v / max) * h] as const);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const current = Math.round(series[series.length - 1]);
  const degraded = t % CYCLE < 3;
  const logs = Array.from({ length: 4 }, (_, i) => logLine(t - 3 + i));

  return (
    <div className="flex h-full w-full flex-col gap-2.5 bg-[#0b0f17] p-3.5 font-sans text-[#e5e7eb]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] font-semibold">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#326ce5] text-[10px] text-white">⎈</span>
          resilience-lab
          <span className="font-normal text-[#6b7280]">/ namespace: shop</span>
        </div>
        <div className="flex gap-1.5 text-[9.5px] font-medium">
          {[
            ["Prometheus", "#e6522c"],
            ["Grafana", "#f2a33a"],
            ["Jaeger", "#60d0e4"],
          ].map(([name, color]) => (
            <span key={name} className="flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[#cbd5e1]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: c.users, value: "50,000", tone: "#e5e7eb" },
          { label: c.uptime, value: degraded ? "99.94%" : "99.97%", tone: "#86efac" },
          { label: c.p95, value: `${current} ms`, tone: current > 90 ? "#fca5a5" : "#e5e7eb" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-[#111827] px-3 py-2">
            <p className="text-[9.5px] uppercase tracking-wider text-[#6b7280]">{stat.label}</p>
            <p className="mt-0.5 text-[20px] font-bold tabular-nums tracking-tight transition-colors" style={{ color: stat.tone }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_292px] gap-2.5">
        <div className="rounded-lg border border-white/[0.06] bg-[#111827] p-2.5">
          <p className="mb-2 text-[9.5px] uppercase tracking-wider text-[#6b7280]">{c.pods}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {PODS.map((pod, i) => {
              const s = STATE_STYLE[podState(t, i)];
              return (
                <div
                  key={pod}
                  className="flex items-center gap-1.5 rounded-md bg-white/[0.03] px-2 py-[5px] transition-colors duration-300"
                  style={{ boxShadow: s.dot !== "#22c55e" ? `inset 0 0 0 1px ${s.dot}55` : undefined }}
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
                  <span className="whitespace-nowrap font-mono text-[9.5px] text-[#cbd5e1]">{pod}</span>
                  <span className="ml-auto whitespace-nowrap text-[8.5px]" style={{ color: s.text }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-[#111827] p-2.5">
          <div className="mb-1.5 flex items-center justify-between text-[9.5px] uppercase tracking-wider text-[#6b7280]">
            {c.latency}
            <span className="font-mono normal-case text-[#93c5fd]">GET /checkout</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="h-[104px] w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="kube-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#ffffff" strokeOpacity="0.05" />
            ))}
            <line x1="0" x2={w} y1={h - (100 / max) * h} y2={h - (100 / max) * h} stroke="#ef4444" strokeOpacity="0.5" strokeDasharray="3 3" />
            <path d={area} fill="url(#kube-area)" />
            <path d={line} fill="none" stroke="#60a5fa" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="3" fill="#60a5fa" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-[#05070c] px-3 py-2 font-mono text-[10px] leading-[1.6]">
        <p className="mb-0.5 text-[9px] uppercase tracking-wider text-[#6b7280]">{c.logs}</p>
        {logs.map((l, i) => (
          <p key={t - 3 + i} className="truncate" style={{ color: l.c, opacity: 0.55 + (i / 3) * 0.45 }}>
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}
