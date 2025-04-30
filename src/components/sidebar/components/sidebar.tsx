import { BoxesIcon } from "lucide-react";
import { sidebar_items } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = async () => {
  return (
    <aside className="w-[210px] bg-sidebar min-h-screen border-r border-r-primary/10 fixed">
      <div className="w-full px-3 h-15 flex items-center border-b border-border">
        <h3 className="text-lg flex items-center gap-2">
          <BoxesIcon />
          <span className="tracking-wide font-semibold">QuizMaster</span>
        </h3>
      </div>
      <ul className="px-3 py-3 space-y-2">
        {sidebar_items["teacher"].map((item) => (
          <SidebarItem key={item.href} item={item} />
        ))}
      </ul>
    </aside>
  );
};
export { Sidebar };
