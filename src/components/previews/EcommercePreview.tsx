"use client";

import { useTick, type PreviewProps } from "./shared";

type Line = { text: string; color: string; event?: "cart" | "order" };

const PRODUCTS = {
  en: ["Headphones", "Keyboard", "Mouse"],
  es: ["Audífonos", "Teclado", "Mouse"],
};
const PRICES = [799, 1199, 459];

function script(lang: "en" | "es"): Line[] {
  const [a, b, m] = PRODUCTS[lang];
  const cmd = "#e5e7eb";
  const ok = "#4ade80";
  const json = "#93c5fd";
  return [
    { text: "$ curl localhost:3000/api/products", color: cmd },
    { text: "HTTP/1.1 200 OK", color: ok },
    { text: `[{ "id": 1, "name": "${a}", "price": 799 },`, color: json },
    { text: ` { "id": 2, "name": "${b}", "price": 1199 },`, color: json },
    { text: ` { "id": 3, "name": "${m}", "price": 459 }]`, color: json },
    { text: "", color: cmd },
    { text: "$ curl -X POST localhost:3000/api/cart \\", color: cmd },
    { text: `    -d '{"productId":3,"qty":1}'`, color: cmd },
    { text: "HTTP/1.1 201 Created", color: ok, event: "cart" },
    { text: `{ "cartId": 42, "items": 1, "total": 459 }`, color: json },
    { text: "", color: cmd },
    { text: "$ curl -X POST localhost:3000/api/orders \\", color: cmd },
    { text: `    -d '{"cartId":42}'`, color: cmd },
    { text: "HTTP/1.1 201 Created", color: ok, event: "order" },
    { text: `{ "orderId": 1024, "status": "paid" }`, color: json },
  ];
}

const PAUSE = 8;

const copy = {
  en: { store: "Tokioona Store", cart: "Cart", order: "Order #1024 confirmed", add: "Add" },
  es: { store: "Tienda Tokioona", cart: "Carrito", order: "Pedido #1024 confirmado", add: "Agregar" },
};

export default function EcommercePreview({ active, lang }: PreviewProps) {
  const lines = script(lang);
  const t = useTick(active, 320, 10);
  const step = t % (lines.length + PAUSE);
  const visible = lines.slice(0, Math.min(step + 1, lines.length));
  const carted = visible.some((l) => l.event === "cart");
  const ordered = visible.some((l) => l.event === "order");
  const c = copy[lang];
  const names = PRODUCTS[lang];

  return (
    <div className="grid h-full w-full grid-cols-[350px_1fr] font-sans">
      <div className="flex flex-col bg-[#0d1117] p-4 font-mono text-[10.5px] leading-[1.65]">
        <div className="mb-2 flex items-center gap-2 text-[9.5px] text-[#6b7280]">
          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[#cbd5e1]">node server.js</span>
          <span>express · mysql2</span>
          <span className="ml-auto flex items-center gap-1 text-[#4ade80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />:3000
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end overflow-hidden">
          {visible.map((line, i) => (
            <p key={i} className="whitespace-pre" style={{ color: line.color }}>
              {line.text || " "}
              {i === visible.length - 1 && step < lines.length ? (
                <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[#e5e7eb]" />
              ) : null}
            </p>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col bg-[#f8fafc] p-4 text-[#0f172a]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-tight">{c.store}</span>
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors duration-300 ${
              carted ? "bg-[#0f172a] text-white" : "bg-[#e2e8f0] text-[#475569]"
            }`}
          >
            {c.cart} · {carted ? 1 : 0}
          </span>
        </div>
        <div className="mt-3 grid gap-2">
          {names.map((name, i) => {
            const picked = i === 2 && carted;
            return (
              <div
                key={name}
                className={`flex items-center gap-3 rounded-xl border bg-white p-2.5 transition-all duration-300 ${
                  picked ? "border-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.15)]" : "border-[#e2e8f0]"
                }`}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[18px]"
                  style={{ background: ["#fef3c7", "#e0e7ff", "#dcfce7"][i] }}
                  aria-hidden="true"
                >
                  {["🎧", "⌨️", "🖱️"][i]}
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold">{name}</p>
                  <p className="text-[11px] text-[#64748b]">${PRICES[i]}</p>
                </div>
                <span
                  className={`ml-auto rounded-md px-2 py-1 text-[9.5px] font-semibold ${
                    picked ? "bg-[#22c55e] text-white" : "bg-[#f1f5f9] text-[#475569]"
                  }`}
                >
                  {picked ? "✓" : c.add}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className={`mt-auto flex items-center gap-2 rounded-xl bg-[#0f172a] px-3 py-2.5 text-[11px] font-medium text-white transition-all duration-500 ${
            ordered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e] text-[9px]">✓</span>
          {c.order}
          <span className="ml-auto font-mono text-[#94a3b8]">$459</span>
        </div>
      </div>
    </div>
  );
}
