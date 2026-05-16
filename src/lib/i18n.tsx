import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, defaultValue?: string) => string;
  isRtl: boolean;
}

const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: {
      home: "Home",
      rituals: "Rituals",
      bundles: "Bundles",
      heritage: "Heritage",
      insights: "Insights",
      contact: "Contact",
      menu: "Menu",
      cart: "Cart"
    },
    footer: {
      brandDesc: "From Moroccan heritage to modern luxury beauty rituals. Curated in the Atlas, imported through Faten Hammad Establishment, distributed by Concord Trading Co. — for Jordan, with quiet ceremony.",
      explore: "Explore",
      reachUs: "Reach Us",
      address: "Amman, Jordan",
      rights: "Moroccan Star — Concord Trading Company. Demo experience.",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies"
    },
    home: {
      fromAtlas: "From the Atlas Mountains",
      heroTitle: "A quiet ritual,\npoured slowly.",
      heroSubtitle: "Moroccan Star carries the slow art of the hammam — argan, rhassoul, beldi soap — from the Souss valley to a quiet shelf in Amman.",
      heroArabicText: "من تراث المغرب إلى طقوس جمالك اليومية.",
      exploreBtn: "Explore Rituals",
      heritageBtn: "Our Heritage",
      scroll: "Scroll",
      apothecary: "The Apothecary",
      sixRituals: "Six rituals, one heritage.",
      browseShelf: "Browse the shelf →",
      signatureRituals: "Signature Rituals",
      signatureDesc: "Four ceremonies, each a complete transformation — chosen by our atelier as the heart of the house.",
      fromMorocco: "From Morocco to your skin",
      berberCraft: "A century of Berber craft, carried by hand to Amman.",
      berberDesc: "Each piece in the Moroccan Star apothecary begins in a single valley — argan kernels cracked in Souss, clay drawn from the Atlas, roses distilled in Kelaat M'Gouna. We work with three family-owned cooperatives, importing through Faten Hammad Establishment and distributing across Jordan under Concord Trading Company.",
      natural: "Natural",
      cooperatives: "Cooperatives",
      years: "Years",
      readHeritage: "Read the heritage",
      fourMovements: "The Four Movements",
      notRoutine: "A ritual, not a routine.",
      curatedBundles: "Curated bundles",
      ceremoniesComplete: "Ceremonies, complete.",
      allBundles: "All bundles →",
      discover: "Discover",
      quietlyDevoted: "Quietly devoted.",
      atelierLetter: "The Atelier Letter",
      slowNews: "Slow news, never noise.",
      letterDesc: "One quiet letter a month — new ceremonies, seasonal rituals, and the occasional unscheduled gift.",
      subscribe: "Subscribe",
      placeholderEmail: "your@email"
    },
    cart: {
      title: "Your Basket",
      empty: "Your basket is empty",
      emptyDesc: "Begin selecting your rituals to start the ceremony.",
      subtotal: "Subtotal",
      checkout: "Proceed to Checkout",
      checkoutDemo: "Checkout is a demo experience. Thank you!",
      itemAdded: "Ritual added to basket",
      itemRemoved: "Ritual removed",
      jd: "JD"
    },
    rituals: {
      title: "The Apothecary Shelf",
      desc: "Moroccan hammam ceremonies and botanical elixirs, sourced ethically and carried by hand.",
      all: "All",
      filterBy: "Filter by Category",
      noProducts: "No rituals found in this apothecary category.",
      exploreRitual: "Explore Ritual",
      minutes: "min",
      days: "days",
      benefits: "Benefits",
      ingredients: "Ingredients",
      theRitualStory: "The Ritual Story",
      theSteps: "The Steps",
      addToBasket: "Add to Basket",
      time: "Time"
    },
    story: {
      title: "Our Heritage",
      subtitle: "Two decades of carrying the slow art of the Atlas hammam to Amman.",
      coopsTitle: "The Cooperatives",
      coopsDesc: "We work directly with three family-run cooperatives in the Souss-Massa region, ensuring fair wages and preserving ancestral extraction techniques.",
      fatenHammad: "Imported via Faten Hammad Establishment.",
      concord: "Distributed exclusively by Concord Trading Co."
    },
    contact: {
      title: "Speak with the Atelier",
      desc: "Whether seeking a bespoke ritual consultation or placing a special order, our doors are open.",
      visitUs: "Visit the House",
      callUs: "Voice",
      hours: "Hours",
      formName: "Your Name",
      formEmail: "Email Address",
      formMessage: "Message",
      send: "Send message",
      successMsg: "Thank you. Your message has been sent to the atelier."
    },
    insights: {
      title: "Brand Insights",
      desc: "Analytics, sourcing metrics, and the slow journey of our inventory from Morocco to Jordan."
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      rituals: "الطقوس",
      bundles: "البكجات",
      heritage: "تراثنا",
      insights: "الرؤى",
      contact: "اتصل بنا",
      menu: "القائمة",
      cart: "السلة"
    },
    footer: {
      brandDesc: "من التراث المغربي الأصيل إلى طقوس الجمال الفاخرة. مستخلص من جبال الأطلس، مستورد عبر مؤسسة فاتن حماد، وموزع بواسطة شركة الوفاق للتجارة — للأردن، بكل حب وعناية.",
      explore: "استكشف",
      reachUs: "تواصل معنا",
      address: "عمان، الأردن",
      rights: "النجمة المغربية — شركة الوفاق للتجارة. تجربة عرض.",
      terms: "الشروط",
      privacy: "الخصوصية",
      cookies: "الملفات"
    },
    home: {
      fromAtlas: "من جبال الأطلس",
      heroTitle: "طقوس هادئة،\nتُسكب ببطء.",
      heroSubtitle: "تحمل النجمة المغربية الفن الهادئ للحمام المغربي — الأركان، الغاسول، والصابون البلدي — من وادي سوس إلى رفّ هادئ في عمان.",
      heroArabicText: "من تراث المغرب إلى طقوس جمالك اليومية.",
      exploreBtn: "استكشف الطقوس",
      heritageBtn: "تراثنا الأصيل",
      scroll: "مرر للأسفل",
      apothecary: "الصيدلية الطبيعية",
      sixRituals: "ستة طقوس، تراث واحد.",
      browseShelf: "تصفح الرفوف ←",
      signatureRituals: "الطقوس المميزة",
      signatureDesc: "أربعة مستحضرات مميزة، كل منها يمثل تحولاً كاملاً لجمالك — اختارها خبراؤنا لتكون قلب الدار.",
      fromMorocco: "من المغرب إلى بشرتك",
      berberCraft: "قرن من الحرف البربرية التقليدية، نأتي بها يدوياً إلى عمان.",
      berberDesc: "كل قطعة في صيدلية النجمة المغربية تبدأ من وادٍ واحد — ثمار الأركان المعصورة في سوس، الطين المستخرج من جبال الأطلس، والورد المقطر في قلعة مكونة. نحن نعمل مع ثلاث تعاونيات عائلية، نستورد عبر مؤسسة فاتن حماد ونوزع في الأردن تحت مظلة شركة الوفاق للتجارة.",
      natural: "طبيعي",
      cooperatives: "تعاونيات",
      years: "عاماً",
      readHeritage: "اقرأ عن تراثنا",
      fourMovements: "الحركات الأربع للطقس",
      notRoutine: "طقس متكامل، وليس مجرد روتين.",
      curatedBundles: "بكجات منسقة",
      ceremoniesComplete: "مجموعات متكاملة.",
      allBundles: "كل البكجات ←",
      discover: "اكتشف",
      quietlyDevoted: "مخلصون لجمالك بهدوء.",
      atelierLetter: "رسائل الأتيليه",
      slowNews: "أخبار هادئة، بدون ضجيج.",
      letterDesc: "رسالة واحدة هادئة شهرياً — طقوس جديدة، نصائح موسمية، وهدايا غير متوقعة من وقت لآخر.",
      subscribe: "اشترك الآن",
      placeholderEmail: "بريدك الإلكتروني"
    },
    cart: {
      title: "سلة طقوسك",
      empty: "سلتك فارغة تماماً",
      emptyDesc: "ابدأ باختيار طقوسك اليومية لبدء تجربة الجمال.",
      subtotal: "المجموع الفرعي",
      checkout: "المتابعة لإتمام الطلب",
      checkoutDemo: "إتمام الطلب هو تجربة عرض فقط. شكراً لك!",
      itemAdded: "تم إضافة الطقس إلى السلة",
      itemRemoved: "تم إزالة الطقس",
      jd: "دينار"
    },
    rituals: {
      title: "رف الصيدلية المغربية",
      desc: "طقوس الحمام المغربي والزيوت النباتية النقية، مستخلصة بمسؤولية ومحملة بعناية فائقة.",
      all: "الكل",
      filterBy: "تصفية حسب التصنيف",
      noProducts: "لا توجد طقوس تحت هذا التصنيف حالياً.",
      exploreRitual: "استكشف الطقس",
      minutes: "دقيقة",
      days: "يوم",
      benefits: "الفوائد",
      ingredients: "المكونات الطبيعية",
      theRitualStory: "قصة الطقس الأصيلة",
      theSteps: "حركات الطقس وتطبيقه",
      addToBasket: "إضافة للسلة",
      time: "الوقت"
    },
    story: {
      title: "تراثنا البربري الأصيل",
      subtitle: "عقدان من حمل الفن الهادئ لحمام الأطلس الطبيعي إلى قلب عمان.",
      coopsTitle: "التعاونيات الشريكة",
      coopsDesc: "نحن نعمل مباشرة مع ثلاث تعاونيات عائلية بربرية في منطقة سوس ماسة، مما يضمن أجوراً عادلة ويحفظ مهارات الاستخلاص التقليدية المتوارثة.",
      fatenHammad: "مستورد عبر مؤسسة فاتن حماد للاستيراد والتصدير.",
      concord: "الموزع الحصري: شركة الوفاق للتجارة."
    },
    contact: {
      title: "تحدث مع الأتيليه الخاص بنا",
      desc: "سواء كنت تبحث عن استشارة مخصصة للعناية ببشرتك أو ترغب في تقديم طلب خاص، أبوابنا مفتوحة لك.",
      visitUs: "تفضل بزيارة الدار",
      callUs: "الهاتف",
      hours: "أوقات العمل",
      formName: "اسمك الكريم",
      formEmail: "بريدك الإلكتروني",
      formMessage: "رسالتك",
      send: "إرسال الرسالة",
      successMsg: "شكراً لك. تم إرسال رسالتك إلى الأتيليه بنجاح."
    },
    insights: {
      title: "الرؤى والتحليلات",
      desc: "بيانات تفصيلية، مؤشرات المصادر، والرحلة الهادئة لمخزوننا من جبال الأطلس بالمغرب إلى الأردن."
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage if available (on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("moroccan-star-lang") as Language;
      if (savedLang === "ar" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    }
  }, []);

  // Update HTML elements when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAr = language === "ar";
      document.documentElement.dir = isAr ? "rtl" : "ltr";
      document.documentElement.lang = language;
      
      // Update body styles if needed or let Tailwind handle the RTL transition
      if (isAr) {
        document.body.classList.add("rtl");
      } else {
        document.body.classList.remove("rtl");
      }
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("moroccan-star-lang", lang);
    }
  };

  const t = (path: string, defaultValue?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        return defaultValue || path;
      }
      current = current[key];
    }

    return typeof current === "string" ? current : defaultValue || path;
  };

  const isRtl = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
