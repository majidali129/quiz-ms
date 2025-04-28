import { ReactElement } from "react";

export type SidebarItemType = {
  href: string;
  label: string;
  icon?: ReactElement<{ className?: string }> | null;
};
