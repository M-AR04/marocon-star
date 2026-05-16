import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/site/Reveal";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X, ZoomIn, Minus, Plus, ArrowRight, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/rituals/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
});

function ProductPage() {
  const p = Route.useLoaderData() as Product;
  const { add } = useCart();
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [light, setLight] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [tab, setTab] = useState<"ritual" | "ingredients" | "story">("ritual");
  const [ba, setBa] = useState(50);
  const imgRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = imgRef.current!.getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const related = products.filter((r) => r.id !== p.id && r.category === p.category).slice(0, 4);

  return (
    <>
      <section className="py-8 border-b border-[color:var(--gold)]/15 text-xs text-[color:var(--muted-foreground)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center gap-2">
          <Link to="/" className="hover:text-[color:var(--herbal-deep)]">Home</Link>
          <span>/</span>
          <Link to="/rituals" className="hover:text-[color:var(--herbal-deep)]">Rituals</Link>
          <span>/</span>
          <span className="text-[color:var(--ink)]">{p.name}</span>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* GALLERY */}
          <div>
            <div
              ref={imgRef}
              onMouseMove={onMove}
              onMouseLeave={() => setZoom(null)}
              onClick={() => setLight(true)}
              className="relative aspect-[3/4] overflow-hidden bg-[color:var(--sand-deep)] cursor-zoom-in grain"
            >
              {p.badge && <span className="absolute top-5 left-5 z-10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--herbal-deep)]/90 text-[color:var(--sand)]">{p.badge}</span>}
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={p.images[idx]}
                  alt={p.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(1.7)" } : undefined}
                  className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-transform duration-300"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center pointer-events-none">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {p.images.concat(p.images).slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i % p.images.length)}
                  className={`aspect-square overflow-hidden border ${idx === i % p.images.length ? "border-[color:var(--gold)]" : "border-transparent"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover bg-[color:var(--sand-deep)] mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <Reveal>
              <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)]">{p.ritual}</div>
              <h1 className="font-serif text-4xl lg:text-6xl mt-3 leading-[1.05]">{p.name}</h1>
              <div className="font-arabic text-lg text-[color:var(--herbal-deep)] mt-2" dir="rtl">{p.nameAr}</div>

              <p className="mt-6 text-[color:var(--ink)]/75 leading-relaxed">{p.story}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {p.benefits.map((b) => (
                  <span key={b} className="px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--sand-deep)] border border-[color:var(--gold)]/30">
                    <Check className="h-3 w-3 inline-block mr-1.5 text-[color:var(--herbal-deep)]" />
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="border-t border-[color:var(--gold)]/30 pt-3">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]"><Clock className="h-3 w-3" /> Ritual time</div>
                  <div className="font-serif text-2xl mt-1">{p.ritualTime}</div>
                </div>
                <div className="border-t border-[color:var(--gold)]/30 pt-3">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]"><Sparkles className="h-3 w-3" /> Complete ritual</div>
                  <div className="font-serif text-2xl mt-1">{p.price} JD</div>
                </div>
              </div>

              <div className="hairline my-10" />

              <div className="flex items-stretch gap-3">
                <div className="flex items-center border border-[color:var(--ink)]/20 h-14">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-12 flex items-center justify-center"><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="h-full w-12 flex items-center justify-center"><Plus className="h-4 w-4" /></button>
                </div>
                <button
                  onClick={() => add(p, qty)}
                  className="flex-1 h-14 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase hover:bg-[color:var(--ink)] transition-colors"
                >
                  Begin this ritual · {(p.price * qty).toFixed(0)} JD
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 text-[color:var(--muted-foreground)]">Complimentary shipping in Amman · Demo experience.</p>
            </Reveal>

            {/* tabs */}
            <div className="mt-14">
              <div className="flex gap-6 border-b border-[color:var(--gold)]/20">
                {(["ritual", "ingredients", "story"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-3 text-[10px] tracking-[0.4em] uppercase ${tab === t ? "border-b border-[color:var(--herbal-deep)] text-[color:var(--herbal-deep)]" : "text-[color:var(--muted-foreground)]"}`}
                  >
                    {t === "ritual" ? "The Ritual" : t === "ingredients" ? "Ingredients" : "Origin"}
                  </button>
                ))}
              </div>
              <div className="pt-8">
                {tab === "ritual" && (
                  <ol className="space-y-5">
                    {p.steps.map((s, i) => (
                      <li key={i} className="flex gap-5">
                        <div className="font-serif text-3xl text-[color:var(--gold)] w-10 shrink-0">{String(i + 1).padStart(2, "0")}</div>
                        <div>
                          <div className="font-serif text-xl">{s.title}</div>
                          <div className="text-sm text-[color:var(--muted-foreground)] mt-1">{s.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
                {tab === "ingredients" && (
                  <ul className="space-y-4">
                    {p.ingredients.map((it) => (
                      <li key={it.name} className="border-b border-[color:var(--gold)]/15 pb-4">
                        <div className="font-serif text-xl">{it.name}</div>
                        <div className="text-sm text-[color:var(--muted-foreground)] mt-0.5">{it.note}</div>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "story" && (
                  <p className="text-[color:var(--ink)]/75 leading-relaxed">{p.story}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 lg:py-28 bg-[color:var(--sand-deep)]/50">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)] mb-3">Visual Demonstration</div>
              <h2 className="font-serif text-4xl lg:text-5xl">Before · After</h2>
              <p className="text-[color:var(--muted-foreground)] mt-3">Drag the line to see the transformation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/9] overflow-hidden select-none">
              <img src={p.images[0]} alt="Before" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" style={{ filter: "saturate(.6) brightness(.85) contrast(.9)" }} />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${ba}%)` }}>
                <img src={p.images[p.images.length - 1] ?? p.images[0]} alt="After" className="h-full w-full object-cover mix-blend-multiply" style={{ filter: "saturate(1.15) brightness(1.05)" }} />
              </div>
              <div className="absolute top-0 bottom-0 w-px bg-[color:var(--gold)]" style={{ left: `${ba}%` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[color:var(--sand)] border border-[color:var(--gold)] flex items-center justify-center">
                  <ChevronLeft className="h-3 w-3" /><ChevronRight className="h-3 w-3" />
                </div>
              </div>
              <input type="range" min={0} max={100} value={ba} onChange={(e) => setBa(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-ew-resize" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[color:var(--ink)]/60 text-[color:var(--sand)] text-[10px] tracking-[0.3em] uppercase">Before</div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-[10px] tracking-[0.3em] uppercase">After 28 days</div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-3xl lg:text-4xl">Complete the ceremony</h2>
              <Link to="/rituals" className="gold-underline text-xs tracking-[0.3em] uppercase pb-1">All rituals →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {related.map((r, i) => (
                <ProductCard key={r.id} p={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {light && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[color:var(--ink)]/95 backdrop-blur flex items-center justify-center p-6"
            onClick={() => setLight(false)}
          >
            <button className="absolute top-6 right-6 h-12 w-12 rounded-full border border-[color:var(--gold)]/40 text-[color:var(--sand)] flex items-center justify-center"><X /></button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={p.images[idx]}
              alt={p.name}
              className="max-h-[88vh] max-w-[88vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
