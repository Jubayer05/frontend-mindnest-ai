"use client";

import type { MenuItem, NavbarAuth, NavbarLogo } from "@/types/navbar";

export const defaultNavbarLogo: NavbarLogo = {
  url: "/",
  src: "/logo/logo-light.png",
  alt: "MindNest AI logo",
  title: "MindNest AI",
};

export const defaultNavbarMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  {
    title: "Discover",
    url: "/coaches",
    items: [
      {
        title: "Coaches",
        url: "/coaches",
        description: "Search, filter, and book verified coaches.",
      },
      {
        title: "Subjects",
        url: "/subjects",
        description: "Explore what you can learn next.",
      },
      {
        title: "Categories",
        url: "/categories",
        description: "Browse curated topic groups.",
      },
    ],
  },
  { title: "About", url: "/about" },
  { title: "Blog", url: "/blog" },
  { title: "Help", url: "/help" },
  { title: "Contact", url: "/contact" },
];

export const defaultNavbarAuth: NavbarAuth = {
  login: { title: "Login", url: "/auth/login" },
  signup: { title: "Sign up", url: "/auth/register" },
};
