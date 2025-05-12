"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import { SidebarItemType } from "../types";

type SidebarItemProps = {
  item: SidebarItemType;
};

const SidebarItem = ({ item: { href, label, icon } }: SidebarItemProps) => {
  const pathName = usePathname();
  const isActive = pathName.startsWith(href);
  return (
    <Link
      prefetch
      href={href}
      className={`flex items-center rounded  justify-center lg:justify-start py-2 px-4 gap-2   text-sidebar-foreground/90 hover:text-sidebar-foreground ${
        isActive ? "bg-primary/80 hover:bg-primary" : "bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800/90"
      }`}
    >
      {isValidElement(icon) &&
        cloneElement(icon, {
          className: "w-4 h-4 lg:w-5 lg:h-5",
        })}
      <span className="text-[.98rem]">{label}</span>
    </Link>
  );
};
export { SidebarItem };
