import type { HeaderAction, NavItem } from "./types";

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
