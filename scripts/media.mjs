// Trie les photos de Kineret (assets/raw/kineret_NNN_<fbid>.jpg) dans assets/<catégorie>/ avec des noms lisibles,
// puis les prépare pour le web dans public/media/<catégorie>/. next/image sert ensuite AVIF/WebP.
//   npm run media
//
// Source : son Instagram est privé ; ces 140 photos viennent de sa page Facebook publique
// « Kineret-אירועי חינה יוקרתיים » (onglet Photos, dans l'ordre de la page, en 1440-1800 px).
// Écartés volontairement : visuels de logo et de texte (080, 117, 119, 120, 126), photos où des invités sont
// reconnaissables au premier plan (055, 133), veste « Bring them home » (022, 023), photos floues ou anciennes basse déf.
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const rawFiles = await readdir(path.join(ROOT, "assets/raw"));
const R = (n) => {
  const f = rawFiles.find((x) => x.startsWith(`kineret_${n}_`));
  if (!f) throw new Error(`Photo ${n} introuvable`);
  return `raw/${f}`;
};

// [source (dans assets/), catégorie, nom, recadrage facultatif en fractions {top, bottom}]
const PICKS = [
  // Hero : kaftan blanc brodé devant une arche terracotta (la forme de son logo)
  [R("033"), "hero", "kaftan-arche"],
  [R("116"), "hero", "tente-rouge"],

  // Tenues de la mariée
  [R("032"), "tenues-mariee", "kaftan-blanc-brode"],
  [R("001"), "tenues-mariee", "robe-perlee-argent"],
  [R("030"), "tenues-mariee", "takchita-rouge"],
  [R("041"), "tenues-mariee", "velours-emeraude"],
  [R("045"), "tenues-mariee", "jupe-perlee-rose"],
  [R("054"), "tenues-mariee", "ensemble-safran"],
  [R("059"), "tenues-mariee", "cape-franges-or"],
  [R("062"), "tenues-mariee", "resille-perlee-blanche"],
  [R("066"), "tenues-mariee", "caftan-ciel"],
  [R("070"), "tenues-mariee", "drape-perle-rose"],
  [R("075"), "tenues-mariee", "manteau-bordeaux-or"],
  [R("078"), "tenues-mariee", "bustier-or-jupe-tissee"],
  [R("086"), "tenues-mariee", "caftan-ivoire-traine"],
  [R("089"), "tenues-mariee", "satin-dore-drape"],
  [R("100"), "tenues-mariee", "kaftan-vert-brode"],
  [R("106"), "tenues-mariee", "jupe-plumes-rose"],
  [R("111"), "tenues-mariee", "caftan-pastel-raye"],
  [R("113"), "tenues-mariee", "ensemble-anis-brode"],
  [R("121"), "tenues-mariee", "caftan-creme-manches"],
  [R("124"), "tenues-mariee", "turban-perle-nude"],
  [R("129"), "tenues-mariee", "cape-blanche-ecuries"],
  [R("139"), "tenues-mariee", "dentelle-blanche-traine"],
  [R("096"), "tenues-mariee", "imprime-bleu-trone"],
  [R("026"), "tenues-mariee", "resille-cristal"],

  // Tenues du marié et des couples
  [R("053"), "tenues-famille", "couple-djellaba-safran"],
  [R("105"), "tenues-famille", "couple-gandoura-plumes"],
  [R("127"), "tenues-famille", "couple-brode-ivoire"],
  [R("021"), "tenues-famille", "marie-manteau-tisse", { top: 0, bottom: 1 }],
  [R("017"), "tenues-famille", "marie-manteau-detail"],

  // Décors
  [R("039"), "decors", "table-douceurs-lanternes"],
  [R("131"), "decors", "trone-voilages"],
  [R("082"), "decors", "coussins-arches-blanches"],
  [R("036"), "decors", "table-piscine"],
  [R("037"), "decors", "salon-moucharabieh"],
  [R("136"), "decors", "plateaux-lanternes"],
  [R("134"), "decors", "salle-lanternes"],
  [R("098"), "decors", "trone-eventail-or"],

  // Soirées (réalisations)
  [R("038"), "soirees", "soiree-piscine-lustres"],
  [R("083"), "soirees", "arches-blanches-piscine"],
  [R("057"), "soirees", "soiree-safran"],
  [R("109"), "soirees", "nuit-bougies-tapis"],
  [R("135"), "soirees", "grande-salle-lanternes"],
  [R("012"), "soirees", "salon-blanc-couple"],

  // Galerie (ambiance, atelier, collection)
  [R("085"), "galerie", "riad-caftan-blanc"],
  [R("087"), "galerie", "porte-sculptee"],
  [R("088"), "galerie", "broderie-or-portrait"],
  [R("093"), "galerie", "atelier-tissus"],
  [R("072"), "galerie", "arche-desert"],
  [R("064"), "galerie", "arche-ocre"],
  [R("025"), "galerie", "showroom-logo"],
  [R("015"), "galerie", "bracelets-mains"],
  [R("118"), "galerie", "satin-mer"],
];

const sizes = {};
for (const [src, cat, name, crop] of PICKS) {
  const file = path.join(ROOT, "assets", src);
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  await copyFile(file, path.join(ROOT, "assets", cat, `${name}.jpg`));
  let pipe = sharp(file).rotate();
  if (crop) {
    const { width, height } = await sharp(file).metadata();
    const top = Math.round(height * crop.top);
    pipe = pipe.extract({ left: 0, top, width, height: Math.round(height * crop.bottom) - top });
  }
  const info = await pipe
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}

// Emplacements prévus pour les photos et vidéos qu'elle enverra
for (const dir of ["a-recevoir/photos", "a-recevoir/videos", "tenues-enfants"]) await mkdir(path.join(ROOT, "assets", dir), { recursive: true });

// Image de partage (Open Graph) 1200 × 630
await sharp(path.join(ROOT, "assets", R("116")))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${PICKS.length} images prêtes`);
