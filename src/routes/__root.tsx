import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--sand)] px-4">
      <div className="max-w-md text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">404 · Lost in the medina</div>
        <h1 className="font-serif text-6xl mt-3">Page not found</h1>
        <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
          The ritual you're looking for doesn't exist or has been retired.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center px-7 py-3 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-[0.3em] uppercase">Return Home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">Something interrupted the ritual</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Try again, or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-5 py-2 bg-[color:var(--herbal-deep)] text-[color:var(--sand)] text-xs tracking-widest uppercase">Try again</button>
          <a href="/" className="px-5 py-2 border border-[color:var(--gold)]/40 text-xs tracking-widest uppercase">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Moroccan Star — Luxury Moroccan Beauty Rituals in Jordan" },
      { name: "description", content: "From Moroccan heritage to modern luxury beauty rituals. Argan, Rhassoul, Beldi soap — sourced in Morocco, curated in Amman." },
      { name: "author", content: "Moroccan Star · Concord Trading Co." },
      { property: "og:title", content: "Moroccan Star — Luxury Moroccan Beauty Rituals in Jordan" },
      { property: "og:description", content: "From Moroccan heritage to modern luxury beauty rituals. Argan, Rhassoul, Beldi soap — sourced in Morocco, curated in Amman." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Moroccan Star — Luxury Moroccan Beauty Rituals in Jordan" },
      { name: "twitter:description", content: "From Moroccan heritage to modern luxury beauty rituals. Argan, Rhassoul, Beldi soap — sourced in Morocco, curated in Amman." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/78f047c5-2714-4fc0-a863-8fa8ee25fd0f" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/78f047c5-2714-4fc0-a863-8fa8ee25fd0f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/logo.png" }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <Nav />
          <main className="min-h-screen pt-16 lg:pt-20">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
