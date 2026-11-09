import site from "@/data/site.json";
import infos from "@/data/infos.json";
import avis from "@/data/avis.json";
import { getDict, type Locale } from "@/lib/i18n";

/** Données structurées : EventPlanner (LocalBusiness), une Service par prestation, avis réel, FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  const he = lang === "he";
  const areaServed = infos.regions ?? [{ "@type": "Country", name: "Israel" }];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EventPlanner", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: he ? site.nameHe : `Kineret – ${site.nameHe}`,
        alternateName: ["כנרת אירועי חינה", "כנרת חינות", "Kineret henna", "Kineret – אירועי חינה יוקרתיים"],
        slogan: d.hero.title,
        description: d.meta.description,
        url: `${site.url}/${lang}`,
        image: `${site.url}/og.jpg`,
        logo: `${site.url}/icon.svg`,
        telephone: site.phoneIntl.replace(/[\s-]/g, ""),
        address: { "@type": "PostalAddress", addressLocality: infos.studioCity.en, addressCountry: "IL" },
        areaServed,
        sameAs: [site.instagram, site.facebook, site.threads],
        review: avis.items.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.nameLatin },
          datePublished: r.date,
          reviewBody: r.text.he,
          inLanguage: "he",
        })),
      },
      ...d.services.items.map((x) => ({
        "@type": "Service",
        name: x.name,
        description: x.text,
        serviceType: x.id === "outfits" ? "Henna outfit rental" : "Moroccan henna production",
        provider: { "@id": `${site.url}/#business` },
        areaServed,
      })),
      {
        "@type": "FAQPage",
        mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}
