import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, Instagram, Facebook, Globe, Send } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  const { t, isRtl } = useLanguage();

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <section className="py-20 lg:py-32 border-b border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-12 items-end">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-4">
              {isRtl ? "تواصل مع المتجر" : "Reach the Atelier"}
            </div>
            <h1 className="font-serif text-6xl lg:text-7xl leading-[0.95]">
              {isRtl ? (
                <>خط تواصل هادئ،<br /><span className="italic text-[color:var(--herbal-deep)]">مفتوح دائماً.</span></>
              ) : (
                <>A quiet line,<br /><span className="italic text-[color:var(--herbal-deep)]">always open.</span></>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[color:var(--muted-foreground)] max-w-md">
              {isRtl
                ? "سواء كان ذلك للاستفسار عن طقوس الجمال، أو روتين العناية بالعروس، أو لمبيعات الجملة — نجيب بكل سرور واهتمام، بالعربية أو الإنجليزية."
                : "Whether for a ritual consultation, a bridal program, or a wholesale conversation — we answer with care, in Arabic or English."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div className="space-y-8">
              <Row Icon={MapPin} k={isRtl ? "المقر الرئيسي" : "Headquarters"} v={isRtl ? "عمان، الأردن" : "Amman, Jordan"} sub={isRtl ? "شركة كونكورد التجارية · مؤسسة فاتن حماد" : "Concord Trading Company · Faten Hammad Est."} isRtl={isRtl} />
              <Row Icon={Phone} k={isRtl ? "الهاتف" : "Phone"} v="0795152169" isRtl={isRtl} />
              <Row Icon={Phone} k={isRtl ? "الهاتف" : "Phone"} v="0792681894" isRtl={isRtl} />
              <Row Icon={Mail} k={isRtl ? "البريد الإلكتروني" : "Email"} v="arganconcordtrading@gmail.com" isRtl={isRtl} />
              <Row Icon={Instagram} k="Instagram" v="@dadoo.shop" isRtl={isRtl} />
              <Row Icon={Facebook} k="Facebook" v="moroccanstargroup" isRtl={isRtl} />
              <Row Icon={Globe} k={isRtl ? "الموقع الإلكتروني" : "Website"} v="moroccanstar.net" isRtl={isRtl} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass p-8 lg:p-10 rounded-sm space-y-5">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">
                  {isRtl ? "الاسم" : "Name"}
                </label>
                <input required className="mt-2 w-full h-12 px-4 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">
                  {isRtl ? "البريد الإلكتروني" : "Email"}
                </label>
                <input type="email" required className="mt-2 w-full h-12 px-4 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">
                  {isRtl ? "الرسالة" : "Message"}
                </label>
                <textarea required rows={5} className="mt-2 w-full px-4 py-3 bg-transparent border border-[color:var(--ink)]/15 focus:border-[color:var(--gold)] outline-none text-sm" />
              </div>
              <button className="w-full h-12 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase inline-flex items-center justify-center gap-3">
                {sent ? (isRtl ? "تم استلام رسالتك" : "Message Received") : <>{isRtl ? "إرسال" : "Send"} <Send className={`h-3 w-3 ${isRtl ? "rotate-180" : ""}`} /></>}
              </button>
              <p className="text-[10px] text-center text-[color:var(--muted-foreground)] italic">
                {isRtl ? "تجربة عرض فقط — لم يتم إرسال أي رسالة." : "Demo experience — no message is sent."}
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Row({ Icon, k, v, sub, isRtl }: { Icon: any; k: string; v: string; sub?: string; isRtl?: boolean }) {
  return (
    <div className="flex gap-5 border-b border-[color:var(--gold)]/15 pb-6">
      <div className="h-12 w-12 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[color:var(--gold)]" />
      </div>
      <div>
        <div className={`text-[10px] tracking-[0.4em] uppercase text-[color:var(--muted-foreground)] ${isRtl ? "text-right" : "text-left"}`}>{k}</div>
        <div className={`font-serif text-xl mt-1 ${isRtl ? "text-right" : "text-left"}`}>{v}</div>
        {sub && <div className={`text-xs text-[color:var(--muted-foreground)] mt-1 ${isRtl ? "text-right" : "text-left"}`}>{sub}</div>}
      </div>
    </div>
  );
}
