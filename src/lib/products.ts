// Product catalog — images sourced from https://moroccanstar.net/
// Demo data: names re-cast as Moroccan beauty rituals.

export type Category =
  | "oils"
  | "soaps"
  | "butters"
  | "hammam"
  | "bundles"
  | "masks";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  ritual: string;
  category: Category;
  price: number; // JD
  ritualTime: string;
  benefits: string[];
  ingredients: { name: string; note: string }[];
  story: string;
  steps: { title: string; detail: string }[];
  images: string[];
  badge?: string;
};

const img = (id: string, file: string) =>
  `https://cdn-v2.makane.com/cdn-cgi/image/background=%23ffffff,width=1200,height=1600,quality=85,fit=scale-down,format=auto/20220307-store-4kgr/products/${id}/${file}`;

export const products: Product[] = [
  {
    id: "33566292",
    slug: "liquid-gold-argan-ceremony",
    name: "Liquid Gold Argan Ceremony",
    nameAr: "طقس الذهب السائل بالأركان",
    ritual: "Nightly Restoration",
    category: "oils",
    price: 28,
    ritualTime: "8–10 min",
    benefits: ["Anti-aging", "Deep nourishment", "Luminous glow"],
    ingredients: [
      { name: "Cold-pressed Argan", note: "Harvested in Souss valley" },
      { name: "Vitamin E", note: "Sealed in to protect the skin barrier" },
    ],
    story:
      "Pressed from kernels gathered under the Atlas sun, a single drop carries centuries of Berber craft into your evening ritual.",
    steps: [
      { title: "Warm", detail: "Press 3 drops between palms to wake the oil." },
      { title: "Press", detail: "Press onto cleansed face, neck and décolleté." },
      { title: "Breathe", detail: "Inhale deeply — let the warmth settle." },
      { title: "Glow", detail: "Wake with a soft, lit-from-within finish." },
    ],
    images: [
      img("33566292", "Unnamed-Product-rand-2399-4030-16068621.jpeg"),
      img("33566294", "Unnamed-Product-rand-4093-6318-51819645.jpeg"),
    ],
    badge: "Heritage",
  },
  {
    id: "33567587",
    slug: "moroccan-brightening-ritual",
    name: "Moroccan Brightening Ritual",
    nameAr: "طقس الإشراق المغربي",
    ritual: "Morning Awakening",
    category: "oils",
    price: 22,
    ritualTime: "10–12 min",
    benefits: ["Brightening", "Even tone", "Radiance"],
    ingredients: [
      { name: "Prickly Pear Seed Oil", note: "Cold-pressed, high in tocopherols" },
      { name: "Saffron threads", note: "Hand-picked, Taliouine" },
    ],
    story:
      "A ritual that mirrors the first golden hour over the medina — slow, warm, and quietly transformative.",
    steps: [
      { title: "Cleanse", detail: "Begin on freshly cleansed skin." },
      { title: "Apply", detail: "Layer 2 drops across the face in upward strokes." },
      { title: "Massage", detail: "Press, lift, release for 60 seconds." },
      { title: "Reveal", detail: "Skin appears brighter, more even." },
    ],
    images: [
      img("33567587", "Unnamed-Product-rand-1108-7229-41508021.jpeg"),
      img("33567588", "Unnamed-Product-rand-9998-4866-92760871.jpeg"),
    ],
    badge: "Best Seller",
  },
  {
    id: "33567589",
    slug: "hammam-purification-experience",
    name: "Hammam Purification Experience",
    nameAr: "تجربة تطهير الحمام المغربي",
    ritual: "Weekly Purification",
    category: "hammam",
    price: 18,
    ritualTime: "20–25 min",
    benefits: ["Deep cleansing", "Detoxifies", "Velvet softness"],
    ingredients: [
      { name: "Beldi Black Soap", note: "Olive paste, traditionally aged" },
      { name: "Eucalyptus", note: "Steam-infused for clarity" },
    ],
    story:
      "Step into the marble silence of a Marrakech hammam — softened skin, cleared mind, an entire ritual in a single jar.",
    steps: [
      { title: "Steam", detail: "Open pores under warm water for 5 minutes." },
      { title: "Apply", detail: "Layer black soap across damp skin." },
      { title: "Exfoliate", detail: "Sweep with kessa mitt in long strokes." },
      { title: "Rinse", detail: "Reveal renewed, polished skin." },
    ],
    images: [
      img("33567589", "Unnamed-Product-rand-2532-8042-30120731.jpeg"),
      img("33567590", "Unnamed-Product-rand-4866-0434-16654765.jpeg"),
    ],
    badge: "Ritual",
  },
  {
    id: "33567591",
    slug: "skin-renewal-treatment-journey",
    name: "Skin Renewal Treatment Journey",
    nameAr: "رحلة تجديد البشرة",
    ritual: "Resurfacing",
    category: "masks",
    price: 24,
    ritualTime: "15 min",
    benefits: ["Resurfaces", "Refines pores", "Plumping"],
    ingredients: [
      { name: "Rhassoul Clay", note: "Mined from the Atlas mountains" },
      { name: "Rose water", note: "Distilled in the Valley of Roses" },
    ],
    story:
      "Mineral-rich clay drawn from the high Atlas — a single mask reads as a quiet, weekly reset.",
    steps: [
      { title: "Mix", detail: "Whisk clay with rose water to a velvet paste." },
      { title: "Apply", detail: "Layer across face, avoiding eyes and mouth." },
      { title: "Rest", detail: "Settle for 10 minutes as the clay draws." },
      { title: "Rinse", detail: "Lukewarm water. Pat dry. Skin renewed." },
    ],
    images: [
      img("33567591", "Unnamed-Product-rand-0644-1649-73386220.jpeg"),
      img("33567592", "Unnamed-Product-rand-5251-6530-67795036.jpeg"),
    ],
  },
  {
    id: "33567593",
    slug: "atlas-rose-butter-ritual",
    name: "Atlas Rose Butter Ritual",
    nameAr: "طقس زبدة الورد الأطلسي",
    ritual: "Body Sealing",
    category: "butters",
    price: 26,
    ritualTime: "5 min",
    benefits: ["Intense moisture", "Softens", "Repairs"],
    ingredients: [
      { name: "Raw Shea Butter", note: "Whipped, unrefined" },
      { name: "Damask Rose", note: "Petal-distilled" },
    ],
    story:
      "Whipped slowly, scented with petals carried down from the Valley of Roses each spring.",
    steps: [
      { title: "Warm", detail: "Scoop with fingertips, let body heat soften." },
      { title: "Massage", detail: "Sweep into still-damp skin in long strokes." },
      { title: "Wrap", detail: "Wrap in cotton. Let the butter drink in." },
      { title: "Feel", detail: "A second skin of silk that lasts hours." },
    ],
    images: [
      img("33567593", "Unnamed-Product-rand-4094-7518-29434184.jpeg"),
      img("33567594", "Unnamed-Product-rand-1249-5422-13535603.jpeg"),
    ],
  },
  {
    id: "33638616",
    slug: "olive-leaf-purifying-soap",
    name: "Olive Leaf Purifying Soap",
    nameAr: "صابون أوراق الزيتون المنقي",
    ritual: "Daily Cleanse",
    category: "soaps",
    price: 9,
    ritualTime: "3 min",
    benefits: ["Gentle cleanse", "Balances", "Refresh"],
    ingredients: [
      { name: "Olive oil", note: "First cold press" },
      { name: "Mountain herbs", note: "Sun-dried, hand-bound" },
    ],
    story:
      "Cold-process bars cured for six weeks — the kind of soap your grandmother would recognize.",
    steps: [
      { title: "Lather", detail: "Work into a creamy foam between palms." },
      { title: "Sweep", detail: "Massage across face and body in slow circles." },
      { title: "Rinse", detail: "Lukewarm water, no residue, no tightness." },
      { title: "Soften", detail: "Pat dry — skin reads soft and unburdened." },
    ],
    images: [
      img("33638616", "Unnamed-Product-rand-1790-9262-54303797.jpg"),
      img("34508855", "Unnamed-Product-rand-1615-5961-07147050.jpeg"),
    ],
  },
  {
    id: "34509047",
    slug: "wedding-glow-ritual-set",
    name: "Wedding Glow Ritual Set",
    nameAr: "طقم إشراق العروس",
    ritual: "Bridal Preparation",
    category: "bundles",
    price: 79,
    ritualTime: "30 days",
    benefits: ["Brightening", "Glow", "Bridal radiance"],
    ingredients: [
      { name: "Argan + Saffron oil", note: "Nightly glow drops" },
      { name: "Rose clay mask", note: "Weekly resurfacing" },
      { name: "Atlas butter", note: "Body sealing ritual" },
    ],
    story:
      "A 30-day preparation curated for the most photographed week of a lifetime — petals, gold, and a quiet daily ceremony.",
    steps: [
      { title: "Week 1", detail: "Soften — daily oil and gentle cleanse." },
      { title: "Week 2", detail: "Resurface — weekly Rhassoul mask." },
      { title: "Week 3", detail: "Illuminate — saffron + argan layering." },
      { title: "Week 4", detail: "Seal — Atlas butter, head to toe." },
    ],
    images: [
      img("34509047", "Unnamed-Product-rand-7012-7118-90038692.jpeg"),
      img("34509048", "Unnamed-Product-rand-9854-9234-86500940.jpeg"),
    ],
    badge: "Bundle",
  },
  {
    id: "34514943",
    slug: "ramadan-skin-reset-experience",
    name: "Ramadan Skin Reset Experience",
    nameAr: "تجربة تجديد البشرة في رمضان",
    ritual: "Seasonal Reset",
    category: "bundles",
    price: 64,
    ritualTime: "Nightly",
    benefits: ["Hydrating", "Calming", "Restorative"],
    ingredients: [
      { name: "Prickly pear oil", note: "Nightly serum" },
      { name: "Honey + oat mask", note: "Twice weekly" },
      { name: "Beldi soap", note: "Hammam ritual" },
    ],
    story:
      "A holy month deserves a quieter shelf — three pieces designed for the slow nightly ritual after iftar.",
    steps: [
      { title: "Cleanse", detail: "Beldi soap, after iftar." },
      { title: "Mask", detail: "Honey + oat — twice weekly." },
      { title: "Serum", detail: "Prickly pear oil, two drops." },
      { title: "Rest", detail: "Skin recovers as you do." },
    ],
    images: [
      img("34514943", "Unnamed-Product-rand-8196-0787-87146598.jpeg"),
      img("34514950", "Unnamed-Product-rand-6718-4451-71770434.jpeg"),
    ],
    badge: "Seasonal",
  },
  {
    id: "34791996",
    slug: "luxury-hammam-at-home-kit",
    name: "Luxury Hammam At-Home Kit",
    nameAr: "طقم الحمام المغربي الفاخر في المنزل",
    ritual: "Weekly Spa",
    category: "bundles",
    price: 89,
    ritualTime: "45 min",
    benefits: ["Detoxifying", "Polishing", "Sensorial"],
    ingredients: [
      { name: "Black soap", note: "Beldi tradition" },
      { name: "Kessa mitt", note: "Hand-woven" },
      { name: "Rhassoul clay", note: "Weekly mask" },
      { name: "Argan oil", note: "Sealing finish" },
    ],
    story:
      "The full hammam ritual, plated for the home: steam, soap, mitt, clay, and a final pour of liquid gold.",
    steps: [
      { title: "Steam", detail: "Run a hot shower, close the door, breathe." },
      { title: "Soap", detail: "Beldi black soap, full body, 5 minutes." },
      { title: "Polish", detail: "Kessa mitt, long sweeping strokes." },
      { title: "Seal", detail: "Argan oil into still-damp skin." },
    ],
    images: [
      img("34791996", "Unnamed-Product-rand-5095-8763-93724550.jpeg"),
      img("34792503", "Unnamed-Product-rand-0945-3451-60882226.jpeg"),
    ],
    badge: "Signature",
  },
  {
    id: "34792504",
    slug: "natural-beauty-awakening-bundle",
    name: "Natural Beauty Awakening Bundle",
    nameAr: "بكج الجمال الطبيعي",
    ritual: "Daily Awakening",
    category: "bundles",
    price: 54,
    ritualTime: "Daily",
    benefits: ["Brightening", "Hydration", "Glow"],
    ingredients: [
      { name: "Argan oil", note: "Morning + night" },
      { name: "Rose water tonic", note: "Mist + tone" },
      { name: "Shea balm", note: "Lip + cuticle" },
    ],
    story:
      "A daily three-piece capsule — the simplest, most loyal ritual we make.",
    steps: [
      { title: "Mist", detail: "Rose water across cleansed skin." },
      { title: "Press", detail: "Two drops of argan oil." },
      { title: "Seal", detail: "Shea balm where skin reads dry." },
      { title: "Repeat", detail: "Morning and night." },
    ],
    images: [
      img("34792504", "Unnamed-Product-rand-1446-2480-21495559.jpeg"),
      img("34792505", "Unnamed-Product-rand-8377-6374-69361247.jpeg"),
    ],
  },
  {
    id: "33567592b",
    slug: "deep-skin-repair-system",
    name: "Deep Skin Repair System",
    nameAr: "نظام إصلاح البشرة العميق",
    ritual: "Recovery Protocol",
    category: "bundles",
    price: 72,
    ritualTime: "Nightly · 28 days",
    benefits: ["Repairs", "Firms", "Smooths"],
    ingredients: [
      { name: "Cactus seed oil", note: "Active nightly serum" },
      { name: "Black seed", note: "Calming, restorative" },
      { name: "Argan-shea balm", note: "Overnight seal" },
    ],
    story:
      "Engineered for skin asking for quiet repair — a 28-day protocol with three steady actives.",
    steps: [
      { title: "Prep", detail: "Cleanse and tone." },
      { title: "Active", detail: "Cactus seed oil, 3 drops." },
      { title: "Calm", detail: "Black seed elixir, press in." },
      { title: "Seal", detail: "Argan-shea balm overnight." },
    ],
    images: [
      img("33567592", "Unnamed-Product-rand-5251-6530-67795036.jpeg"),
      img("33567591", "Unnamed-Product-rand-0644-1649-73386220.jpeg"),
    ],
    badge: "Pro",
  },
  {
    id: "34508855b",
    slug: "rose-clay-velvet-mask",
    name: "Rose Clay Velvet Mask",
    nameAr: "ماسك الطين الوردي المخملي",
    ritual: "Weekly Mask",
    category: "masks",
    price: 19,
    ritualTime: "12 min",
    benefits: ["Soft", "Calm", "Glow"],
    ingredients: [
      { name: "Pink clay", note: "Gentle for sensitive skin" },
      { name: "Damask rose", note: "Petal infusion" },
    ],
    story:
      "A softer cousin to the Rhassoul ritual — pink clay, rose petals, a glass of mint tea.",
    steps: [
      { title: "Mix", detail: "Clay + rose water until velvet." },
      { title: "Apply", detail: "Brush across clean skin." },
      { title: "Rest", detail: "10 minutes. Music. Tea." },
      { title: "Rinse", detail: "Pat dry. Glow." },
    ],
    images: [
      img("34508855", "Unnamed-Product-rand-1615-5961-07147050.jpeg"),
      img("33567593", "Unnamed-Product-rand-4094-7518-29434184.jpeg"),
    ],
  },
];

export const categories: { key: Category; label: string; labelAr: string; tag: string }[] = [
  { key: "oils", label: "Oils", labelAr: "الزيوت", tag: "Liquid Gold" },
  { key: "soaps", label: "Soaps", labelAr: "الصابون", tag: "Daily Cleanse" },
  { key: "butters", label: "Butters", labelAr: "الزبدة", tag: "Body Ritual" },
  { key: "hammam", label: "Hammam", labelAr: "الحمام المغربي", tag: "Purification" },
  { key: "bundles", label: "Bundles", labelAr: "البكجات", tag: "Ritual Sets" },
  { key: "masks", label: "Masks", labelAr: "الماسكات", tag: "Resurfacing" },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
