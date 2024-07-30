"use client";
import React, { FC, useEffect, useState } from "react";
import Logo from "./logo";
import Navbar from "./navbar";
import { buttonVariants } from "@/components/ui/button";
import GetItOnPlayStore from "@/components/GetItOnPlayStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MobileHeader from "./mobile-header";

const Header: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [windowWidth, setWindowWidth] = useState<number>(763);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <div className={cn("flex w-full top-0 left-0 z-10 bg-background items-center justify-between border-b", props.className)}>
      {windowWidth <= 761 ? (
        <MobileHeader />
      ) : (
        <>
          <Logo />
          <Navbar />
          <div className="flex gap-x-5 items-center">
            <Link href="/auth" className={buttonVariants()}>
              Sign Up
            </Link>
            <GetItOnPlayStore />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
