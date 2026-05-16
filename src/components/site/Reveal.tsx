import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[color:var(--gold)]" />
      <span className="text-[color:var(--gold)] text-xs tracking-[0.4em] uppercase">منذ ١٩٩٧</span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[color:var(--gold)]" />
    </div>
  );
}

export function Particles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 1.7) % 14;
        const dur = 12 + ((i * 3) % 10);
        const size = 3 + ((i * 7) % 6);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              bottom: `-20px`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}
