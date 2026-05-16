import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Search, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const NAV = [
  { to: "/", label: "Home", key: "home" },
  { to: "/rituals", label: "Rituals", key: "rituals" },
  { to: "/bundles", label: "Bundles", key: "bundles" },
  { to: "/story", label: "Heritage", key: "heritage" },
  { to: "/analytics", label: "Insights", key: "insights" },
  { to: "/contact", label: "Contact", key: "contact" },
];

export function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-all duration-700 ${
            scrolled ? "bg-[color:var(--sand)]/85 backdrop-blur-xl border-b border-[color:var(--gold)]/20" : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Moroccan Star Logo"
                className="h-10 w-10 object-contain rounded-full border border-[color:var(--gold)]/30 p-0.5 group-hover:rotate-12 transition-transform duration-500 bg-white"
              />
              <div className="leading-tight">
                <div className="font-serif text-lg lg:text-xl tracking-wide">Moroccan Star</div>
                <div className="font-arabic text-[10px] lg:text-xs text-[color:var(--gold)] tracking-widest">النجمة المغربية</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-9" dir={isRtl ? "rtl" : "ltr"}>
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)]/80 hover:text-[color:var(--herbal-deep)] transition-colors gold-underline"
                  activeProps={{ className: "text-[color:var(--herbal-deep)]" }}
                >
                  {t(`nav.${n.key}`)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 lg:gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-full border border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/15 transition text-[11px] tracking-[0.15em] uppercase font-semibold text-[color:var(--ink)]"
                aria-label="Toggle Language"
              >
                <Globe className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                <span>{language === "en" ? "العربية" : "EN"}</span>
              </button>

              <button aria-label="Search" className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:var(--gold)]/15 transition">
                <Search className="h-4 w-4" />
              </button>

              <button
                onClick={() => setOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/15 transition"
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-[10px] flex items-center justify-center font-medium"
                  >
                    {count}
                  </motion.span>
                )}
              </button>
              
              <button
                onClick={() => setMobile(true)}
                aria-label="Menu"
                className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full border border-[color:var(--gold)]/30"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[color:var(--ink)]/40 backdrop-blur-sm"
              onClick={() => setMobile(false)}
            />
            <motion.aside
              initial={{ x: isRtl ? "-100%" : "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: isRtl ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.2,0.7,0.2,1] }}
              className={`fixed top-0 bottom-0 z-[70] w-[86%] max-w-sm bg-[color:var(--sand)] flex flex-col ${
                isRtl ? "left-0 border-r" : "right-0 border-l"
              } border-[color:var(--gold)]/30`}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-[color:var(--gold)]/20" dir={isRtl ? "rtl" : "ltr"}>
                <div className="font-serif text-lg">{t("nav.menu")}</div>
                <button onClick={() => setMobile(false)} aria-label="Close"><X className="h-5 w-5" /></button>
              </div>
              <nav className="flex flex-col p-6 gap-1" dir={isRtl ? "rtl" : "ltr"}>
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMobile(false)}
                    className="py-4 border-b border-[color:var(--gold)]/15 font-serif text-2xl flex items-center justify-between">
                    <span>{t(`nav.${n.key}`)}</span>
                    <span className="text-xs text-[color:var(--gold)]">→</span>
                  </Link>
                ))}

                {/* Mobile Language Switcher inside Drawer */}
                <button
                  onClick={() => {
                    setLanguage(language === "en" ? "ar" : "en");
                    setMobile(false);
                  }}
                  className="mt-8 flex items-center justify-center gap-2.5 w-full h-12 rounded-sm border border-[color:var(--gold)]/40 hover:bg-[color:var(--gold)]/15 transition text-xs tracking-[0.2em] uppercase font-semibold text-[color:var(--ink)]"
                >
                  <Globe className="h-4 w-4 text-[color:var(--gold)]" />
                  <span>{language === "en" ? "العربية" : "English"}</span>
                </button>
              </nav>
              <div className="mt-auto p-6 text-xs text-[color:var(--muted-foreground)]" dir={isRtl ? "rtl" : "ltr"}>
                <div className="flex items-center gap-3 mb-2">
                  <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain rounded-full bg-white border border-[color:var(--gold)]/30" />
                  <div className="font-arabic text-[color:var(--gold)] text-sm font-semibold">النجمة المغربية للمنتجات الطبيعية</div>
                </div>
                Amman, Jordan · +962 79 515 2169
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
