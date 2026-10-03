"use client";

import { rand, useTick, type PreviewProps } from "./shared";

const PEOPLE = ["Ana", "Beto", "Carla", "Diego", "Eva", "Fer"];
const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

/* Two valid draws: nobody gets themselves, Ana ↛ Beto, Diego ↛ Eva. */
const DRAWS = [
  ["Carla", "Diego", "Eva", "Fer", "Ana", "Beto"],
  ["Diego", "Eva", "Ana", "Beto", "Fer", "Carla"],
];

const copy = {
  en: {
    title: "Magic Exchange",
    event: "Holiday party · 6 people · $500 cap",
    people: "Participants",
    rules: "Exclusions",
    draw: "Draw names",
    drawing: "Drawing…",
    done: "All rules respected",
    gives: "gives to",
  },
  es: {
    title: "Intercambio Mágico",
    event: "Posada · 6 personas · tope $500",
    people: "Participantes",
    rules: "Exclusiones",
    draw: "Sortear",
    drawing: "Sorteando…",
    done: "Reglas respetadas",
    gives: "le regala a",
  },
};

const IDLE = 3;
const SHUFFLE = 7;
const REVEAL = 6;
const HOLD = 8;
const CYCLE = IDLE + SHUFFLE + REVEAL + HOLD;

export default function IntercambioPreview({ active, lang }: PreviewProps) {
  const t = useTick(active, 260, IDLE + SHUFFLE + REVEAL + 2);
  const c = copy[lang];
  const round = Math.floor(t / CYCLE);
  const step = t % CYCLE;
  const draw = DRAWS[round % DRAWS.length];
  const pressing = step === IDLE - 1;
  const shuffling = step >= IDLE && step < IDLE + SHUFFLE;
  const revealed = step >= IDLE + SHUFFLE ? Math.min(PEOPLE.length, step - IDLE - SHUFFLE + 1) : 0;
  const finished = revealed === PEOPLE.length;

  return (
    <div className="flex h-full w-full flex-col bg-[#fff7f5] font-sans text-[#1f1315]">
      <header className="flex h-12 items-center gap-3 bg-[#b91c1c] px-5 text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 text-[11px] font-black" aria-hidden="true">IM</span>
        <span className="text-[15px] font-bold tracking-tight">{c.title}</span>
        <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium">{c.event}</span>
      </header>

      <div className="grid flex-1 grid-cols-[230px_1fr] gap-4 p-4">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-[#fde2dc] bg-white p-3">
            <p className="text-[9.5px] font-semibold uppercase tracking-wider text-[#9f6b63]">{c.people}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PEOPLE.map((p, i) => (
                <span
                  key={p}
                  className="flex items-center gap-1.5 rounded-full border border-[#fde2dc] bg-[#fffaf9] py-1 pl-1 pr-2.5 text-[11px] font-medium"
                >
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: COLORS[i] }}>
                    {p[0]}
                  </span>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#fde2dc] bg-white p-3">
            <p className="text-[9.5px] font-semibold uppercase tracking-wider text-[#9f6b63]">{c.rules}</p>
            <div className="mt-2 space-y-1.5 text-[11px] font-medium">
              {[
                ["Ana", "Beto"],
                ["Diego", "Eva"],
              ].map(([a, b]) => (
                <p key={a} className="flex items-center gap-2 rounded-lg bg-[#fef2f2] px-2.5 py-1.5">
                  {a}
                  <span className="text-[#dc2626]">✕</span>
                  {b}
                </p>
              ))}
            </div>
          </div>
          <span
            className={`mt-auto flex h-10 items-center justify-center rounded-xl text-[12px] font-bold text-white transition-all duration-150 ${
              pressing ? "scale-95 bg-[#15803d]" : shuffling ? "bg-[#15803d]/70" : "bg-[#16a34a]"
            }`}
          >
            {shuffling ? c.drawing : c.draw}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-[#fde2dc] bg-white p-3">
          <div className="grid flex-1 grid-rows-6 gap-1.5">
            {PEOPLE.map((giver, i) => {
              const shown = i < revealed;
              const target = shown
                ? draw[i]
                : shuffling
                  ? PEOPLE[Math.floor(rand(t * 7 + i) * PEOPLE.length)]
                  : "· · ·";
              return (
                <div
                  key={giver}
                  className={`flex items-center gap-2 rounded-lg px-3 text-[12px] transition-colors duration-300 ${
                    shown ? "bg-[#f0fdf4]" : "bg-[#fafafa]"
                  }`}
                >
                  <span className="w-12 font-semibold">{giver}</span>
                  <span className="text-[10px] text-[#a8a29e]">{c.gives}</span>
                  <span
                    className={`ml-auto font-semibold ${shown ? "text-[#15803d]" : shuffling ? "text-[#b91c1c] blur-[0.6px]" : "text-[#d6d3d1]"}`}
                  >
                    {target}
                  </span>
                  {shown ? <span className="text-[10px] text-[#16a34a]">✓</span> : null}
                </div>
              );
            })}
          </div>
          <p
            className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-[#16a34a] py-1.5 text-[11px] font-semibold text-white transition-all duration-300 ${
              finished ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ {c.done}
          </p>
        </div>
      </div>
    </div>
  );
}
