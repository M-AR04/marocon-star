import { createFileRoute } from "@tanstack/react-router";
import { Reveal, GoldRule } from "@/components/site/Reveal";
import { products } from "@/lib/products";

export const Route = createFileRoute("/story")({ component: Story });

function Story() {
  const chapters = [
    { tag: "Chapter I", title: "The Atlas", body: "It begins in the high Atlas — kernels cracked by hand in the Souss, clay carved from mountain riverbeds, roses harvested at dawn in Kelaat M'Gouna." },
    { tag: "Chapter II", title: "The Cooperatives", body: "Three women-led cooperatives press, distill and cure each piece. We pay above fair-trade, sign multi-year contracts, and ship in small, traceable batches." },
    { tag: "Chapter III", title: "The Crossing", body: "Faten Hammad Establishment carries each crate from Casablanca to Amman — a quiet, refrigerated crossing, sealed against light and heat." },
    { tag: "Chapter IV", title: "The Ritual", body: "In Amman, Concord Trading Co. curates the shelf — soaps cured for six weeks, oils tested in small batches, bundles assembled like compositions." },
  ];

  return (
    <>
      <section className="relative py-28 lg:py-40 overflow-hidden grain border-b border-[color:var(--gold)]/20">
        <img src={products[2].images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--sand)]/70 via-[color:var(--sand)]/85 to-[color:var(--sand)]" />
        <div className="relative mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <Reveal><GoldRule className="justify-center" /></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-6xl lg:text-8xl leading-[0.95]">From Morocco<br /><span className="italic text-[color:var(--herbal-deep)]">to your skin.</span></h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl mx-auto text-[color:var(--ink)]/75 leading-relaxed">A century of Berber craft, carried by hand to Amman — and quietly assembled into the rituals on your shelf.</p>
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
          <h2 className="font-serif text-4xl lg:text-5xl">The House</h2>
          <div className="mt-10 grid lg:grid-cols-3 gap-10 text-left">
            {[
              { k: "Import Entity", v: "Faten Hammad Establishment" },
              { k: "Distribution", v: "Concord Trading Company" },
              { k: "Founder", v: "Bassam Rasheed Hassan" },
            ].map((b) => (
              <div key={b.k} className="border-t border-[color:var(--gold)]/30 pt-5">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">{b.k}</div>
                <div className="font-serif text-2xl mt-2">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
