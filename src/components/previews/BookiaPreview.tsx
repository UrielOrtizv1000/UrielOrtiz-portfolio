"use client";

import { useTick, type PreviewProps } from "./shared";

const BOOKS = [
  { title: "Dune", author: "Frank Herbert", color: "#c2410c", price: 389 },
  { title: "1984", author: "George Orwell", color: "#1f2937", price: 249 },
  { title: "Animal Farm", author: "George Orwell", color: "#15803d", price: 199 },
  { title: "Neuromancer", author: "William Gibson", color: "#7c3aed", price: 329 },
  { title: "Foundation", author: "Isaac Asimov", color: "#0369a1", price: 299 },
  { title: "I, Robot", author: "Isaac Asimov", color: "#b91c1c", price: 279 },
  { title: "Clean Code", author: "Robert C. Martin", color: "#0f766e", price: 649 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", color: "#a16207", price: 319 },
];

const QUERIES = ["", "orwell", "asimov", "dune"];
const HOLD = 7;

const copy = {
  en: { nav: ["Catalog", "Deals", "My account"], search: "Search books, authors…", picks: "✦ AI picks for you", results: "Results for", add: "Add", added: "Added to cart" },
  es: { nav: ["Catálogo", "Ofertas", "Mi cuenta"], search: "Busca libros, autores…", picks: "✦ Recomendados por IA", results: "Resultados para", add: "Agregar", added: "Agregado al carrito" },
};

/* Walk the query cycle to find where tick `t` lands, counting cart adds on the way. */
function timeline(t: number) {
  let remaining = t;
  let cart = 0;
  let qi = 0;
  for (;;) {
    const q = QUERIES[qi % QUERIES.length];
    const len = q.length + HOLD;
    if (remaining < len) {
      const typed = q.slice(0, Math.min(remaining, q.length));
      const holdStep = remaining - q.length;
      const pressing = holdStep === 3;
      if (q && holdStep >= 4) cart += 1;
      return { query: q, typed, typing: remaining < q.length, pressing, toast: holdStep >= 4, cart };
    }
    remaining -= len;
    if (q) cart += 1;
    qi += 1;
  }
}

export default function BookiaPreview({ active, lang }: PreviewProps) {
  const t = useTick(active, 230, 12);
  const c = copy[lang];
  const { typed, typing, pressing, toast, cart } = timeline(t);

  const matches = typed
    ? BOOKS.filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(typed))
    : [BOOKS[0], BOOKS[3], BOOKS[6], BOOKS[7]];
  const shown = matches.slice(0, 4);

  return (
    <div className="relative flex h-full w-full flex-col bg-[#fffaf3] font-sans text-[#1c1917]">
      <header className="flex h-12 items-center gap-5 border-b border-[#f1e7da] px-5">
        <span className="text-[17px] font-black tracking-tight">
          book<span className="text-[#ea580c]">IA</span>
        </span>
        <nav className="flex gap-4 text-[11px] font-medium text-[#78716c]">
          {c.nav.map((item, i) => (
            <span key={item} className={i === 0 ? "text-[#1c1917]" : undefined}>
              {item}
            </span>
          ))}
        </nav>
        <span className="relative ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1917] text-white">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M2 3h2l1.5 7h7L14 5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            key={cart}
            className="absolute -right-1 -top-1 flex h-4 min-w-4 animate-[ping_0.6s_ease-out_1_reverse] items-center justify-center rounded-full bg-[#ea580c] px-1 text-[9px] font-bold"
          >
            {cart}
          </span>
        </span>
      </header>

      <div className="px-5 pt-4">
        <div className="flex h-10 items-center gap-2.5 rounded-xl border border-[#eadfce] bg-white px-3.5 shadow-sm">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#a8a29e]" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[13px]">
            {typed || <span className="text-[#a8a29e]">{c.search}</span>}
            {typing || !typed ? <span className="caret ml-px inline-block h-3.5 w-px translate-y-0.5 bg-[#ea580c]" /> : null}
          </span>
          <span className="ml-auto rounded-md bg-[#fff1e6] px-2 py-0.5 text-[9.5px] font-semibold text-[#c2410c]">
            Angular · Node.js · MySQL
          </span>
        </div>
        <p className="mt-3 text-[11px] font-semibold text-[#78716c]">
          {typed ? (
            <>
              {c.results} “{typed}” · {matches.length}
            </>
          ) : (
            c.picks
          )}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 px-5 pt-2.5">
        {shown.map((book, i) => (
          <div
            key={book.title}
            className="rounded-xl border border-[#f1e7da] bg-white p-2 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.25)]"
            style={{ animation: "float-y 0.5s ease-out 1" }}
          >
            <div
              className="relative flex h-[118px] flex-col justify-end overflow-hidden rounded-lg p-2.5 text-white"
              style={{ background: `linear-gradient(160deg, ${book.color}cc, ${book.color})` }}
            >
              <span className="absolute left-2 top-2 h-[3px] w-6 rounded-full bg-white/50" />
              <span className="serif-accent text-[17px] leading-none">{book.title}</span>
              <span className="mt-1 text-[8.5px] uppercase tracking-wider text-white/75">{book.author}</span>
            </div>
            <div className="mt-2 flex items-center justify-between px-0.5">
              <span className="text-[12px] font-bold">${book.price}</span>
              <span
                className={`rounded-md px-2 py-1 text-[9.5px] font-semibold transition-all duration-150 ${
                  i === 0 && pressing
                    ? "scale-90 bg-[#ea580c] text-white"
                    : i === 0 && typed
                      ? "bg-[#1c1917] text-white"
                      : "bg-[#f5efe6] text-[#57534e]"
                }`}
              >
                {c.add}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`absolute bottom-4 right-5 flex items-center gap-2 rounded-xl bg-[#1c1917] px-3.5 py-2.5 text-[11px] font-medium text-white shadow-xl transition-all duration-300 ${
          toast && typed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e] text-[9px]">✓</span>
        {c.added} · {shown[0]?.title}
      </div>
    </div>
  );
}
