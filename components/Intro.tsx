"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ARCH_DOTS_PATH, ARCH_PATH } from "@/components/Logo";

const KEY = "kineret-intro";
const TOTAL = 1.5;

// Motif de henné autour du nom : deux branches feuillues et quelques points, tracés au trait
const HENNA = [
  "M10 70c10-2 18-8 22-18m-22 18c8 4 18 4 26-2m-18-6c-4-6-4-12 0-16m6 22c-2-8 2-14 8-16",
  "M190 70c-10-2-18-8-22-18m22 18c-8 4-18 4-26-2m18-6c4-6 4-12 0-16m-6 22c2-8-2-14-8-16",
] as const;
const DOTS = [
  [52, 92], [62, 98], [74, 102], [88, 104], [100, 105], [112, 104], [126, 102], [138, 98], [148, 92],
] as const;

const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  document.documentElement.classList.add("intro-seen");
};

/**
 * Ouverture (1,5 s, une fois par session, aucun son) : fond ivoire → une arche marocaine se dessine au trait doré →
 * « כנרת » apparaît dans l'arche, puis « KINERET » → un fin motif de henné se dessine autour → fondu sur le hero.
 * Masquée d'office si l'utilisateur réduit les animations (script dans le layout + globals.css).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      markSeen();
      setGone(true);
    }, TOTAL * 1000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="intro-curtain flex items-center justify-center text-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.18, duration: 0.32, ease: "easeOut" }}
    >
      <div className="relative w-[min(78vw,340px)]">
        <svg viewBox="0 0 100 132" className="mx-auto block w-[46%]" aria-hidden="true" fill="none" stroke="var(--color-gold)" strokeLinejoin="round">
          <motion.path d={ARCH_PATH} strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, ease: "easeInOut" }} />
          <motion.path
            d={ARCH_DOTS_PATH}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="0 5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          />
        </svg>

        <div className="absolute inset-x-0 top-[34%] flex flex-col items-center">
          <motion.p
            lang="he"
            dir="rtl"
            translate="no"
            className="font-[family-name:var(--font-frank)] text-[2.6rem] leading-none text-henna md:text-[3rem]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
          >
            כנרת
          </motion.p>
          <motion.p
            dir="ltr"
            translate="no"
            className="mt-3 ps-[0.4em] font-[family-name:var(--font-cormorant)] text-[0.95rem] tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            KINERET
          </motion.p>
        </div>

        <svg viewBox="0 0 200 120" className="absolute inset-x-0 top-[30%] w-full" aria-hidden="true" fill="none" stroke="var(--color-henna)" strokeWidth="0.9" strokeLinecap="round">
          {HENNA.map((p, i) => (
            <motion.path key={p} d={p} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ delay: 0.72 + i * 0.05, duration: 0.42, ease: "easeOut" }} />
          ))}
          {DOTS.map(([x, y], i) => (
            <motion.circle key={x} cx={x} cy={y} r="1" fill="var(--color-henna)" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} transition={{ delay: 0.8 + i * 0.025, duration: 0.15 }} />
          ))}
        </svg>
      </div>

      <button
        type="button"
        onClick={() => {
          markSeen();
          setGone(true);
        }}
        className="nav-link absolute end-4 bottom-4 z-10 min-h-11 px-4 text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </motion.div>
  );
}
