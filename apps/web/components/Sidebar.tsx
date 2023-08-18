"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const pathName = usePathname();
  const nav = [
    {
      title: "Home",
      href: "/",
      active: pathName === "/",
    },
    {
      title: "PUBLIC",
      submenus: [
        {
          title: "Questions",
          href: "/questions",
          active: pathName === "/questions",
        },
        {
          title: "Tags",
          href: "/tags",
          active: pathName === "/tags",
        },
        {
          title: "Users",
          href: "/users",
          active: pathName === "/users",
        },
        {
          title: "Companies",
          href: "/companies",
          active: pathName === "/companies",
        },
      ],
    },
    {
      title: "COLLECTIVES",
      submenus: [
        {
          title: "Explore Collectieves",
          href: "/collectives",
          active: pathName === "/collectives",
        },
      ],
    },
    {
      title: "Teams",
      submenus: [
        {
          title: "Create Free Teams",
          href: "/teams/create",
          active: pathName === "/teams/create",
        },
      ],
    },
  ];
  return (
    <div className="w-[200px] border-r border-slate-700 h-screen pt-4">
      <ul className="text-[13px] space-y-2">
        {nav.map((menu, index) => {
          if (menu.href) {
            return (
              <li
                className={cn(
                  "hover:font-medium duration-75 py-1.5 px-2",
                  menu.active
                    ? "bg-slate-600 border-r-[3px] border-primary font-medium"
                    : ""
                )}
                key={index}
              >
                <Link href={menu.href}>{menu.title}</Link>
              </li>
            );
          } else if (menu.title && menu.submenus) {
            return (
              <div key={index}>
                <span className="text-[11px] font-light px-2">
                  {menu.title}
                </span>
                <ul className="space-y-1 px-2">
                  {menu.submenus.map((sub, i) => {
                    return (
                      <li
                        className={cn(
                          "hover:font-medium duration-75 py-1.5 px-2",
                          sub.active
                            ? "bg-slate-600 border-r-[3px] border-primary font-medium"
                            : ""
                        )}
                        key={i}
                      >
                        <Link href={sub.href}>{sub.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};
export default Sidebar;
