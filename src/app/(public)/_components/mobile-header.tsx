"use client";
import React from "react";
import Logo from "./logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "./navbar";
import Link from "next/link";

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-around w-full px-0">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Logo />
            </SheetHeader>
            <SheetClose asChild>
              <Navbar className="flex-col mt-10 space-y-5" />
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      <Logo />

      <Link href="/auth" className={buttonVariants()}>
        Get Started
      </Link>
    </div>
  );
};

export default MobileHeader;
