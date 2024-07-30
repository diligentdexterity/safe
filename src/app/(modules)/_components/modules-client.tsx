"use client";
import React, { FC, useEffect } from "react";
import { DashboardSidebar } from "../../../components/modules/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../../components/ui/resizable";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

const ModulesLayoutClient: FC<{
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  session: Session;
  defaultLayout: number[] | undefined;
}> = ({ children, session, defaultLayout = [265, 1095], defaultCollapsed = false }) => {
  const navCollapsedSize = 4;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth <= 761) {
      router.push("/downloads");
    }
  }, []);

  return (
    <div className="background">
      <main className="backdrop-blur-3xl w-full bg-black/50 min-h-screen ">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
          }}
          className="min-h-screen items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
            }}
            className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
          >
            <DashboardSidebar session={session} isCollapsed={isCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div className="flex">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default ModulesLayoutClient;
