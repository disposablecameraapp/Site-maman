# Nathalie Astruc — site officiel

Site éditorial statique (HTML / CSS / JS, sans framework) pour Nathalie Astruc, coach professionnelle certifiée et praticienne PNL à Montpellier.

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : signature, hero, services, témoignage, bio teaser, CTA |
| `a-propos.html` | Parcours, formation, valeurs |
| `services.html` | Coaching individuel · entreprise · ateliers / collectifs |
| `approche.html` | Principes, méthode en 4 étapes, manifeste |
| `temoignages.html` | Paroles de clients |
| `contact.html` | Coordonnées, formulaire, FAQ |

## Stack

- HTML statique multi-pages
- CSS unique : `styles/main.css` (tokens, typographie, layout, composants)
- JS unique : `scripts/main.js` (header au scroll, menu mobile, reveal au scroll, FAQ accordéon, fallback `mailto:` du formulaire)
- Polices : Fraunces (serif éditoriale) + Inter (sans), via Google Fonts
- Aucune dépendance NPM, aucun build

## Identité visuelle

- Palette terreuse : papier `#f7f2ea`, encre `#1f1c19`, terracotta `#b86b4d`, sauge `#7d8a6c`, or `#b08a4f`
- Typographie éditoriale : titres en serif italique fine, corps en sans neutre
- Animations subtiles, accessibles (`prefers-reduced-motion` respecté)

## Personnalisation rapide

- **Photo** : remplacer `assets/portrait.svg` par une photo réelle (`assets/portrait.jpg`) puis mettre à jour les balises `<img>` dans `index.html` et `a-propos.html`. Format conseillé : 1200×1500 px, format JPG, < 250 ko.
- **Calendly** : tous les CTA pointent vers `https://calendly.com/nathalie_astruc`. Ajuster si l'URL change.
- **Coordonnées** : téléphone, email et localisation sont centralisés dans le `<footer>` de chaque page et dans `contact.html`.
- **Tarifs** : page `services.html` (section "Investissement"). Texte volontairement souple.
- **Témoignages** : `temoignages.html` — chaque `<article class="testimonial">` est indépendant, dupliquable.
- **FAQ** : `contact.html` — accordéon piloté en JS, ajouter un `<article class="faq-item">` suffit.

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Le site étant 100% statique, il se déploie en glisser-déposer sur :
- Netlify, Vercel, Cloudflare Pages, GitHub Pages
- ou un simple FTP chez l'hébergeur actuel (`www.nathalieastruc.fr`)

Aucune configuration serveur particulière n'est requise.

## Accessibilité & SEO

- Balises sémantiques (`header`, `main`, `section`, `article`, `footer`)
- Liens `aria-current` pour l'item de navigation actif
- `aria-expanded` sur les boutons FAQ et le menu mobile
- Méta description, `og:` tags, `theme-color`, `lang="fr"`
- Contraste AA, focus visibles, navigation clavier
- `prefers-reduced-motion` respecté

## Licence

© Nathalie Astruc — Tous droits réservés.
