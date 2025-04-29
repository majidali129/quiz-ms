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
      href={href}
      className={`flex items-center rounded  justify-center lg:justify-start py-2 px-4 gap-2   text-gray-50/90 hover:text-gray-5 ${isActive ? "bg-primary/80 hover:bg-primary" : "bg-zinc-700/40 hover:bg-zinc-700/90"}`}
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
