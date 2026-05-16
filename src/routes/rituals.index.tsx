import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

type Search = { cat?: Category };

export const Route = createFileRoute("/rituals/")({
  component: Rituals,
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: typeof s.cat === "string" ? (s.cat as Category) : undefined,
  }),
});

function Rituals() {
  const { cat } = Route.useSearch();
  const [active, setActive] = useState<Category | "all">(cat ?? "all");
  const list = active === "all" ? products : products.filter((p) => p.category === active);
  const { t, isRtl } = useLanguage();

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <section className="py-20 lg:py-32 border-b border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-4">
              {isRtl ? "الصيدلية الطبيعية · المختبر" : "The Apothecary · المختبر"}
            </div>
            <h1 className="font-serif text-6xl lg:text-8xl leading-[0.95] max-w-4xl">
              {isRtl ? (
                <>كل الطقوس، <span className="italic text-[color:var(--herbal-deep)]">كل البكجات.</span></>
              ) : (
                <>All rituals, <span className="italic text-[color:var(--herbal-deep)]">all ceremonies.</span></>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-[color:var(--muted-foreground)]">
              {t("rituals.desc")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sticky top-16 lg:top-20 z-40 bg-[color:var(--sand)]/90 backdrop-blur-xl border-b border-[color:var(--gold)]/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 flex gap-3 lg:gap-6 overflow-x-auto scrollbar-hide">
          {[{ key: "all", label: "All", labelAr: "الكل" } as any, ...categories].map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key as any)}
                className={`shrink-0 px-5 py-2 text-[11px] tracking-[0.3em] uppercase border transition ${
                  isActive
                    ? "bg-[color:var(--herbal-deep)] text-[color:var(--sand)] border-[color:var(--herbal-deep)]"
                    : "border-[color:var(--ink)]/15 hover:border-[color:var(--gold)]"
                }`}
              >
                {isRtl ? c.labelAr : c.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
