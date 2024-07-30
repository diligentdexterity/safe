/**
 * @file constants.ts
 * @description Defines the sidebar links and their properties for the dashboard.
 * @usage Used in DashboardSidebar component to render navigation links.
 */

import { ModuleSidebarLinks } from "@/types";
import { ArchiveX, Banknote, Book, CreditCard, Home, KeyRound, LayoutDashboard, LucideIcon, Notebook, Settings, SquareUserRound } from "lucide-react";

export const dashboardSidebarLinks: ModuleSidebarLinks[] = [
  { title: "Passwords", label: "", icon: KeyRound, link: "/passwords" },
  { title: "Cards", label: "", icon: CreditCard, link: "/cards" },
  { title: "Identity", label: "", icon: SquareUserRound, link: "/identity" },
  { title: "Notes", label: "", icon: Notebook, link: "/notes" },
  { title: "Settings", label: "", icon: Settings, link: "/settings" },
];

export const navbarLinks: ModuleSidebarLinks[] = [
  { title: "Home", label: "", icon: Home, link: "/" },
  { title: "Why SAFE", label: "", icon: Home, link: "/why-safe" },
  { title: "Downloads", label: "", icon: Home, link: "/downloads" },
];
