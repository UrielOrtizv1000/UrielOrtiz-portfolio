"use client";

import { useTick, type PreviewProps } from "./shared";

const copy = {
  en: {
    online: "online",
    retention: "Retention · 15 days",
    tunnel: "Cloudflare Tunnel · active",
    typing: "typing…",
    sharing: "Sharing screen",
    messages: [
      { me: false, text: "Is the server up yet? 👀" },
      { me: true, text: "Yep — exposed through Cloudflare Tunnel 🔒" },
      { me: false, text: "Can you share your screen?" },
      { me: true, text: "Sure, 1080p at 60fps 🚀" },
    ],
  },
  es: {
    online: "en línea",
    retention: "Retención · 15 días",
    tunnel: "Cloudflare Tunnel · activo",
    typing: "escribiendo…",
    sharing: "Compartiendo pantalla",
    messages: [
      { me: false, text: "¿Ya quedó el servidor? 👀" },
      { me: true, text: "Sí, expuesto con Cloudflare Tunnel 🔒" },
      { me: false, text: "¿Me compartes pantalla?" },
      { me: true, text: "Va, a 1080p y 60fps 🚀" },
    ],
  },
};

/* tick → how many messages are visible, whether someone is typing, and the call state */
const SCHEDULE = [
  { shown: 0, typing: false },
  { shown: 1, typing: false },
  { shown: 1, typing: true },
  { shown: 2, typing: false },
  { shown: 3, typing: false },
  { shown: 3, typing: true },
  { shown: 4, typing: false },
  { shown: 4, typing: false },
];
const CALL = 9;

export default function NovaPreview({ active, lang }: PreviewProps) {
  const t = useTick(active, 700, 6);
  const c = copy[lang];
  const step = t % (SCHEDULE.length + CALL);
  const inCall = step >= SCHEDULE.length;
  const state = inCall ? { shown: 4, typing: false } : SCHEDULE[step];
  const seconds = inCall ? step - SCHEDULE.length : 0;

  return (
    <div className="grid h-full w-full grid-cols-[170px_1fr] bg-[#0c0a14] font-sans text-[#ede9fe]">
      <aside className="flex flex-col gap-3 border-r border-white/[0.06] bg-[#110e1c] p-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-[12px] font-black text-white">
            N
          </span>
          <span className="text-[14px] font-black tracking-[0.12em]">NOVA</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#f472b6] text-[11px] font-bold text-white">
            A
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#110e1c] bg-[#22c55e]" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold">Ale</p>
            <p className="text-[9.5px] text-[#a78bfa]">{state.typing ? c.typing : c.online}</p>
          </div>
        </div>
        <div className="mt-auto space-y-1.5 text-[9.5px] text-[#a1a1aa]">
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f6821f]" />
            {c.tunnel}
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
            {c.retention}
          </p>
          <p className="font-mono text-[#71717a]">electron · e2e</p>
        </div>
      </aside>

      <section className="relative flex flex-col">
        <header className="flex h-11 items-center gap-2 border-b border-white/[0.06] px-4">
          <span className="text-[12px] font-semibold">Ale</span>
          <span className="ml-auto flex gap-1.5">
            {["M3 5.5A1.5 1.5 0 014.5 4h5A1.5 1.5 0 0111 5.5v5A1.5 1.5 0 019.5 12h-5A1.5 1.5 0 013 10.5zM11 7l3-2v6l-3-2", "M5 3h6v10H5zM7 11h2"].map((d) => (
              <span key={d} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06]">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </span>
        </header>

        <div className="flex flex-1 flex-col justify-end gap-2 p-4">
          {c.messages.slice(0, state.shown).map((m, i) => (
            <div
              key={i}
              className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[12px] leading-snug ${
                m.me
                  ? "self-end rounded-br-md bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] text-white"
                  : "self-start rounded-bl-md bg-white/[0.08]"
              }`}
              style={{ animation: "float-y 0.45s ease-out 1" }}
            >
              {m.text}
            </div>
          ))}
          {state.typing ? (
            <div className="flex gap-1 self-end rounded-2xl rounded-br-md bg-[#6d28d9]/50 px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="caret h-1.5 w-1.5 rounded-full bg-white" style={{ animationDelay: `${d * 0.2}s` }} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex h-11 items-center gap-2 border-t border-white/[0.06] px-4">
          <span className="flex-1 rounded-full bg-white/[0.06] px-3 py-1.5 text-[10.5px] text-[#71717a]">Aa</span>
        </div>

        <div
          className={`absolute inset-3 flex flex-col overflow-hidden rounded-2xl bg-[#05040a] ring-1 ring-white/10 transition-all duration-500 ${
            inCall ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="relative flex-1 bg-[radial-gradient(circle_at_30%_20%,#4c1d95,transparent_60%),radial-gradient(circle_at_80%_80%,#831843,transparent_55%)]">
            <div className="absolute inset-5 rounded-lg border border-white/10 bg-[#0c0a14]/80 p-3">
              <div className="mb-2 flex gap-1">
                <span className="h-1.5 w-8 rounded-full bg-white/20" />
                <span className="h-1.5 w-14 rounded-full bg-white/10" />
              </div>
              <div className="space-y-1.5">
                {[80, 62, 90, 45, 70].map((w, i) => (
                  <span key={i} className="block h-1.5 rounded-full bg-[#a78bfa]/30" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ef4444]" />
              {c.sharing} · 1080p60
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px]">
              00:{String(seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="flex h-12 items-center gap-3 px-4">
            <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className="eq-bar w-[3px] origin-bottom rounded-full bg-[#a78bfa]"
                  style={{ height: "100%", animation: `eq ${0.6 + (i % 5) * 0.13}s ease-in-out ${i * 0.05}s infinite` }}
                />
              ))}
            </div>
            <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#ef4444] text-white">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M2.5 9.5c3-3 8-3 11 0l-1.5 1.5-2-1v-1.5a6 6 0 00-4 0V10l-2 1z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
