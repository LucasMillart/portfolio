// Tout le contenu du site est ici. Remplace les valeurs « À REMPLIR ».

export type Social = "github" | "linkedin" | "x" | "email";

export const profile = {
  name: "Lucas Millart",
  avatar: "/avatar.png" as string | null, // ex. "/avatar.png" (mettre l'image dans /public)
  tagline: "Développeur en alternance et fan d'athlétisme.",
  // Les segments entre ** ** sont mis en valeur en blanc gras.
  bio: [] as string[],
  email: "contact@exemple.fr",
  github: "LucasMillart", // utilisé pour le calendrier de contributions
  cta: { label: "Me contacter", href: "mailto:contact@exemple.fr" },
  socials: [
    { type: "github", href: "https://github.com/LucasMillart", label: "GitHub" },
    { type: "linkedin", href: "https://www.linkedin.com/", label: "LinkedIn" },
  ] satisfies { type: Social; href: string; label: string }[],
};

export type Project = {
  name: string;
  description: string;
  href: string;
  /** Emoji ou chemin d'image dans /public (ex. "/logos/app.png") */
  logo: string;
};

/** Tous les projets, dans une seule liste (du plus important au plus petit). */
export const projects: Project[] = [
  { name: "Projet Un", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "🚀" },
  { name: "Projet Deux", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "📊" },
  { name: "Projet Trois", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "⚡" },
  { name: "Projet Quatre", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "🧩" },
  { name: "Portfolio", description: "Ce site : Next.js, pixel art et calendrier GitHub", href: "https://github.com/LucasMillart/portfolio", logo: "🐼" },
  { name: "Petit projet", description: "Une phrase qui dit ce que fait le projet", href: "#", logo: "🧪" },
];
