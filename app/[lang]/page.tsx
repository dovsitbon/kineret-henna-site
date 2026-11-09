import Image from "next/image";
import site from "@/data/site.json";
import infos from "@/data/infos.json";
import stats from "@/data/stats.json";
import formules from "@/data/formules.json";
import realisations from "@/data/realisations.json";
import avis from "@/data/avis.json";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { TenuesGallery } from "@/components/TenuesGallery";
import { PrefillLink } from "@/components/PrefillLink";
import { Emblem } from "@/components/Logo";
import { ArrowIcon, InstagramIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { altOf, fill, getDict, intlLocale, type Dict, type Locale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/jsonld";
import { img } from "@/lib/media";
import { shekels, telHref, waLink, type Formula } from "@/lib/quote";

const compact = (n: number, lang: Locale) =>
  lang === "he" ? `${Math.round(n / 1000)} אלף` : new Intl.NumberFormat(intlLocale[lang], { notation: "compact", maximumFractionDigits: 1 }).format(n);
const monthYear = (ym: string, lang: Locale) => {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[lang], { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)));
};

function Photo({ src, d, sizes, className = "", imgClass = "", priority = false }: { src: string; d: Dict; sizes: string; className?: string; imgClass?: string; priority?: boolean }) {
  const p = img(src);
  return (
    <div className={`bg-sand ${className}`}>
      <Image src={p.src} width={p.width} height={p.height} alt={altOf(d, p.src)} sizes={sizes} priority={priority} className={`h-full w-full object-cover ${imgClass}`} />
    </div>
  );
}

