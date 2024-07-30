import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { dashboardSidebarLinks } from "@/constants";
import { Session } from "next-auth";
import Image from "next/image";
import { LogOut } from "lucide-react";
import SidebarRoute from "./sidebar-route";
import { handleSignOut } from "@/actions/handleSignOut";
import { signOut } from "next-auth/react";

interface NavProps {
  isCollapsed: boolean;
  session: Session;
}

export function DashboardSidebar({ isCollapsed, session }: NavProps) {
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "group h-screen overflow-hidden w-full bg-black/10 left-0 flex flex-col justify-between gap-4 py-2 data-[collapsed=true]:py-2"
          // !isCollapsed ? "w-full" : "w-fit"
        )}
      >
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center px-5">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Image
                  src={session?.user?.image || "/images/avatar.svg"}
                  alt="default avatar"
                  width={128}
                  height={128}
                  className="w-9 rounded-full mb-5"
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Profile
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="mb-5 flex gap-x-5 items-center px-5 py-4 bg-primary/15 my-5 rounded-xl">
              <Image
                src={session?.user?.image || "/images/avatar.svg"}
                alt="default avatar"
                width={128}
                height={128}
                className="w-[60px] rounded-full"
              />
              <div className="overflow-hidden">
                <h5 className="font-bold text-lg text-nowrap">{session?.user?.name}</h5>
                <p className="font-semibold text-gray-300 text-sm text-nowrap">{session?.user?.email}</p>
              </div>
            </div>
          )}

          {dashboardSidebarLinks.map((route, index) => (
            <SidebarRoute isCollapsed={isCollapsed} route={route} key={route.link + index} />
          ))}
        </nav>
        <div className={isCollapsed ? "p-1 mx-auto" : "p-5"}>
          <Button
            onClick={() => signOut()}
            type="submit"
            variant="modern"
            className={isCollapsed ? "items-center" : "justify-between w-full"}
            size={isCollapsed ? "icon" : "sm"}
          >
            {!isCollapsed && "Sign Out"}
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
