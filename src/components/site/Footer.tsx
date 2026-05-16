import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Footer() {
  const { t, isRtl } = useLanguage();
  const { isDark } = useTheme();

  return (
    <footer className="relative mt-32 border-t border-[color:var(--gold)]/30 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-20 grid lg:grid-cols-4 gap-12" dir={isRtl ? "rtl" : "ltr"}>
        <div className="lg:col-span-2 max-w-md">
          <div className="flex items-center gap-3">
            <img
              src={isDark ? "/darkmode.png" : "/logo.png"}
              alt="Moroccan Star Logo"
              className="h-12 w-12 object-contain rounded-full bg-white dark:bg-neutral-900 border border-[color:var(--gold)]/30 p-0.5"
            />
            <div>
              <div className="font-serif text-3xl leading-none">Moroccan Star</div>
              <div className="font-arabic text-[color:var(--gold)] text-[11px] tracking-wider mt-1">النجمة المغربية للمنتجات الطبيعية</div>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[color:var(--sand)]/75">
            {t("footer.brandDesc")}
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
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-5">{t("footer.explore")}</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/rituals" className="hover:text-[color:var(--gold)]">{t("nav.rituals")}</Link></li>
            <li><Link to="/bundles" className="hover:text-[color:var(--gold)]">{t("nav.bundles")}</Link></li>
            <li><Link to="/story" className="hover:text-[color:var(--gold)]">{t("nav.heritage")}</Link></li>
            <li><Link to="/analytics" className="hover:text-[color:var(--gold)]">{t("nav.insights")}</Link></li>
            <li><Link to="/policies" className="hover:text-[color:var(--gold)]">{t("footer.cookies")}</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--gold)]">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)] mb-5">{t("footer.reachUs")}</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> 
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0795152169</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0792681894</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> arganconcordtrading@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-[color:var(--gold)]/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-[color:var(--sand)]/60" dir={isRtl ? "rtl" : "ltr"}>
          <div>© {new Date().getFullYear()} {t("footer.rights")}</div>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-[color:var(--gold)]">{t("footer.terms")}</Link>
            <Link to="/policies" className="hover:text-[color:var(--gold)]">{t("footer.privacy")}</Link>
            <Link to="/policies" className="hover:text-[color:var(--gold)]">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
