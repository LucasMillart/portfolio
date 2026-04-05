export type Project = {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  technologies: string[];
  status: "planning" | "in-progress" | "completed" | "on-hold";
  github?: string;
  liveUrl?: string;
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
