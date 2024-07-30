"use client";
import { ModuleSidebarLinks } from "@/types";
import React, { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

const SidebarRoute: FC<{ isCollapsed: boolean; route: ModuleSidebarLinks }> = ({ isCollapsed, route }) => {
  const pathName = usePathname();

  const { icon: Icon, label, link, title } = route;
  return (
    <>
      {isCollapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href={link}
              className={cn(
                buttonVariants({
                  variant: pathName === link ? "default" : "ghost",
                  size: "icon",
                })
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {title}
            {label && <span className="ml-auto text-muted-foreground">{label}</span>}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link href={link} className={cn(buttonVariants({ variant: pathName === link ? "default" : "ghost", size: "sm" }), "justify-start")}>
          <Icon className="mr-2 h-4 w-4" />
          {title}
          {label && <span className={cn("ml-auto")}>{label}</span>}
        </Link>
      )}
    </>
  );
};

export default SidebarRoute;
