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
  name: "StudentSpace",
  description: "site-description",
  navItems: [
    {
      label: "home",
      href: "/home",
    },
    {
      label: "forum",
      href: "/forum",
    },
  ],
  navMenuItems: [
    {
      label: "home",
      href: "/home",
    },
    {
      label: "forum",
      href: "/forum",
    },
  ],
};
