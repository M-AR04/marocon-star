import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/bundles")({ component: Bundles });

const storyTranslations: Record<string, string> = {
  "A 30-day preparation curated for the most photographed week of a lifetime — petals, gold, and a quiet daily ceremony.":
    "برنامج عناية مكثف لمدة 30 يوماً منسق خصيصاً لأهم أسابيع العمر — بتلات الورد، الذهب السائل، وطقوس يومية هادئة لإشراقة العروس.",
  "A holy month deserves a quieter shelf — three pieces designed for the slow nightly ritual after iftar.":
    "شهر مبارك يستحق روتين عناية هادئ ومميز — ثلاثة مستحضرات أساسية مصممة للطقوس الليلية الهادئة بعد الإفطار وتجديد حيوية البشرة.",
  "The full hammam ritual, plated for the home: steam, soap, mitt, clay, and a final pour of liquid gold.":
    "طقس الحمام المغربي الكامل، مجهز للاستخدام المنزلي الفاخر: بخار، صابون بلدي أسود، ليفة الكيس، طين الغاسول، ولمسة نهائية من زيت الأركان الأصلي."
};

const ingredientTranslations: Record<string, { name: string; note: string }> = {
  "Argan + Saffron oil": { name: "زيت الأركان والزعفران", note: "قطرات الإشراق الليلي" },
  "Rose clay mask": { name: "ماسك طين الورد", note: "لتجديد البشرة الأسبوعي" },
  "Atlas butter": { name: "زبدة الأطلس المعطرة", note: "طقس ترطيب وإغلاق مسام الجسم" },
  "Prickly pear oil": { name: "زيت التين الشوكي الفاخر", note: "سيروم مغذٍ ليلي" },
  "Honey + oat mask": { name: "ماسك العسل والشوفان", note: "مرتين في الأسبوع" },
  "Beldi soap": { name: "الصابون البلدي", note: "طقس الحمام المغربي الأسبوعي" },
  "Black soap": { name: "الصابون الأسود التقليدي", note: "تراث الحمام البلدي" },
  "Kessa mitt": { name: "ليفة الكيس المغربية", note: "منسوجة يدوياً بجودة عالية" },
  "Argan oil": { name: "زيت الأركان الأصلي", note: "لمسة الترطيب النهائية" },
  "Rose water tonic": { name: "تونيك ماء الورد", note: "رذاذ وتونر منعش للبشرة" }
};

function Bundles() {
  const bundles = products.filter((p) => p.category === "bundles");
  const { t, isRtl } = useLanguage();

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <section className="py-20 lg:py-32 border-b border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-4">
              {isRtl ? "البكجات والطقوس المنسقة" : "Curated Bundles"}
            </div>
            <h1 className="font-serif text-6xl lg:text-8xl leading-[0.95] max-w-4xl">
              {isRtl ? (
                <>طقوس متكاملة، <span className="italic text-[color:var(--herbal-deep)]">لجمالكِ.</span></>
              ) : (
                <>Ceremonies, <span className="italic text-[color:var(--herbal-deep)]">complete.</span></>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-[color:var(--muted-foreground)]">
              {isRtl 
                ? "مجموعات فاخرة ومنسقة بعناية من طقوس الجمال العضوية — للعروس، ولليالي رمضان الهادئة، وللحمام المغربي التقليدي بالمنزل."
                : "Emotional bundles — for weddings, Ramadan, the at-home hammam, and the slow daily awakening."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 space-y-16">
          {bundles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link to="/rituals/$slug" params={{ slug: p.slug }} className={`group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`relative aspect-[4/5] overflow-hidden bg-[color:var(--sand-deep)] dark:bg-white grain ${isRtl ? "[direction:rtl]" : "[direction:ltr]"}`}>
                  <img src={p.images[0]} alt={p.name} className="product-zoom absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
                  {p.badge && <span className={`absolute top-5 ${isRtl ? "right-5" : "left-5"} px-3 py-1 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--herbal-deep)]/90 text-[color:var(--sand)]`}>{p.badge}</span>}
                </div>
                <div className={isRtl ? "[direction:rtl]" : "[direction:ltr]"}>
                  <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)]">{p.ritual}</div>
                  <h2 className="font-serif text-4xl lg:text-5xl mt-3">{isRtl ? p.nameAr : p.name}</h2>
                  <div className="font-arabic text-lg text-[color:var(--herbal-deep)] mt-1" dir={isRtl ? "ltr" : "rtl"}>{isRtl ? p.name : p.nameAr}</div>
                  <p className="mt-5 text-[color:var(--ink)]/75 leading-relaxed">
                    {isRtl ? (storyTranslations[p.story] || p.story) : p.story}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {p.ingredients.map((it) => {
                      const translatedIng = ingredientTranslations[it.name];
                      return (
                        <li key={it.name} className="text-sm flex gap-3">
                          <span className="text-[color:var(--gold)]">◆</span>
                          <span>
                            <b className="font-medium">
                              {isRtl && translatedIng ? translatedIng.name : it.name}
                            </b> — <span className="text-[color:var(--muted-foreground)]">
                              {isRtl && translatedIng ? translatedIng.note : it.note}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-8 flex items-center gap-6">
                    <span className="font-serif text-3xl">{p.price} {t("cart.jd")}</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">{p.ritualTime}</span>
                    <span className={`ml-auto text-xs tracking-[0.3em] uppercase gold-underline pb-1 ${isRtl ? "mr-auto ml-0" : ""}`}>
                      {isRtl ? "استكشف طقوس البكج ←" : "Explore →"}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