function SectionHead({ eyebrow, title, text, center = false, id }: { eyebrow: string; title: string; text?: string; center?: boolean; id?: string }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-5 text-[2.5rem] md:text-[3.6rem]">
        {title}
      </h2>
      {text && <p className={`lead mt-6 ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>{text}</p>}
    </Reveal>
  );
}

const SERVICE_IMAGES: Record<string, string> = {
  full: "/media/soirees/soiree-piscine-lustres.jpg",
  decor: "/media/decors/trone-voilages.jpg",
  outfits: "/media/tenues-mariee/velours-emeraude.jpg",
  intimate: "/media/decors/coussins-arches-blanches.jpg",
};

const BLOCK_IMAGES: Record<string, string> = {
  tradition: "/media/galerie/riad-caftan-blanc.jpg",
  design: "/media/decors/table-douceurs-lanternes.jpg",
  meeting: "/media/galerie/showroom-logo.jpg",
};
const BLOCK_LINKS: Record<string, string> = { tradition: "#tenues", design: "#productions", meeting: "#contact" };

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const d = getDict(lang);
  const followers = compact(stats.instagramFollowers, lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)).replace(/</g, "\\u003c") }} />

      {/* ——— Hero : sa photo en arche (la forme de son logo), 2 boutons ——— */}
      <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-28 pb-16 md:grid-cols-[1fr_0.9fr] md:gap-16 md:px-10 md:pt-40 md:pb-24 lg:gap-24">
        <div className="relative mx-auto w-[min(82vw,420px)] md:order-2 md:w-full md:max-w-[480px]">
          <span className="arch-dots" aria-hidden="true" />
          <Photo src="/media/hero/kaftan-arche.jpg" d={d} priority sizes="(min-width: 768px) 40vw, 82vw" className="arch rise aspect-[4/5]" imgClass="object-[50%_30%]" />
        </div>
        <div className="text-center md:text-start">
          <p className="eyebrow rise">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="display rise mt-6 text-[3.1rem] text-henna md:text-[4.6rem] lg:text-[5.6rem]" style={{ animationDelay: "0.1s" }}>
            {d.hero.title}
          </h1>
          <p className="lead rise mx-auto mt-7 max-w-lg md:mx-0" style={{ animationDelay: "0.2s" }}>
            {d.hero.text}
          </p>
          <div className="rise mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start" style={{ animationDelay: "0.3s" }}>
            <a href="#contact" className="btn-solid w-full sm:w-auto">
              {d.hero.cta}
            </a>
            <a href="#evenements" className="btn-line w-full sm:w-auto">
              {d.hero.secondary}
            </a>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="rise mt-8 inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors hover:text-henna" style={{ animationDelay: "0.4s" }}>
            <InstagramIcon className="h-4 w-4" />
            <span>{fill(d.hero.proof, { n: followers })}</span>
          </a>
        </div>
      </section>

      {/* ——— Cartes portrait des prestations (style Begnis) ——— */}
      <section id="productions" aria-labelledby="productions-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="productions-title" eyebrow={d.services.eyebrow} title={d.services.title} center />
          <ul className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.services.items.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.08} className="group">
                <a href="#formules" className="block">
                  <Photo src={SERVICE_IMAGES[s.id]} d={d} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="shine aspect-[3/4]" />
                  <h3 className="display mt-6 text-[1.75rem]">{s.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
                  <span className="nav-link mt-5 inline-flex items-center gap-2 text-henna-deep">
                    {d.services.cta}
                    <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Formules : la seule section sombre (émeraude) ——— */}
      <section id="formules" aria-labelledby="formules-title" className="bg-emerald py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-gold">{d.formulas.eyebrow}</p>
            <h2 id="formules-title" className="display mt-5 text-[2.5rem] md:text-[3.6rem]">
              {d.formulas.title}
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.9] text-ivory/85">{d.formulas.text}</p>
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden border border-ivory/15 bg-ivory/15 md:grid-cols-2 lg:grid-cols-4">
            {formules.items.map((fm, i) => {
              const t = d.formulas.items[i];
              return (
                <Reveal as="li" key={fm.id} delay={i * 0.06} className="flex flex-col bg-emerald p-7 md:p-8">
                  <span className="num text-[0.8125rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-[1.9rem]">{t.name}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/80">{t.text}</p>
                  <p className="mt-6 text-[0.9375rem] text-gold">{fm.priceFrom ? fill(d.formulas.from, { price: shekels(fm.priceFrom, lang) }) : d.formulas.onRequest}</p>
                  <p className="label mt-7 !text-ivory/70">{d.formulas.includesLabel}</p>
                  <ul className="mt-3 flex-1 space-y-2.5 text-[0.9375rem] leading-snug">
                    {fm.includes.map((k) => (
                      <li key={k} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {d.formulas.inclusions[k as keyof Dict["formulas"]["inclusions"]]}
                      </li>
                    ))}
                  </ul>
                  <PrefillLink prefill={{ formula: fm.id as Formula }} className="nav-link mt-8 inline-flex min-h-11 items-center gap-2 text-ivory underline-offset-8 hover:underline">
                    {d.formulas.cta}
                    <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </PrefillLink>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ——— Tenues : galerie filtrable ——— */}
      <section id="tenues" aria-labelledby="tenues-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead id="tenues-title" eyebrow={d.outfits.eyebrow} title={d.outfits.title} text={d.outfits.text} center />
          <div className="mt-12">
            <TenuesGallery />
          </div>
          <div className="mt-14 text-center">
            <PrefillLink prefill={{ formula: "outfits" }} className="btn-line">
              {d.outfits.cta}
            </PrefillLink>
          </div>
        </div>
      </section>

      {/* ——— Trois blocs alternés photo + texte + un bouton ——— */}
      <section aria-label={d.blocks[0].eyebrow} className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] space-y-24 px-5 md:space-y-32 md:px-10">
          {d.blocks.map((b, i) => (
            <article key={b.id} id={b.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <Photo src={BLOCK_IMAGES[b.id]} d={d} sizes="(min-width: 768px) 45vw, 92vw" className={`aspect-[4/5] ${i === 1 ? "arch" : ""}`} />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">{b.eyebrow}</p>
                <h2 className="display mt-5 text-[2.3rem] md:text-[3.1rem]">{b.title}</h2>
                <p className="lead mt-6 max-w-md">{b.text}</p>
                <a href={BLOCK_LINKS[b.id]} className="btn-line mt-9">
                  {b.cta}
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Réalisations : grille de soirées (style Social Pantry) ——— */}
      <section id="evenements" aria-labelledby="events-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead id="events-title" eyebrow={d.events.eyebrow} title={d.events.title} text={d.events.text} />
            <Reveal>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line nav-link inline-flex items-center gap-2 whitespace-nowrap">
                <InstagramIcon className="h-4 w-4" />
                {d.events.more}
              </a>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.items.map((r, i) => (
              <Reveal as="li" key={r.id} delay={(i % 3) * 0.08} className="group">
                <Photo src={r.image} d={d} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw" className="shine aspect-[4/5]" />
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <h3 className="display text-[1.5rem]">{r.couple ?? d.events.venues[r.venue as keyof Dict["events"]["venues"]]}</h3>
                  {r.guests && <span className="num shrink-0 text-[0.875rem] text-muted">{fill(d.events.guests, { n: r.guests })}</span>}
                </div>
                {r.place && <p className="mt-1 text-[0.9375rem] text-muted">{r.place}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— À propos : portrait + histoire + un seul bouton (style Mindy Weiss) ——— */}
      <section id="about" aria-labelledby="about-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:grid-cols-[0.85fr_1fr] md:gap-24 md:px-10">
          <Reveal className="relative mx-auto w-[min(80vw,400px)] md:w-full">
            <span className="arch-dots" aria-hidden="true" />
            <Photo src="/media/galerie/satin-mer.jpg" d={d} sizes="(min-width: 768px) 40vw, 80vw" className="arch aspect-[4/5]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{d.about.eyebrow}</p>
            <h2 id="about-title" className="display mt-5 text-[2.4rem] md:text-[3.3rem]">
              {d.about.title}
            </h2>
            {/* À REMPLIR : son histoire (début, inspiration, équipe) et un vrai portrait d'elle */}
            <p className="lead mt-7">{d.about.p1}</p>
            <p className="lead mt-5">{d.about.p2}</p>
            <p className="display mt-8 text-[1.9rem] text-henna">{d.about.quote}</p>
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-8">
              <div className="flex flex-col-reverse">
                <dt className="text-[0.875rem] text-muted">{d.stats.followers}</dt>
                <dd className="num text-[2rem] text-ink">{followers}</dd>
              </div>
              {stats.events ? (
                <div className="flex flex-col-reverse">
                  <dt className="text-[0.875rem] text-muted">{d.stats.events}</dt>
                  <dd className="num text-[2rem] text-ink">{stats.events}</dd>
                </div>
              ) : (
                <div className="flex flex-col-reverse">
                  <dt className="text-[0.875rem] text-muted">{d.stats.posts}</dt>
                  <dd className="num text-[2rem] text-ink">{stats.instagramPosts}+</dd>
                </div>
              )}
            </dl>
            <a href="#contact" className="btn-solid mt-10">
              {d.about.cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ——— Avis : uniquement de vrais avis (data/avis.json) ——— */}
      <section id="avis" aria-labelledby="reviews-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <Reveal>
            <Emblem className="mx-auto h-12 w-auto text-gold" />
            <p className="eyebrow mt-8">{d.reviews.eyebrow}</p>
            <h2 id="reviews-title" className="display mt-5 text-[2.4rem] md:text-[3.4rem]">
              {d.reviews.title}
            </h2>
          </Reveal>
          {/* À REMPLIR avec de vrais avis clientes (data/avis.json) – n'en inventer aucun */}
          {avis.items.map((r) => (
            <Reveal key={r.id} delay={0.1}>
              <figure className="mt-12">
                <blockquote className="text-[1.25rem] leading-[1.8] md:text-[1.4rem]" lang={lang}>
                  {r.text[lang]}
                </blockquote>
                <figcaption className="mt-6 text-[0.9375rem] text-muted">
                  <span className="text-ink">{lang === "he" ? r.name : r.nameLatin}</span> ·{" "}
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-henna">
                    {fill(d.reviews.source, { source: r.source, date: monthYear(r.date, lang) })}
                  </a>
                  {d.reviews.translated && <span className="block text-[0.8125rem]">{d.reviews.translated}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 md:grid-cols-[1fr_1.6fr] md:gap-20 md:px-10">
          <SectionHead id="faq-title" eyebrow={d.faq.eyebrow} title={d.faq.title} />
          <Reveal>
            <div className="border-t border-line">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.125rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <PlusIcon className="h-4 w-4 shrink-0 text-henna transition-transform duration-500 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Demande de devis ——— */}
      <section id="contact" aria-labelledby="contact-title" className="bg-sand py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-10">
          <Reveal>
            <p className="eyebrow">{d.book.eyebrow}</p>
            <h2 id="contact-title" className="display mt-5 text-[2.4rem] md:text-[3.3rem]">
              {d.book.title}
            </h2>
            <p className="lead mt-6">{d.book.text}</p>
            <ul className="mt-10 space-y-4 text-[1rem]">
              <li>
                <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                  <WhatsAppIcon className="h-5 w-5 text-emerald" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={telHref} className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                  <PhoneIcon className="h-5 w-5 text-emerald" />
                  <span dir="ltr">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-henna">
                  <InstagramIcon className="h-5 w-5 text-emerald" />
                  <span>
                    <span dir="ltr">{site.instagramHandle}</span> · {fill(d.hero.proof, { n: followers })}
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-8 text-[0.9375rem] text-muted">{fill(d.footer.studio, { city: infos.studioCity[lang] })}</p>
          </Reveal>
          <Reveal delay={0.1} className="bg-ivory p-6 md:p-12">
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
