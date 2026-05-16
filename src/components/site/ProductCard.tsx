import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { add } = useCart();
  const { t, isRtl } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Link to="/rituals/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative overflow-hidden bg-gradient-to-b from-[color:var(--sand)] to-[color:var(--sand-deep)] dark:from-white dark:to-neutral-100 aspect-[3/4]">
          {p.badge && (
            <span className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} z-10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--herbal-deep)]/90 text-[color:var(--sand)] backdrop-blur`}>
              {p.badge}
            </span>
          )}
          <img
            src={p.images[0]}
            alt={p.name}
            loading="lazy"
            className="product-zoom absolute inset-0 h-full w-full object-cover mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(p); }}
            className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"} h-11 w-11 rounded-full bg-[color:var(--sand)] border border-[color:var(--gold)]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-[color:var(--gold)]/20`}
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="pt-5 pb-2">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--gold)]">{p.ritual}</div>
          <div className="font-serif text-lg mt-2 leading-tight">{isRtl ? p.nameAr : p.name}</div>
          <div className="font-arabic text-sm text-[color:var(--muted-foreground)] mt-1" dir={isRtl ? "ltr" : "rtl"}>{isRtl ? p.name : p.nameAr}</div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-[color:var(--ink)]/70">{p.ritualTime}</span>
            <span className="text-sm font-medium">{p.price} {t("cart.jd")}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
