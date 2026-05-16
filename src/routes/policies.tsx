import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/policies")({ component: Policies });

const sections = [
  { tag: "I", title: "Pricing", body: "All prices are listed in Jordanian Dinar (JD) and include applicable taxes. Prices are subject to change without prior notice. Promotional pricing is valid only for the period stated and cannot be combined with other offers." },
  { tag: "II", title: "Shipping & Delivery", body: "Complimentary shipping within Amman. Delivery to other governorates is calculated at checkout. Orders are dispatched within 24–48 hours. This is a demo experience — no orders are processed." },
  { tag: "III", title: "Returns", body: "Unopened pieces may be returned within 14 days of delivery for a full refund. Sealed cosmetic goods, opened oils and intimate items are non-returnable for hygiene reasons." },
  { tag: "IV", title: "Cookies", body: "We use first-party cookies to remember your cart, language preference and recent rituals. Third-party analytics (Meta Pixel, Google Analytics 4, Mixpanel) are used to understand traffic patterns. You may decline at any time." },
  { tag: "V", title: "Intellectual Property", body: "All imagery, copy, ritual formulations, packaging and brand marks are the property of Moroccan Star and Concord Trading Company. Reproduction without written consent is prohibited." },
  { tag: "VI", title: "Terms of Service", body: "By using this site you agree to behave lawfully, not to scrape or republish content, and to accept our pricing, shipping and returns policy. Disputes are governed by the laws of the Hashemite Kingdom of Jordan." },
];

function Policies() {
  return (
    <>
      <section className="py-20 lg:py-32 border-b border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-4">The Fine Print, Beautifully</div>
            <h1 className="font-serif text-6xl lg:text-7xl">Policies</h1>
            <p className="mt-6 text-[color:var(--muted-foreground)]">Quiet, transparent and considered — the way we keep our house in order.</p>
          </Reveal>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-10 space-y-14">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="grid grid-cols-[auto_1fr] gap-8 items-start">
                <div className="font-serif text-5xl text-[color:var(--gold)]/60">{s.tag}</div>
                <div>
                  <h2 className="font-serif text-3xl">{s.title}</h2>
                  <p className="mt-3 text-[color:var(--ink)]/75 leading-relaxed">{s.body}</p>
                </div>
              </div>
              <div className="hairline mt-10" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
