export interface SidebarLinks {
  label: string;
  icon?: any;
  link?: string;
  links?: SidebarLinks[];
}
export interface SidebarProps {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
}
