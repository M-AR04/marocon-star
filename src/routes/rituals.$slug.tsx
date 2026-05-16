import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/site/Reveal";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X, ZoomIn, Minus, Plus, ArrowRight, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/rituals/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
});

const benefitTranslations: Record<string, string> = {
  "Anti-aging": "محاربة الشيخوخة",
  "Deep nourishment": "تغذية عميقة",
  "Luminous glow": "إشراقة مضيئة",
  "Brightening": "تفتيح وتبييض",
  "Even tone": "توحيد لون البشرة",
  "Radiance": "نضارة وإشراق",
  "Deep cleansing": "تنظيف عميق",
  "Detoxifies": "تنقية من السموم",
  "Velvet softness": "نعومة مخملية",
  "Resurfaces": "تجديد سطح البشرة",
  "Refines pores": "تضييق المسام",
  "Plumping": "امتلاء ونضارة",
  "Intense moisture": "ترطيب مكثف",
  "Softens": "تنعيم فائق",
  "Repairs": "إصلاح البشرة",
  "Gentle cleanse": "تنظيف لطيف",
  "Balances": "موازنة البشرة",
  "Refresh": "انتعاش",
  "Glow": "إشراق ونضارة",
  "Bridal radiance": "إشراقة العروس",
  "Hydrating": "مرطب للبشرة",
  "Calming": "مهدئ للبشرة",
  "Restorative": "مرمم ومجدد",
  "Detoxifying": "منقي للبشرة",
  "Polishing": "صقل وتقشير",
  "Sensorial": "تجربة حسية",
  "Hydration": "ترطيب ونعومة",
  "Firms": "شد البشرة",
  "Smooths": "تنعيم البشرة",
  "Soft": "بشرة ناعمة",
  "Calm": "بشرة هادئة"
};

const ingredientTranslations: Record<string, { name: string; note: string }> = {
  "Cold-pressed Argan": { name: "زيت الأركان المعصور على البارد", note: "مستخلص من وادي سوس بالمغرب" },
  "Vitamin E": { name: "فيتامين E", note: "لحماية حاجز البشرة الطبيعي" },
  "Prickly Pear Seed Oil": { name: "زيت بذور التين الشوكي", note: "معصور على البارد، غني بمضادات الأكسدة" },
  "Saffron threads": { name: "خيوط الزعفران الحر", note: "مقطوف يدوياً من تاليوين" },
  "Beldi Black Soap": { name: "الصابون البلدي الأسود", note: "عجينة الزيتون، معتقة بالطريقة التقليدية" },
  "Eucalyptus": { name: "العشبة المعطرة الكالبتوس", note: "مبخرة لإنعاش وتصفية الذهن" },
  "Rhassoul Clay": { name: "طين الغاسول المغربي", note: "مستخرج من مناجم جبال الأطلس" },
  "Rose water": { name: "ماء الورد الطبيعي", note: "مقطر في قلعة مكونة (وادي الورود)" },
  "Raw Shea Butter": { name: "زبدة الشيا الخام", note: "مخفوقة وغير مكررة" },
  "Damask Rose": { name: "الورد الدمشقي", note: "مقطر من بتلات الورد الطبيعي" },
  "Olive oil": { name: "زيت الزيتون النقي", note: "العصرة الأولى البكر" },
  "Mountain herbs": { name: "أعشاب الجبل الطبيعية", note: "مجففة تحت أشعة الشمس" },
  "Argan + Saffron oil": { name: "زيت الأركان والزعفران", note: "قطرات الإشراق الليلي" },
  "Rose clay mask": { name: "ماسك طين الورد", note: "لتجديد البشرة الأسبوعي" },
  "Atlas butter": { name: "زبدة الأطلس المعطرة", note: "طقس ترطيب وإغلاق مسام الجسم" },
  "Prickly pear oil": { name: "زيت التين الشوكي الفاخر", note: "سيروم مغذٍ ليلي" },
  "Honey + oat mask": { name: "ماسك العسل والشوفان", note: "مرتين في الأسبوع" },
  "Beldi soap": { name: "الصابون البلدي", note: "طقس الحمام المغربي الأسبوعي" },
  "Black soap": { name: "الصابون الأسود التقليدي", note: "تراث الحمام البلدي" },
  "Kessa mitt": { name: "ليفة الكيس المغربية", note: "منسوجة يدوياً بجودة عالية" },
  "Argan oil": { name: "زيت الأركان الأصلي", note: "لمسة الترطيب النهائية" },
  "Rose water tonic": { name: "تونيك ماء الورد", note: "رذاذ وتونر منعش للبشرة" },
  "Shea balm": { name: "بلسم الشيا المغذي", note: "للشفاه والمناطق الجافة" },
  "Cactus seed oil": { name: "زيت بذور الصبار", note: "سيروم ليلي فعال ومجدد" },
  "Black seed": { name: "الحبة السوداء", note: "إكسير مهدئ ومرمم للبشرة" },
  "Argan-shea balm": { name: "بلسم الأركان والشيا", note: "حماية وترطيب مكثف طوال الليل" },
  "Pink clay": { name: "الطين الوردي اللطيف", note: "مثالي للبشرة الحساسة" },
  "Damask rose": { name: "الورد الجوري الدمشقي", note: "بتلات طبيعية مقطرة بعناية" }
};

