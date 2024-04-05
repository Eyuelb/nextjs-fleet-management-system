import { IconAward, IconShoppingCart } from "@tabler/icons-react";
import { SidebarLinks } from "./model";
import { AppConfig } from "utils/app-config";

export const menuLinks: SidebarLinks[] = Object.entries(AppConfig).map(([key, value]) => ({
  label: key,
  icon: IconShoppingCart,
  link: `/${value}`,
}));