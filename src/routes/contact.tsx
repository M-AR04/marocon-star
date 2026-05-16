import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, Instagram, Facebook, Globe, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="py-20 lg:py-32 border-b border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-12 items-end">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-4">Reach the Atelier</div>
            <h1 className="font-serif text-6xl lg:text-7xl leading-[0.95]">A quiet line,<br /><span className="italic text-[color:var(--herbal-deep)]">always open.</span></h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[color:var(--muted-foreground)] max-w-md">Whether for a ritual consultation, a bridal program, or a wholesale conversation — we answer with care, in Arabic or English.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div className="space-y-8">
              <Row Icon={MapPin} k="Headquarters" v="Amman, Jordan" sub="Concord Trading Company · Faten Hammad Est." />
              <Row Icon={Phone} k="Phone" v="0795152169" />
              <Row Icon={Phone} k="Phone" v="0792681894" />
              <Row Icon={Mail} k="Email" v="arganconcordtrading@gmail.com" />
              <Row Icon={Instagram} k="Instagram" v="@dadoo.shop" />
              <Row Icon={Facebook} k="Facebook" v="moroccanstargroup" />
              <Row Icon={Globe} k="Website" v="moroccanstar.net" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass p-8 lg:p-10 rounded-sm space-y-5">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Name</label>
                <input required className="mt-2 w-full h-12 px-4 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Email</label>
                <input type="email" required className="mt-2 w-full h-12 px-4 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Message</label>
                <textarea required rows={5} className="mt-2 w-full px-4 py-3 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <button className="w-full h-12 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase inline-flex items-center justify-center gap-3">
                {sent ? "Message Received" : <>Send <Send className="h-3 w-3" /></>}
              </button>
              <p className="text-[10px] text-center text-[color:var(--muted-foreground)] italic">Demo experience — no message is sent.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({ Icon, k, v, sub }: { Icon: any; k: string; v: string; sub?: string }) {
  return (
    <div className="flex gap-5 border-b border-[color:var(--gold)]/15 pb-6">
      <div className="h-12 w-12 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[color:var(--gold)]" />
      </div>
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--muted-foreground)]">{k}</div>
        <div className="font-serif text-xl mt-1">{v}</div>
        {sub && <div className="text-xs text-[color:var(--muted-foreground)] mt-1">{sub}</div>}
      </div>
    </div>
  );
}
