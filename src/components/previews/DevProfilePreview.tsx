"use client";

import { useTick, type PreviewProps } from "./shared";

const NAME = "Uriel Ortiz";
const SKILLS = [
  { name: "React", value: 85, color: "#06b6d4" },
  { name: "CSS", value: 92, color: "#8b5cf6" },
  { name: "Docker", value: 70, color: "#3b82f6" },
];
const SLIDE = 10;
const PRESS = 3;
const TOAST = 9;
const REST = 4;

const copy = {
  en: {
    role: "Frontend Developer",
    editor: "Editor",
    name: "Name",
    title: "Title",
    skills: "Skills",
    export: "Export PDF",
    exported: "PDF exported",
    preview: "Live preview",
    experience: "Experience",
  },
  es: {
    role: "Desarrollador Frontend",
    editor: "Editor",
    name: "Nombre",
    title: "Puesto",
    skills: "Habilidades",
    export: "Exportar PDF",
    exported: "PDF exportado",
    preview: "Vista previa en vivo",
    experience: "Experiencia",
  },
};

export default function DevProfilePreview({ active, lang }: PreviewProps) {
  const c = copy[lang];
  const nameEnd = NAME.length;
  const roleEnd = nameEnd + c.role.length;
  const slideEnd = roleEnd + SLIDE;
  const pressEnd = slideEnd + PRESS;
  const cycle = pressEnd + TOAST + REST;

  const t = useTick(active, 140, slideEnd - 3);
  const s = t % cycle;
  const name = NAME.slice(0, Math.min(s, nameEnd));
  const role = s > nameEnd ? c.role.slice(0, Math.min(s - nameEnd, c.role.length)) : "";
  const slide = s > roleEnd ? Math.min(1, (s - roleEnd) / SLIDE) : 0;
  const pressing = s >= slideEnd && s < pressEnd;
  const toast = s >= pressEnd && s < pressEnd + TOAST;
  const focus = s < nameEnd ? "name" : s < roleEnd ? "role" : s < slideEnd ? "skills" : null;

  return (
    <div className="grid h-full w-full grid-cols-[250px_1fr] bg-[#eef2f7] font-sans text-[#0f172a]">
      <aside className="flex flex-col gap-3 border-r border-[#dbe3ee] bg-white p-4">
        <p className="flex items-center gap-2 text-[12px] font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0f172a] text-[10px] text-white">DP</span>
          DevProfile
          <span className="ml-auto text-[9.5px] font-medium text-[#94a3b8]">{c.editor}</span>
        </p>
        {[
          { id: "name", label: c.name, value: name },
          { id: "role", label: c.title, value: role },
        ].map((field) => (
          <label key={field.id} className="block">
            <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#64748b]">{field.label}</span>
            <span
              className={`mt-1 flex h-8 items-center rounded-lg border px-2.5 text-[12px] transition-colors ${
                focus === field.id ? "border-[#06b6d4] ring-2 ring-[#06b6d4]/20" : "border-[#e2e8f0]"
              }`}
            >
              {field.value}
              {focus === field.id ? <span className="caret ml-px inline-block h-3.5 w-px bg-[#0f172a]" /> : null}
            </span>
          </label>
        ))}
        <div>
          <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#64748b]">{c.skills}</span>
          <div className="mt-1.5 space-y-2.5">
            {SKILLS.map((skill) => {
              const v = Math.round(skill.value * slide);
              return (
                <div key={skill.name}>
                  <div className="flex justify-between text-[11px]">
                    <span>{skill.name}</span>
                    <span className="font-mono text-[#64748b]">{v}</span>
                  </div>
                  <div className="relative mt-1 h-1.5 rounded-full bg-[#e2e8f0]">
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${v}%`, background: skill.color }} />
                    <span
                      className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white ${focus === "skills" ? "shadow-md" : ""}`}
                      style={{ left: `${v}%`, borderColor: skill.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <span
          className={`mt-auto flex h-9 items-center justify-center gap-2 rounded-lg text-[12px] font-semibold text-white transition-all duration-150 ${
            pressing ? "scale-95 bg-[#0e7490]" : "bg-[#0f172a]"
          }`}
        >
          ↓ {c.export}
        </span>
      </aside>

      <div className="relative flex items-start justify-center overflow-hidden p-5">
        <span className="absolute left-4 top-3 flex items-center gap-1.5 text-[9.5px] font-medium text-[#64748b]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
          {c.preview}
        </span>
        <div className="mt-4 w-[300px] rounded-sm bg-white p-6 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)]">
          <p className="min-h-[26px] text-[22px] font-black leading-tight tracking-tight">{name || " "}</p>
          <p className="min-h-[16px] text-[11px] font-semibold text-[#0891b2]">{role}</p>
          <div className="my-3 h-px bg-[#e2e8f0]" />
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">{c.experience}</p>
          <div className="mt-2 space-y-1.5">
            {[92, 76, 84].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-[#e2e8f0]" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">{c.skills}</p>
          <div className="mt-2 flex h-[70px] items-end gap-4 border-b border-[#e2e8f0] px-2">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className="w-full rounded-t-md transition-[height] duration-150"
                  style={{ height: `${skill.value * slide * 0.6}px`, background: skill.color }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-4 px-2 text-center text-[9px] text-[#64748b]">
            {SKILLS.map((skill) => (
              <span key={skill.name} className="flex-1">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-[#0f172a] px-3.5 py-2.5 text-[11px] font-medium text-white shadow-xl transition-all duration-300 ${
            toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e] text-[9px]">✓</span>
          {c.exported} · cv-uriel.pdf
        </div>
      </div>
    </div>
  );
}
