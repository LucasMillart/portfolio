# Charte graphique

Inspirations : la mise en page de marc.lou (deux colonnes, sobre, sombre) et l'univers pixel art en 3D.
On s'en inspire, on ne les copie pas : l'identité propre du site, c'est le **pixel art vert**, et elle est présente partout.

## Mise en page

- Deux colonnes sur grand écran : **gauche** = profil, fixe au défilement (`sticky`) ; **droite** = contenu qui défile.
- Une seule colonne sur mobile (profil, puis contenu). Gouttière de 16 px.
- Largeur max `7xl`, colonne gauche ≤ 20 rem, peu de marge à gauche.

## Couleurs (`src/app/globals.css`)

| Token | Valeur | Usage |
|---|---|---|
| `bg` | `#0a0a0a` | fond de page |
| `card` / `card-hover` | `#141414` / `#1b1b1b` | cartes |
| `line` / `line-strong` | blanc 8 % / 18 % | bordures, bordure au survol |
| `fg` | `#fafafa` | titres, chiffres en gras |
| `muted` / `subtle` | `#a3a3a3` / `#6b6b6b` | texte courant / légendes |
| `pix-0` → `pix-3` | `#0f380f` `#306230` `#8bac0f` `#c4e33a` | **seul accent** : bureau pixel, avatar, sélection |

Règle : tout est en noir et blanc, sauf les éléments pixel, qui utilisent les 4 verts. Pas d'autre couleur.

## Typographie

- **Geist** : texte et titres. Titres en gras avec `tracking-tight`.
- **Geist Mono** : badges techniques, légendes du calendrier.
- **Silkscreen** (police pixel) : petites touches seulement (initiales, micro-légendes). Jamais pour du texte long.
- Mise en valeur dans un texte : `**gras**` en blanc dans du texte gris.

## Composants

- **Carte projet** : logo, titre, une phrase. Toute la carte est un lien. Au survol : elle monte de 2 px, la bordure et le fond s'éclaircissent, une flèche ↗ apparaît. Pas de chiffre de revenus.
- **Projets** : une seule section, tous les projets (gros ou rapides) dans la même carte, grille de 2 colonnes.
- **Profil** : avatar, nom, accroche, bio courte, un bouton de contact et des icônes sociales. Minimaliste, sans décor.
- **Titre de section** : titre, compteur ou lien à droite, filet en dessous. Pas de puce.
- **Carte d'accueil** : bureau isométrique en voxels (canvas, agrandi par facteur entier) : écran où du code se tape, café qui fume, fenêtre étoilée, panda de dos. Ni localisation ni stack affichées.
- **Calendrier GitHub** : API officielle (`GITHUB_TOKEN`), cases à peine arrondies (3 px), 2 px d’écart, en niveaux de gris (du gris foncé au blanc), stats en en-tête, infobulle au survol.

## Mouvement

Animations courtes (200 ms), en paliers (`steps()`) pour les éléments pixel. Si `prefers-reduced-motion` est activé, tout est figé.
