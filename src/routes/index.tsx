import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, GoldRule, Particles } from "@/components/site/Reveal";
import { ArrowRight, Star, Sparkles, Leaf, Droplet } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { isRtl } = useLanguage();
  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <Hero />
      <Marquee />
      <CategoryRail />
      <Featured />
      <RitualStory />
      <HowToRitual />
      <BundlesTease />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const { t, isRtl } = useLanguage();

  return (
    <section ref={ref} className="relative min-h-[100vh] -mt-16 lg:-mt-20 pt-16 lg:pt-20 overflow-hidden grain">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={products[0].images[0]}
          alt="Liquid Gold Argan"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--sand)]/40 via-[color:var(--sand)]/70 to-[color:var(--sand)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklch,var(--gold)_30%,transparent),transparent_55%)]" />
      </motion.div>
      <Particles count={22} />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-5 lg:px-10 pt-20 lg:pt-28 pb-32">
        <Reveal>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />
            {t("home.fromAtlas")}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 font-serif text-[12vw] sm:text-[9vw] lg:text-[6.5rem] leading-[0.95] tracking-tight max-w-5xl whitespace-pre-line">
            {t("home.heroTitle")}
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-32 items-end">
            <p className="text-base lg:text-lg leading-relaxed text-[color:var(--ink)]/75 max-w-md">
              {t("home.heroSubtitle")}
              <span className="block font-arabic text-[color:var(--herbal-deep)] mt-3 text-base" dir="rtl">
                {t("home.heroArabicText")}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link to="/rituals" className="group inline-flex items-center justify-center gap-3 h-14 px-8 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase">
                {t("home.exploreBtn")}
                <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
              </Link>
              <Link to="/story" className="inline-flex items-center justify-center h-14 px-8 border border-[color:var(--ink)]/30 text-xs tracking-[0.3em] uppercase hover:border-[color:var(--gold)] transition">
                {t("home.heritageBtn")}
              </Link>
            </div>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-[color:var(--ink)]/50">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-10 w-px bg-gradient-to-b from-[color:var(--ink)]/40 to-transparent"
        />
      </div>

      {/* Oil drop accent */}
      <div className="absolute right-8 top-32 hidden lg:block">
        <div className="oil-drop h-4 w-4 rounded-full bg-[color:var(--gold)] shadow-[0_0_20px_var(--gold)]" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["100% Natural", "Cold-Pressed", "Atlas Sourced", "Hand-Curated", "Cruelty-Free", "Apothecary Grade", "Heritage Recipes"];
  return (
    <section className="border-y border-[color:var(--gold)]/25 bg-[color:var(--sand-deep)]/60 py-5 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-12 text-xs tracking-[0.4em] uppercase text-[color:var(--ink)]/70">
            <Star className="h-3 w-3 fill-[color:var(--gold)] text-[color:var(--gold)]" />
            {it}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function CategoryRail() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-3">{t("home.apothecary")}</div>
              <h2 className="font-serif text-5xl lg:text-6xl max-w-xl">{t("home.sixRituals")}</h2>
            </div>
            <Link to="/rituals" className="gold-underline text-xs tracking-[0.3em] uppercase pb-1">{t("home.browseShelf")}</Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.06}>
              <Link to="/rituals" search={{ cat: c.key }} className="group block">
                <div className="aspect-[3/4] glass rounded-sm relative overflow-hidden flex flex-col items-center justify-center text-center p-5 hover:border-[color:var(--gold)]/60 transition">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">{c.tag}</div>
                  <div className="mt-3 font-serif text-xl lg:text-2xl">{isRtl ? c.labelAr : c.label}</div>
                  <div className="mt-1 font-arabic text-sm text-[color:var(--herbal-deep)]" dir="rtl">{isRtl ? c.label : c.labelAr}</div>
                  <div className="absolute bottom-4 left-0 right-0 text-[10px] tracking-[0.3em] uppercase text-[color:var(--ink)]/50 group-hover:text-[color:var(--herbal-deep)] transition">{t("home.discover")}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.badge).slice(0, 4);
  return (
    <section className="py-24 lg:py-36 bg-gradient-to-b from-transparent via-[color:var(--sand-deep)]/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <GoldRule className="justify-center" />
          <div className="text-center mt-6 mb-14">
            <h2 className="font-serif text-5xl lg:text-6xl">{t("home.signatureRituals")}</h2>
            <p className="text-[color:var(--muted-foreground)] mt-4 max-w-xl mx-auto">{t("home.signatureDesc")}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {featured.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function RitualStory() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-32 lg:py-44 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-[color:var(--sand-deep)] grain relative">
              <img src={products[2].images[0]} alt="Hammam" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--herbal-deep)]/30 via-transparent to-[color:var(--gold)]/20" />
            </div>
            <div className={`absolute -bottom-6 ${isRtl ? "-left-6" : "-right-6"} hidden lg:block glass p-6 max-w-xs`}>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">Est. since</div>
              <div className="font-serif text-4xl mt-1">1997</div>
              <div className="text-xs text-[color:var(--muted-foreground)] mt-2">Concord Trading Co. — importing Atlas-grown craft to Jordan for over two decades.</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-4">{t("home.fromMorocco")}</div>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight">{t("home.berberCraft")}</h2>
          <p className="mt-6 text-[color:var(--ink)]/75 leading-relaxed">
            {t("home.berberDesc")}
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { Icon: Leaf, k: "100%", v: t("home.natural") },
              { Icon: Droplet, k: "3", v: t("home.cooperatives") },
              { Icon: Sparkles, k: "20+", v: t("home.years") },
            ].map(({ Icon, k, v }, i) => (
              <div key={i} className="border-t border-[color:var(--gold)]/30 pt-4">
                <Icon className="h-4 w-4 text-[color:var(--gold)]" />
                <div className="font-serif text-3xl mt-2">{k}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">{v}</div>
              </div>
            ))}
          </div>
          <Link to="/story" className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase gold-underline pb-1">
            {t("home.readHeritage")} <ArrowRight className={`h-3 w-3 ${isRtl ? "rotate-180" : ""}`} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function HowToRitual() {
  const { t } = useLanguage();
  const ritual = products[1];
  return (
    <section className="py-24 lg:py-36 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,var(--gold),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.5em] text-[color:var(--gold)] mb-3">{t("home.fourMovements")}</div>
            <h2 className="font-serif text-5xl lg:text-6xl">{t("home.notRoutine")}</h2>
            <p className="mt-5 max-w-xl mx-auto text-[color:var(--sand)]/70">{ritual.story}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--gold)]/15">
          {ritual.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="p-10 bg-[color:var(--herbal-deep)] h-full">
                <div className="font-serif text-7xl text-[color:var(--gold)]/30 leading-none">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-6 text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">Step {i + 1}</div>
                <div className="font-serif text-2xl mt-2">{s.title}</div>
                <p className="mt-3 text-sm text-[color:var(--sand)]/70 leading-relaxed">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BundlesTease() {
  const { t, isRtl } = useLanguage();
  const bundles = products.filter((p) => p.category === "bundles").slice(0, 3);
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)] mb-3">{t("home.curatedBundles")}</div>
              <h2 className="font-serif text-5xl lg:text-6xl max-w-xl">{t("home.ceremoniesComplete")}</h2>
            </div>
            <Link to="/bundles" className="gold-underline text-xs tracking-[0.3em] uppercase pb-1">{t("home.allBundles")}</Link>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {bundles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link to="/rituals/$slug" params={{ slug: p.slug }} className="group block relative overflow-hidden aspect-[4/5] bg-[color:var(--sand-deep)]">
                <img src={p.images[0]} alt={p.name} className="product-zoom absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 text-[color:var(--sand)]">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">{p.ritual}</div>
                  <div className="font-serif text-3xl mt-2">{isRtl ? p.nameAr : p.name}</div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm opacity-70">{p.ritualTime}</span>
                    <span className="text-sm">{p.price} {t("cart.jd")}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t, isRtl } = useLanguage();
  const quotes = isRtl ? [
    { q: "لا أشعر أنه مجرد منتج للعناية بالبشرة — بل كأنه طقس جمالي هادئ أهديه لنفسي كل ليلة.", a: "ليلى · عمان" },
    { q: "اشتريت مجموعة الحمام كهدية لأمي وانتهى بي الأمر بالاحتفاظ بواحدة لنفسي. زيت الأركان لا يعلى عليه.", a: "دينا · مادبا" },
    { q: "كان طقس إشراق العروس برنامجي المفضل لأربعة أسابيع. النتائج تتحدث عن نفسها.", a: "رشا · إربد" },
  ] : [
    { q: "It doesn't feel like skincare — it feels like a small ceremony I gift myself every night.", a: "Layla · Amman" },
    { q: "I bought the Hammam kit for my mother and ended up keeping one for myself. The argan is unmatched.", a: "Dina · Madaba" },
    { q: "The Wedding Glow ritual was my four-week ceremony. The photos speak for themselves.", a: "Rasha · Irbid" },
  ];
  return (
    <section className="py-24 lg:py-32 border-y border-[color:var(--gold)]/20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <h2 className="font-serif text-4xl lg:text-5xl text-center mb-16">{t("home.quietlyDevoted")}</h2>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {quotes.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="text-center">
                <div className="flex justify-center gap-1 text-[color:var(--gold)]">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                </div>
                <blockquote className="font-serif text-xl lg:text-2xl mt-6 leading-snug italic">"{t.q}"</blockquote>
                <figcaption className="mt-6 text-[10px] tracking-[0.4em] uppercase text-[color:var(--muted-foreground)]">{t.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { t, isRtl } = useLanguage();
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)] mb-4">{t("home.atelierLetter")}</div>
          <h2 className="font-serif text-4xl lg:text-5xl">{t("home.slowNews")}</h2>
          <p className="mt-4 text-[color:var(--muted-foreground)]">{t("home.letterDesc")}</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert(isRtl ? "شكرًا لك على اشتراكك!" : "Demo only — thank you for subscribing!"); }}>
            <input type="email" required placeholder={t("home.placeholderEmail")} className="flex-1 h-12 px-5 bg-transparent border border-[color:var(--ink)]/25 focus:border-[color:var(--gold)] outline-none text-sm" />
            <button className="h-12 px-7 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase">{t("home.subscribe")}</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
