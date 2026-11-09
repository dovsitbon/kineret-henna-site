// Logo de Kineret redessiné en SVG d'après sa photo de profil : arche marocaine ivoire bordée de points,
// « K » au trait (un fût et deux diagonales fines), sur fond terracotta. Facile à remplacer : tout est ici.

/** Arche (porte marocaine à épaulements) dans un cadre 100 × 132. */
export const ARCH_PATH = "M16 128V60c0-5 3-8 7-9 0-21 12-38 27-47 15 9 27 26 27 47 4 1 7 4 7 9v68Z";
/** Contour pointillé autour de l'arche. */
export const ARCH_DOTS_PATH = "M8 128V60c0-8 4-13 9-15 2-22 15-40 33-50 18 10 31 28 33 50 5 2 9 7 9 15v68";
/** Le « K » : fût vertical, diagonale haute légèrement courbe, diagonale basse droite. */
export const K_PATHS = ["M41 34v86", "M41 82C49 64 58 47 66 32", "M41 78l27 42"];

/** Emblème au trait (couleur courante), pour l'en-tête et le pied de page. */
export function Emblem({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 132" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeLinejoin="round">
      <path d={ARCH_PATH} strokeWidth="2.4" />
      <path d={ARCH_DOTS_PATH} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0 6.2" />
      {K_PATHS.map((p) => (
        <path key={p} d={p} strokeWidth="2.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Emblème plein aux couleurs du logo (terracotta / ivoire). */
export function EmblemColor({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 132" className={className} aria-hidden="true">
      <path d={ARCH_PATH} fill="#f3ede6" stroke="#a9533a" strokeWidth="1.2" />
      <path d={ARCH_DOTS_PATH} fill="none" stroke="#c9a14e" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0 6.2" />
      {K_PATHS.map((p) => (
        <path key={p} d={p} fill="none" stroke="#a9533a" strokeWidth="2.6" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** En-tête : emblème + « KINERET » en capitales fines + « כנרת ». */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`} translate="no">
      <Emblem className="h-10 w-auto text-henna md:h-11" />
      <span className="flex flex-col items-start leading-none" dir="ltr">
        <span className="font-[family-name:var(--font-cormorant)] text-[1.35rem] tracking-[0.32em] md:text-[1.55rem]">KINERET</span>
        <span className="mt-1 font-[family-name:var(--font-frank)] text-[0.875rem] tracking-[0.08em] text-henna-deep" dir="rtl" lang="he">
          כנרת אירועי חינה
        </span>
      </span>
    </span>
  );
}

/** Pied de page : logo complet centré. */
export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col items-center text-center ${className}`} translate="no">
      <Emblem className="h-20 w-auto text-gold" />
      <span className="mt-5 font-[family-name:var(--font-cormorant)] text-[2rem] tracking-[0.34em] ps-[0.34em]" dir="ltr">
        KINERET
      </span>
      <span className="mt-2 font-[family-name:var(--font-frank)] text-[1.05rem]" lang="he" dir="rtl">
        כנרת אירועי חינה
      </span>
      <span className="mt-3 font-[family-name:var(--font-jost)] text-[0.625rem] tracking-[0.42em] ps-[0.42em] opacity-80" dir="ltr">
        CREATING MOROCCAN MOMENTS
      </span>
    </span>
  );
}
