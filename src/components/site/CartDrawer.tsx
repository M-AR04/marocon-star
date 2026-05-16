import { useCart } from "@/lib/cart";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, total, count, clear } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [done, setDone] = useState(false);
  const { t, language, isRtl } = useLanguage();

  const checkout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setDone(true);
      clear();
      setTimeout(() => { setDone(false); setOpen(false); }, 2200);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[color:var(--ink)]/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: isRtl ? "-100%" : "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            className={`fixed top-0 bottom-0 z-[90] w-full sm:w-[440px] bg-[color:var(--sand)] ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            } border-[color:var(--gold)]/30 flex flex-col`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-[color:var(--gold)]/20">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">{t("cart.title")}</div>
                <div className="font-serif text-2xl">
                  {isRtl ? `السلة · ${count} عناصر` : `Cart · ${count} items`}
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="h-10 w-10 rounded-full hover:bg-[color:var(--gold)]/15 flex items-center justify-center">
                <X className="h-5 w-5" />
              </button>
            </div>

            {done ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="h-16 w-16 rounded-full border border-[color:var(--gold)] flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-[color:var(--herbal-deep)] fill-none stroke-2"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="font-serif text-2xl">
                  {isRtl ? "تم تأكيد طقس الجمال" : "Ritual Reserved"}
                </div>
                <p className="text-sm text-[color:var(--muted-foreground)] mt-2">
                  {t("cart.checkoutDemo")}
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="h-20 w-20 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center mb-5">
                  <ShoppingBag className="h-7 w-7 text-[color:var(--gold)]" />
                </div>
                <div className="font-serif text-xl">{t("cart.empty")}</div>
                <p className="text-sm text-[color:var(--muted-foreground)] mt-2 max-w-xs">
                  {t("cart.emptyDesc")}
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {items.map((i) => (
                    <motion.div
                      key={i.product.id}
                      layout
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 pb-5 border-b border-[color:var(--gold)]/15"
                    >
                      <div className="h-24 w-20 rounded bg-white overflow-hidden shrink-0">
                        <img src={i.product.images[0]} alt={i.product.name} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-base leading-tight">
                          {isRtl ? i.product.nameAr : i.product.name}
                        </div>
                        <div className="text-[11px] uppercase tracking-widest text-[color:var(--gold)] mt-0.5">{i.product.ritual}</div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[color:var(--gold)]/30 rounded-full">
                            <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-7 w-7 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                            <motion.span key={i.qty} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="w-6 text-center text-sm">{i.qty}</motion.span>
                            <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-7 w-7 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="text-sm">
                            <motion.span key={i.qty * i.product.price} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                              {(i.qty * i.product.price).toFixed(0)} {t("cart.jd")}
                            </motion.span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => remove(i.product.id)} className="text-[color:var(--muted-foreground)] hover:text-[color:var(--destructive)] self-start" aria-label="Remove"><X className="h-4 w-4" /></button>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[color:var(--gold)]/20 px-6 py-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--muted-foreground)]">{t("cart.subtotal")}</span>
                    <span>{total.toFixed(0)} {t("cart.jd")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--muted-foreground)]">{isRtl ? "الشحن · عمان" : "Shipping · Amman"}</span>
                    <span className="text-[color:var(--herbal-deep)]">{isRtl ? "مُقدّم مجاناً" : "Complimentary"}</span>
                  </div>
                  <div className="hairline" />
                  <div className="flex justify-between font-serif text-xl">
                    <span>{isRtl ? "المجموع" : "Total"}</span>
                    <motion.span key={total} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }}>{total.toFixed(0)} {t("cart.jd")}</motion.span>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={checkingOut}
                    className="w-full h-12 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] font-medium tracking-[0.25em] text-xs uppercase hover:bg-[color:var(--ink)] transition-colors relative overflow-hidden"
                  >
                    {checkingOut ? (isRtl ? "جاري تحضير طقوسك..." : "Sealing your ritual…") : t("cart.checkout")}
                  </button>
                  <p className="text-[10px] text-center text-[color:var(--muted-foreground)] italic">
                    {isRtl ? "تجربة عرض فقط · لا يتم تحصيل أي مبالغ حقيقية." : "Demo experience · no real payment is taken."}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
