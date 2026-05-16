import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--gold)]/30 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-20 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2 max-w-md">
          <div className="font-serif text-3xl">Moroccan Star</div>
          <div className="font-arabic text-[color:var(--gold)] tracking-widest mt-1">النجمة المغربية للمنتجات الطبيعية</div>
          <p className="mt-6 text-sm leading-relaxed text-[color:var(--sand)]/75">
            From Moroccan heritage to modern luxury beauty rituals.
            Curated in the Atlas, imported through Faten Hammad Establishment, distributed by Concord Trading Co. — for Jordan, with quiet ceremony.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="https://instagram.com/dadoo.shop" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center hover:bg-[color:var(--gold)]/15 transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/moroccanstargroup" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center hover:bg-[color:var(--gold)]/15 transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://moroccanstar.net" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center hover:bg-[color:var(--gold)]/15 transition">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-5">Explore</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/rituals" className="hover:text-[color:var(--gold)]">All Rituals</Link></li>
            <li><Link to="/bundles" className="hover:text-[color:var(--gold)]">Bundles</Link></li>
            <li><Link to="/story" className="hover:text-[color:var(--gold)]">Our Heritage</Link></li>
            <li><Link to="/analytics" className="hover:text-[color:var(--gold)]">Brand Insights</Link></li>
            <li><Link to="/policies" className="hover:text-[color:var(--gold)]">Policies</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--gold)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-5">Reach Us</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Amman, Jordan</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0795152169</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0792681894</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> arganconcordtrading@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-[color:var(--sand)]/60">
          <div>© {new Date().getFullYear()} Moroccan Star — Concord Trading Company. Demo experience.</div>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-[color:var(--gold)]">Terms</Link>
            <Link to="/policies" className="hover:text-[color:var(--gold)]">Privacy</Link>
            <Link to="/policies" className="hover:text-[color:var(--gold)]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
