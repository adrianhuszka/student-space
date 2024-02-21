export type SiteConfig = typeof siteConfig;

export const siteConfig = {
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
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