const storyTranslations: Record<string, string> = {
  "Pressed from kernels gathered under the Atlas sun, a single drop carries centuries of Berber craft into your evening ritual.":
    "معصور من ثمار الأركان التي جُمعت تحت شمس الأطلس الدافئة، قطرة واحدة تحمل قروناً من الحرف التقليدية البربرية إلى طقوس جمالك المسائية.",
  "A ritual that mirrors the first golden hour over the medina — slow, warm, and quietly transformative.":
    "طقس يجسد الساعة الذهبية الأولى فوق المدينة القديمة — هادئ، دافئ، ومحول للبشرة بلطف.",
  "Step into the marble silence of a Marrakech hammam — softened skin, cleared mind, an entire ritual in a single jar.":
    "ادخلي إلى هدوء الحمام المراكشي الرخامي — بشرة ناعمة كالحرير، ذهن صافٍ، وطقس متكامل في مرطبان واحد.",
  "Mineral-rich clay drawn from the high Atlas — a single mask reads as a quiet, weekly reset.":
    "طين غني بالمعادن مستخلص من أعالي جبال الأطلس — قناع واحد بمثابة إعادة تهيئة أسبوعية هادئة لبشرتك.",
  "Whipped slowly, scented with petals carried down from the Valley of Roses each spring.":
    "مخفوق ببطء، ومعطر ببتلات الورد التي تُحمل من وادي الورود في كل ربيع.",
  "Cold-process bars cured for six weeks — the kind of soap your grandmother would recognize.":
    "قطع صابون محضرة على البارد ومعتقة لمدة ستة أسابيع — الصابون الأصيل الذي ستتعرف عليه جدتك فوراً.",
  "A 30-day preparation curated for the most photographed week of a lifetime — petals, gold, and a quiet daily ceremony.":
    "برنامج عناية لمدة 30 يوماً منسق خصيصاً لأهم أسابيع العمر — بتلات، ذهب، وطقس يومي هادئ للعروس.",
  "A holy month deserves a quieter shelf — three pieces designed for the slow nightly ritual after iftar.":
    "شهر مبارك يستحق روتين عناية هادئ ومميز — ثلاثة مستحضرات مصممة للطقوس الليلية الهادئة بعد الإفطار.",
  "The full hammam ritual, plated for the home: steam, soap, mitt, clay, and a final pour of liquid gold.":
    "طقس الحمام المغربي الكامل، مجهز للاستخدام المنزلي: بخار، صابون بلدي، ليفة الكيس، طين الغاسول، ولمسة نهائية من زيت الأركان (الذهب السائل).",
  "A daily three-piece capsule — the simplest, most loyal ritual we make.":
    "مجموعة يومية من ثلاثة مستحضرات أساسية — الطقس الأبسط والأكثر وفاءً لجمالك اليومي.",
  "Engineered for skin asking for quiet repair — a 28-day protocol with three steady actives.":
    "مصمم خصيصاً للبشرة التي تحتاج إلى ترميم وإصلاح هادئ — برنامج علاجي لمدة 28 يوماً بثلاثة مكونات نشطة وفعالة.",
  "A softer cousin to the Rhassoul ritual — pink clay, rose petals, a glass of mint tea.":
    "بديل لطيف لطقوس طين الغاسول التقليدي — طين وردي ناعم، بتلات الورد، وكوب من الشاي المغربي بالنعناع."
};

