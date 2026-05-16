import { createFileRoute } from "@tanstack/react-router";
import { Reveal, GoldRule } from "@/components/site/Reveal";
import { products } from "@/lib/products";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/story")({ component: Story });

function Story() {
  const { t, isRtl } = useLanguage();

  const chapters = isRtl ? [
    { tag: "الفصل الأول", title: "الأطلس", body: "تبدأ الرحلة في أعالي جبال الأطلس المغربية — ثمار الأركان المعصورة يدوياً في وادي سوس، الطين الطبيعي المستخرج من ضفاف الأنهار الجبلية، والورد البلدي المقطوف عند الفجر في قلعة مكونة." },
    { tag: "الفصل الثاني", title: "التعاونيات النسائية", body: "ثلاث تعاونيات تقودها النساء تعصر وتقطر وتحضر كل منتج من منتجاتنا. ندفع أسعاراً أعلى من قيم التجارة العادلة، ونوقع عقوداً لعدة سنوات لتمكين المجتمعات المحلية، ونشحن دفعاتنا في حاويات صغيرة وموثقة." },
    { tag: "الفصل الثالث", title: "العبور الآمن", body: "تقوم مؤسسة فاتن حماد بنقل كل صندوق من الدار البيضاء إلى عمان — عبور مبرد وهادئ، ومحمي تماماً من الضوء والحرارة لضمان الحفاظ على الخواص العلاجية للمنتجات الطبيعية." },
    { tag: "الفصل الرابع", title: "الطقوس اليومية", body: "في عمان، ترعى شركة كونكورد للتجارة الرفوف — صابون بلدي أسود معتق لمدة ستة أسابيع، زيوت تم اختبارها وتعبئتها في دفعات صغيرة، وبكجات تم تجميعها بكل حب لتلائم روتين جمالك اليومي." },
  ] : [
    { tag: "Chapter I", title: "The Atlas", body: "It begins in the high Atlas — kernels cracked by hand in the Souss, clay carved from mountain riverbeds, roses harvested at dawn in Kelaat M'Gouna." },
    { tag: "Chapter II", title: "The Cooperatives", body: "Three women-led cooperatives press, distill and cure each piece. We pay above fair-trade, sign multi-year contracts, and ship in small, traceable batches." },
    { tag: "Chapter III", title: "The Crossing", body: "Faten Hammad Establishment carries each crate from Casablanca to Amman — a quiet, refrigerated crossing, sealed against light and heat." },
    { tag: "Chapter IV", title: "The Ritual", body: "In Amman, Concord Trading Co. curates the shelf — soaps cured for six weeks, oils tested in small batches, bundles assembled like compositions." },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative py-28 lg:py-40 overflow-hidden grain border-b border-[color:var(--gold)]/20">
        <img src={products[2].images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--sand)]/70 via-[color:var(--sand)]/85 to-[color:var(--sand)]" />
        <div className="relative mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <Reveal><GoldRule className="justify-center" /></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-6xl lg:text-8xl leading-[0.95]">
              {isRtl ? (
                <>من المغرب<br /><span className="italic text-[color:var(--herbal-deep)]">إلى بشرتك.</span></>
              ) : (
                <>From Morocco<br /><span className="italic text-[color:var(--herbal-deep)]">to your skin.</span></>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl mx-auto text-[color:var(--ink)]/75 leading-relaxed">
              {isRtl 
                ? "قرن من الحرف البربرية التقليدية، نُقلت بكل حب وعناية إلى عمان — ورُتبت لتصبح طقوس جمالك اليومية على رفوفك."
                : "A century of Berber craft, carried by hand to Amman — and quietly assembled into the rituals on your shelf."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-10 space-y-20">
          {chapters.map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)]">{c.tag}</div>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl">{c.title}</h2>
              <p className="mt-5 text-[color:var(--ink)]/75 leading-relaxed text-lg">{c.body}</p>
              <div className="hairline mt-10" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[color:var(--herbal-deep)] text-[color:var(--sand)]">
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl">{isRtl ? "الدار العريقة" : "The House"}</h2>
          <div className="mt-10 grid lg:grid-cols-3 gap-10 text-left">
            {[
              { k: isRtl ? "جهة الاستيراد" : "Import Entity", v: isRtl ? "مؤسسة فاتن حماد" : "Faten Hammad Establishment" },
              { k: isRtl ? "التوزيع والوكالة" : "Distribution", v: isRtl ? "شركة كونكورد التجارية" : "Concord Trading Company" },
              { k: isRtl ? "المؤسس" : "Founder", v: isRtl ? "بسام رشيد حسن" : "Bassam Rasheed Hassan" },
            ].map((b) => (
              <div key={b.k} className="border-t border-[color:var(--gold)]/30 pt-5">
                <div className={`text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)] ${isRtl ? "text-right" : "text-left"}`}>{b.k}</div>
                <div className={`font-serif text-2xl mt-2 ${isRtl ? "text-right" : "text-left"}`}>{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
