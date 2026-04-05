export type Project = {
  name: string;
  description: string;
  icon: string;
  accent: string;
};

export type HeaderAction = {
  label: string;
  icon: string;
};

export type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};