const stepTranslations: Record<string, { title: string; detail: string }> = {
  // Liquid Gold
  "Warm": { title: "الدفء", detail: "اضغط 3 قطرات بين راحتيك لتنشيط الزيت الفاخر." },
  "Press": { title: "الضغط والتربيت", detail: "ربت بالزيت على وجهك ورقبتك وصدرك النظيف." },
  "Breathe": { title: "التنفس العميق", detail: "استنشق بعمق — ودع الدفء يستقر في خلايا بشرتك." },
  "Glow": { title: "الإشراق واللمعان", detail: "استيقظ ببشرة ناعمة ومشرقة من الداخل." },
  
  // Brightening
  "Cleanse": { title: "التنظيف", detail: "ابدأ ببشرة نظيفة وجافة تماماً." },
  "Apply": { title: "التطبيق", detail: "وزع قطرتين على كامل الوجه بحركات تصاعدية لطيفة." },
  "Massage": { title: "التدليك", detail: "دلك بشرتك، وارفعها، ثم ارخها لمدة 60 ثانية." },
  "Reveal": { title: "إشراقة مبهرة", detail: "تظهر البشرة أكثر إشراقاً وتوحيداً." },

  // Hammam
  "Steam": { title: "البخار والحرارة", detail: "افتح المسام تحت الماء الدافئ لمدة 5 دقائق." },
  "Exfoliate": { title: "التقشير والتنعيم", detail: "دلك بشرتك بليفة الكيس المغربية بحركات طولية." },
  "Rinse": { title: "الشطف النهائي", detail: "اشطف جسمك واكشف عن بشرة مصقولة ومتجددة." },

  // Rhassoul
  "Mix": { title: "الخلط والتحضير", detail: "امزج طين الغاسول بماء الورد للحصول على معجون مخملي." },
  "Rest": { title: "الاسترخاء والراحة", detail: "استرخِ لمدة 10 دقائق بينما يقوم الطين بسحب الشوائب." },

  // Rose butter
  "Warm up": { title: "تنشيط الزبدة", detail: "خذ كمية صغيرة بأطراف أصابعك لتذوب بحرارة جسمك." },
  "Wrap": { title: "اللف بالقطن", detail: "التف بقطن دافئ لتمتص بشرتك كامل المغذيات والترطيب." },
  "Feel": { title: "الملمس الحريري", detail: "استمتع بملمس حريري يدوم لساعات طويلة." },

  // Olive soap
  "Lather": { title: "الرغوة الفاخرة", detail: "رغّ الصابون بين يديك للحصول على رغوة كريمية غنية." },
  "Sweep": { title: "المساج الدائري", detail: "دلك بشرتك بحركات دائرية هادئة ولطيفة." },
  "Soften": { title: "الترطيب والتنعيم", detail: "جفف وجهك بلطف — ستشعر ببشرة ناعمة وخفيفة." },

  // Wedding Glow
  "Week 1": { title: "الأسبوع الأول", detail: "النعومة الفائقة — تنظيف لطيف وتطبيق يومي للزيت." },
  "Week 2": { title: "الأسبوع الثاني", detail: "تجديد الخلايا — تطبيق قناع الغاسول الأسبوعي." },
  "Week 3": { title: "الأسبوع الثالث", detail: "اللمعان والنضارة — تطبيق قطرات الزعفران والأركان." },
  "Week 4": { title: "الأسبوع الرابع", detail: "إغلاق المسام والترطيب — زبدة الأطلس من الرأس إلى القدم." },

  // Ramadan
  "Serum": { title: "السيروم المغذي", detail: "تطبيق قطرتين من زيت التين الشوكي الفاخر لترميم البشرة." },

  // Spa
  "Soap": { title: "الصابون البلدي", detail: "ضع الصابون البلدي الأسود على كامل الجسم لمدة 5 دقائق." },
  "Polish": { title: "التقشير والصقل", detail: "استخدم ليفة الكيس المغربية بحركات تصاعدية لإزالة الخلايا الميتة." },
  "Seal": { title: "إغلاق المسام والترطيب", detail: "دلك زيت الأركان النقي على بشرة لا تزال رطبة." },

  // Reset
  "Prep": { title: "التحضير والتهيئة", detail: "نظف بشرتك جيداً ثم استخدم التونر." },
  "Active": { title: "المكونات النشطة", detail: "طبق 3 قطرات من زيت بذور الصبار الفعال." },
  "Calm": { title: "التهدئة والراحة", detail: "اضغط إكسير الحبة السوداء المهدئ في خلايا البشرة." },

  // Rose clay
  "Music": { title: "الموسيقى والاسترخاء", detail: "استرخِ لمدة 10 دقائق مع الموسيقى الهادئة أو كوب شاي." }
};

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
  const { t, isRtl } = useLanguage();

  const onMove = (e: React.MouseEvent) => {
    const rect = imgRef.current!.getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const related = products.filter((r) => r.id !== p.id && r.category === p.category).slice(0, 4);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <section className="py-8 border-b border-[color:var(--gold)]/15 text-xs text-[color:var(--muted-foreground)]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center gap-2">
          <Link to="/" className="hover:text-[color:var(--herbal-deep)]">{t("nav.home")}</Link>
          <span>/</span>
          <Link to="/rituals" className="hover:text-[color:var(--herbal-deep)]">{t("nav.rituals")}</Link>
          <span>/</span>
          <span className="text-[color:var(--ink)]">{isRtl ? p.nameAr : p.name}</span>
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
              {p.badge && <span className={`absolute top-5 ${isRtl ? "right-5" : "left-5"} z-10 px-3 py-1 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--herbal-deep)]/90 text-[color:var(--sand)]`}>{p.badge}</span>}
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
              <div className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"} h-10 w-10 rounded-full glass flex items-center justify-center pointer-events-none`}>
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
              <h1 className="font-serif text-4xl lg:text-6xl mt-3 leading-[1.05]">{isRtl ? p.nameAr : p.name}</h1>
              <div className="font-arabic text-lg text-[color:var(--herbal-deep)] mt-2" dir={isRtl ? "ltr" : "rtl"}>{isRtl ? p.name : p.nameAr}</div>

              <p className="mt-6 text-[color:var(--ink)]/75 leading-relaxed">
                {isRtl ? (storyTranslations[p.story] || p.story) : p.story}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {p.benefits.map((b) => (
                  <span key={b} className="px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase bg-[color:var(--sand-deep)] border border-[color:var(--gold)]/30">
                    <Check className={`h-3 w-3 inline-block ${isRtl ? "ml-1.5" : "mr-1.5"} text-[color:var(--herbal-deep)]`} />
                    {isRtl ? (benefitTranslations[b] || b) : b}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="border-t border-[color:var(--gold)]/30 pt-3">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">
                    <Clock className="h-3 w-3" /> 
                    <span>{isRtl ? "وقت التطبيق" : "Ritual time"}</span>
                  </div>
                  <div className="font-serif text-2xl mt-1">{p.ritualTime}</div>
                </div>
                <div className="border-t border-[color:var(--gold)]/30 pt-3">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">
                    <Sparkles className="h-3 w-3" /> 
                    <span>{isRtl ? "الطقس الكامل" : "Complete ritual"}</span>
                  </div>
                  <div className="font-serif text-2xl mt-1">{p.price} {t("cart.jd")}</div>
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
                  {isRtl ? "ابدأ هذا الطقس · " : "Begin this ritual · "} {(p.price * qty).toFixed(0)} {t("cart.jd")}
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 text-[color:var(--muted-foreground)]">
                {isRtl ? "شحن مجاني في عمان · تجربة عرض." : "Complimentary shipping in Amman · Demo experience."}
              </p>
            </Reveal>

            {/* tabs */}
            <div className="mt-14">
              <div className="flex gap-6 border-b border-[color:var(--gold)]/20">
                {(["ritual", "ingredients", "story"] as const).map((tabId) => (
                  <button
                    key={tabId}
                    onClick={() => setTab(tabId)}
                    className={`pb-3 text-[10px] tracking-[0.4em] uppercase ${tab === tabId ? "border-b border-[color:var(--herbal-deep)] text-[color:var(--herbal-deep)]" : "text-[color:var(--muted-foreground)]"}`}
                  >
                    {tabId === "ritual" ? (isRtl ? "طقس التطبيق" : "The Ritual") : tabId === "ingredients" ? (isRtl ? "المكونات الطبيعية" : "Ingredients") : (isRtl ? "المصدر والأصل" : "Origin")}
                  </button>
                ))}
              </div>
              <div className="pt-8">
                {tab === "ritual" && (
                  <ol className="space-y-5">
                    {p.steps.map((s, i) => {
                      const translatedStep = stepTranslations[s.title];
                      return (
                        <li key={i} className="flex gap-5">
                          <div className="font-serif text-3xl text-[color:var(--gold)] w-10 shrink-0">{String(i + 1).padStart(2, "0")}</div>
                          <div>
                            <div className="font-serif text-xl">
                              {isRtl && translatedStep ? translatedStep.title : s.title}
                            </div>
                            <div className="text-sm text-[color:var(--muted-foreground)] mt-1">
                              {isRtl && translatedStep ? translatedStep.detail : s.detail}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
                {tab === "ingredients" && (
                  <ul className="space-y-4">
                    {p.ingredients.map((it) => {
                      const translatedIng = ingredientTranslations[it.name];
                      return (
                        <li key={it.name} className="border-b border-[color:var(--gold)]/15 pb-4">
                          <div className="font-serif text-xl">
                            {isRtl && translatedIng ? translatedIng.name : it.name}
                          </div>
                          <div className="text-sm text-[color:var(--muted-foreground)] mt-0.5">
                            {isRtl && translatedIng ? translatedIng.note : it.note}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {tab === "story" && (
                  <p className="text-[color:var(--ink)]/75 leading-relaxed">
                    {isRtl ? (storyTranslations[p.story] || p.story) : p.story}
                  </p>
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
              <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)] mb-3">
                {isRtl ? "نتائج مرئية" : "Visual Demonstration"}
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl">
                {isRtl ? "قبل · بعد" : "Before · After"}
              </h2>
              <p className="text-[color:var(--muted-foreground)] mt-3">
                {isRtl ? "اسحب الخط لمشاهدة التحول المذهل للبشرة." : "Drag the line to see the transformation."}
              </p>
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
              <div className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} px-3 py-1 bg-[color:var(--ink)]/60 text-[color:var(--sand)] text-[10px] tracking-[0.3em] uppercase`}>
                {isRtl ? "قبل" : "Before"}
              </div>
              <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} px-3 py-1 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-[10px] tracking-[0.3em] uppercase`}>
                {isRtl ? "بعد 28 يوماً" : "After 28 days"}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-3xl lg:text-4xl">
                {isRtl ? "أكمل طقوس جمالك" : "Complete the ceremony"}
              </h2>
              <Link to="/rituals" className="gold-underline text-xs tracking-[0.3em] uppercase pb-1">
                {isRtl ? "كل الطقوس ←" : "All rituals →"}
              </Link>
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
    </div>
  );
}
