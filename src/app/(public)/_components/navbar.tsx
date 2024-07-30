"use client";
import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const Navbar: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const pathname = usePathname();
  return (
    <div className={cn("flex gap-x-10", props.className)} {...props}>
      {navbarLinks.map((link, i) => {
        // const Icon = link.icon;
        const isActive = pathname === link.link;
        return (
          <Link
            href={link.link}
            key={link.title + i}
            className={cn("flex items-center gap-x-3 cursor-pointer hover:text-primary", isActive ? "text-primary" : "text-gray-300")}
          >
            {/* <Icon size={20} /> */}
            <h6 className="text-lg font-semibold">{link.title}</h6>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
