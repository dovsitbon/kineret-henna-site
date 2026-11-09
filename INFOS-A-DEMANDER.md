# Kineret – infos à lui demander

Site en ligne avec ses vraies photos (page Facebook publique). Tout ce qui suit est marqué « à remplir » ou « à confirmer » dans `data/*.json` et `locales/*.json`.

## Ce qu'on a trouvé (à faire confirmer)

- **Instagram privé** : @kineret.henna, 65,6 k abonnés, 908 publications. Impossible d'y lire légendes, stories à la une ou prix sans s'abonner.
- **Photos** : 140 photos HD prises sur sa page Facebook publique « Kineret-אירועי חינה יוקרתיים » (8,7 k abonnés). 54 retenues sur le site.
- **Le « 1 de plus » de sa bio** : les deux liens de la bio mènent au même WhatsApp (wa.me/message/AWTXD4WS7ZEHM1). Le lien sous la bio est son profil Threads (@kineret.henna, 6,9 k abonnés).
- **Deuxième numéro** (bio Threads) : 050-4448000. Pas affiché sur le site : lequel mettre en avant ?
- **Facebook** : téléphone +972 72-265-7739 et e-mail kineret.vao@gmail.com. Pas affichés : sont-ils encore valables ?
- **Studio à Rishon LeZion** : deux adresses trouvées, à trancher. Mit4Mit : rue Yehudit ve-Elikum Nahmani. easy.co.il : Tnuot HaNoar 6 (horaires annoncés dim.-jeu. 7 h 30-19 h 30). Le site affiche seulement « studio à Rishon LeZion, sur rendez-vous ».
- **Un seul vrai avis public** : Noy, Mit4Mit, novembre 2021 (95/100). Il est cité en extrait. Il remercie « Beni » et une équipe (Noy à l'agenda, Maya l'essayeuse, Shiraz l'habilleuse). **Qui dirige Kineret aujourd'hui ? Kineret, Beni, les deux ?** Le texte « À propos » (« עליי ») parle de la marque sans nommer personne en attendant.
- **Noa Kirel** : en juin 2026, sur Threads, elle parle d'une création pour @noakirel (« Amphi Max »). Peut-on la citer comme cliente ? Rien n'est affiché sans son accord.

## À lui demander

1. **Formules** : ce qu'inclut chacune (production complète, décor, tenues, henné intime à la maison, si elle le fait), et les prix « à partir de » si elle veut les afficher. → `data/formules.json`
2. **Régions couvertes** : tout Israël ? Supplément de déplacement ? → `data/infos.json` (`regions`) + FAQ
3. **Studio / showroom** : adresse exacte, horaires, rendez-vous seulement ? → `data/infos.json`
4. **Collection de tenues** : nombre de tenues, location ou vente, vrais noms des modèles, tenues famille et enfants (photos manquantes : la catégorie « Enfants » est vide, « Famille » ne montre que des mariés). → `data/tenues.json`
5. **Son histoire** : depuis quand, comment elle a commencé, l'équipe. Et **un vrai portrait d'elle** pour la section « עליי ».
6. **Nombre de soirées produites** (affiché près des boutons dès qu'il est renseigné). → `data/stats.json` (`events`)
7. **Réalisations** : pour chaque soirée de la grille, prénoms du couple, lieu (salle / ville) et nombre d'invités. → `data/realisations.json`
8. **Vrais avis clientes** (captures WhatsApp ou Google), avec prénom et accord. → `data/avis.json`
9. **Photos et vidéos HD** : décors, tenues famille et enfants, une vidéo courte pour le hero (reel sans texte). → `assets/a-recevoir/`
10. **Logo** : fichier vectoriel (le SVG du site est redessiné d'après sa photo de profil).
11. **Acompte** : montant et moyen de paiement si elle veut le paiement en ligne (prévu dans `lib/payment.ts`, désactivé).
12. **Bandeau d'infos** : texte à valider (« dates 2027 ouvertes, essayages sur rendez-vous »). → `data/annonces.json`
13. **FAQ** : délai de réservation conseillé, location ou achat des tenues, acompte. Les réponses actuelles restent générales.
14. **Mentions légales** : nom de l'entreprise, numéro (ע.מ / ח.פ).
