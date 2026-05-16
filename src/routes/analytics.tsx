import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from "recharts";
import { Activity, Eye, MousePointerClick, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const traffic = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  visits: 1200 + Math.round(Math.sin(i / 2) * 400 + i * 60 + Math.random() * 200),
  orders: 30 + Math.round(Math.cos(i / 3) * 12 + i * 2 + Math.random() * 8),
}));
const funnel = [
  { name: "View", v: 18420 },
  { name: "Add to Cart", v: 6210 },
  { name: "Checkout", v: 2840 },
  { name: "Purchase", v: 1320 },
];
const channels = [
  { name: "Instagram", v: 42 },
  { name: "Direct", v: 23 },
  { name: "Google", v: 18 },
  { name: "Facebook", v: 11 },
  { name: "Email", v: 6 },
];
const COLORS = ["var(--herbal-deep)", "var(--gold)", "var(--clay)", "var(--herbal)", "var(--ink)"];

const pixelEvents = [
  { ev: "PageView", count: 18420, status: "ok" },
  { ev: "ViewContent", count: 11240, status: "ok" },
  { ev: "AddToCart", count: 6210, status: "ok" },
  { ev: "InitiateCheckout", count: 2840, status: "ok" },
  { ev: "Purchase", count: 1320, status: "ok" },
];

function Analytics() {
  return (
    <>
      <section className="py-16 lg:py-24 border-b border-[color:var(--gold)]/20 bg-[color:var(--sand-deep)]/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)] mb-3">Brand Insights · Demo Dashboard</div>
            <h1 className="font-serif text-5xl lg:text-6xl">Atelier Analytics</h1>
            <p className="text-[color:var(--muted-foreground)] mt-3 max-w-xl">A visual-only snapshot — Meta Pixel, Google Analytics 4, and Mixpanel signals composed into one quiet panel.</p>
          </Reveal>
          <div className="flex gap-2">
            {["7D", "14D", "30D", "QTD"].map((r, i) => (
              <button key={r} className={`px-4 py-2 text-[10px] tracking-[0.3em] uppercase border ${i === 1 ? "bg-[color:var(--herbal-deep)] text-[color:var(--sand)] border-[color:var(--herbal-deep)]" : "border-[color:var(--ink)]/15"}`}>{r}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { Icon: Eye, k: "Sessions", v: "18,420", d: "+12.4%" },
            { Icon: MousePointerClick, k: "Add to Cart", v: "6,210", d: "+8.1%" },
            { Icon: ShoppingBag, k: "Orders", v: "1,320", d: "+4.7%" },
            { Icon: TrendingUp, k: "Revenue", v: "32,840 JD", d: "+18.2%" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="glass p-6 rounded-sm">
                <div className="flex items-center justify-between">
                  <s.Icon className="h-4 w-4 text-[color:var(--gold)]" />
                  <span className="text-[10px] text-[color:var(--herbal-deep)]">{s.d}</span>
                </div>
                <div className="font-serif text-3xl mt-4">{s.v}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase mt-1 text-[color:var(--muted-foreground)]">{s.k}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-3 gap-4">
          <Reveal className="lg:col-span-2">
            <div className="glass p-6 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">GA4 · Traffic</div>
                  <div className="font-serif text-2xl mt-1">Sessions & Orders</div>
                </div>
                <Activity className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="h-72">
                <ResponsiveContainer>
                  <AreaChart data={traffic} margin={{ left: 0, right: 0, top: 10 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--herbal-deep)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--herbal-deep)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--gold)" opacity={0.15} />
                    <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip contentStyle={{ background: "var(--sand)", border: "1px solid var(--gold)" }} />
                    <Area type="monotone" dataKey="visits" stroke="var(--herbal-deep)" fill="url(#g1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="orders" stroke="var(--gold)" fill="url(#g2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass p-6 rounded-sm h-full">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Mixpanel · Channels</div>
              <div className="font-serif text-2xl mt-1 mb-2">Attribution</div>
              <div className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={channels} dataKey="v" innerRadius={50} outerRadius={85} paddingAngle={2}>
                      {channels.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--sand)", border: "1px solid var(--gold)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs">
                {channels.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="h-2 w-2" style={{ background: COLORS[i] }} />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-[color:var(--muted-foreground)]">{c.v}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-3 gap-4">
          <Reveal>
            <div className="glass p-6 rounded-sm">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Mixpanel · Funnel</div>
              <div className="font-serif text-2xl mt-1 mb-4">Conversion</div>
              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={funnel} layout="vertical" margin={{ left: 30 }}>
                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={10} width={90} />
                    <Tooltip contentStyle={{ background: "var(--sand)", border: "1px solid var(--gold)" }} />
                    <Bar dataKey="v" fill="var(--herbal-deep)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="glass p-6 rounded-sm">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Meta Pixel · Live Events</div>
              <div className="font-serif text-2xl mt-1 mb-4">Pixel Stream</div>
              <ul className="space-y-3 text-sm">
                {pixelEvents.map((e) => (
                  <li key={e.ev} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--herbal-deep)] animate-pulse" />
                    <span className="flex-1 font-mono text-xs">{e.ev}</span>
                    <span className="text-[color:var(--muted-foreground)]">{e.count.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass p-6 rounded-sm">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">User Journey</div>
              <div className="font-serif text-2xl mt-1 mb-4">Heatmap</div>
              <div className="grid grid-cols-10 gap-0.5">
                {Array.from({ length: 80 }).map((_, i) => {
                  const v = Math.random();
                  return <div key={i} className="aspect-square rounded-sm" style={{ background: `color-mix(in oklch, var(--herbal-deep) ${Math.round(v * 90)}%, var(--sand-deep))` }} />;
                })}
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-[color:var(--muted-foreground)]">
                <span>Low</span><span>Engagement</span><span>High</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-8 pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="glass p-6 rounded-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">GA4 · Top Rituals (Revenue)</div>
                  <div className="font-serif text-2xl mt-1">Best-selling Ceremonies</div>
                </div>
                <Users className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="h-64 mt-4">
                <ResponsiveContainer>
                  <LineChart data={traffic}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--gold)" opacity={0.15} />
                    <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={10} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip contentStyle={{ background: "var(--sand)", border: "1px solid var(--gold)" }} />
                    <Line type="monotone" dataKey="orders" stroke="var(--herbal-deep)" strokeWidth={2} dot={{ fill: "var(--gold)", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-[10px] text-center mt-6 text-[color:var(--muted-foreground)] italic">All figures simulated for demo purposes.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
