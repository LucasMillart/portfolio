import type { HeaderAction, NavItem, Project } from "./types";

export const projects: Project[] = [
  {
    name: "Planifeo",
    description:
      "Application mobile de planification d'entraînement et suivi de performance pour athlètes.",
    icon: "construction",
    accent: "bg-[#f3d8c3]",
  },
  {
    name: "NexuStream",
    description:
      "Plateforme SaaS de gestion de contenu vidéo en temps réel pour créateurs.",
    icon: "slideshow",
    accent: "bg-base-200",
  },
  {
    name: "EchoVault",
    description:
      "Interface web sécurisée pour la gestion de mots de passe et documents confidentiels.",
    icon: "lock",
    accent: "bg-base-200",
  },
];

export const navItems: NavItem[] = [
  { label: "Projets", href: "#", isActive: true },
  { label: "A propos", href: "#" },
];

export const headerActions: HeaderAction[] = [
  { label: "Contacter", icon: "mail" },
  { label: "Profil", icon: "account_circle" },
];

export const socialLinks: NavItem[] = [
  { label: "Github", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Contact", href: "#" },
];
