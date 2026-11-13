// Tout le contenu du site est ici. Remplace les valeurs « À REMPLIR ».

export type Social = "github" | "linkedin" | "x" | "email";

export const profile = {
  name: "Lucas Millart",
  avatar: "/avatar.png" as string | null, // ex. "/avatar.png" (mettre l'image dans /public)
  tagline: "Développeur full-stack. Je construis des produits web, vite et proprement.",
  // Les segments entre ** ** sont mis en valeur en blanc gras.
  bio: [
    "Je construis des produits web de bout en bout, de l'idée à la mise en ligne.",
    "**À REMPLIR** projets publiés, **À REMPLIR** ans d'expérience.",
  ],
  email: "contact@exemple.fr",
  github: "LucasMillart", // utilisé pour le calendrier de contributions
  cta: { label: "Me contacter", href: "mailto:contact@exemple.fr" },
  socials: [
    { type: "github", href: "https://github.com/LucasMillart", label: "GitHub" },
    { type: "linkedin", href: "https://www.linkedin.com/", label: "LinkedIn" },
    { type: "x", href: "https://x.com/", label: "X" },
  ] satisfies { type: Social; href: string; label: string }[],
};

export type Project = {
  name: string;
  description: string;
  href: string;
  /** Emoji ou chemin d'image dans /public (ex. "/logos/app.png") */
  logo: string;
};

/** Projets phares : grandes cartes */
export const featured: Project[] = [
  { name: "Projet Un", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "🚀" },
  { name: "Projet Deux", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "📊" },
  { name: "Projet Trois", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "⚡" },
  { name: "Projet Quatre", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "🧩" },
];

/** Autres projets : liste compacte */
export const others: Project[] = [
  { name: "Petit projet", description: "Description courte en une ligne", href: "#", logo: "🧪" },
  { name: "Side project", description: "Description courte en une ligne", href: "#", logo: "🎮" },
  { name: "Outil interne", description: "Description courte en une ligne", href: "#", logo: "🛠️" },
  { name: "Expérience", description: "Description courte en une ligne", href: "#", logo: "🌱" },
  { name: "Script", description: "Description courte en une ligne", href: "#", logo: "📦" },
  { name: "Prototype", description: "Description courte en une ligne", href: "#", logo: "🧠" },
];
