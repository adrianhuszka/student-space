export type navItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  navItems: navItem[];
  navMenuItems: navItem[];
};

export const siteConfig: SiteConfig = {
  name: "Student-Space",
  description: "Oktatási platform",
  navItems: [
    {
      label: "home",
      href: "/home",
    },
  ],
  navMenuItems: [
    {
      label: "home",
      href: "/home",
    },
  ],
};
