"use client";
import React from "react";
import Logo from "../../_components/logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GlareCard } from "@/components/ui/glare-card";
import { Lock } from "lucide-react";
import Link from "next/link";
import { FaComputer, FaDollarSign, FaUser } from "react-icons/fa6";

const WhySafePage = () => {
  const landingScreenHeight = "min-h-[calc(100vh-80px)]";

  return (
    <div>
      <div className={cn("flex flex-col md:my-0 my-20 items-center gap-x-20 border-b", landingScreenHeight)}>
        <div className="flex-1 space-y-5">
          <div className="flex items-center text-2xl font-semibold">
            Why <Logo height="h-[25px]" className="-mx-6" /> ?
          </div>
          <h1 className="text-6xl font-extrabold">Your Security, Our Priority.</h1>
          <p className="text-lg mt-5">
            SAFE is your ultimate solution for secure and easy password management, available on Website, Android, iOS, and Chrome extension
          </p>
          <Link className={buttonVariants()} href="/auth">
            Get Started Today
          </Link>
        </div>
        <div className="flex-1">
          <Image src="/images/why-safe.svg" className="w-[500px]" width={742.417} height={712.574} alt="why-safe" />
        </div>
      </div>
      <div className="my-20 text-center space-y-5">
        <div className="text-5xl font-extrabold">
          Discover the Power of Secure <br />
          <span className="flex md:flex-row flex-col items-center justify-center">
            Password Management with <Logo height="mx-5 md:mx-0 h-[100px]" />
          </span>
        </div>
        <p className="text-lg text-muted-foreground">
          There’s a better way to solve the password problem. Dashlane is doing what
          <br /> others aren’t—providing complete credential and password management. We promise to:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-fit gap-x-10 gap-y-20">
        <GlareCard className="md:px-20 md:py-10 px-10 py-5 w-full space-y-5">
          <Lock size={25} />
          <h2 className="text-white font-bold text-2xl mt-4">Top-Notch Security</h2>
          <p>
            SAFE uses advanced encryption to keep your passwords and data secure. Your master password is hashed and stored safely, ensuring even we
            cannot access it. This robust security guarantees protection against unauthorized access.
          </p>
        </GlareCard>
        <GlareCard className="md:px-20 md:py-10 px-10 py-5 w-full space-y-5">
          <FaComputer size={25} />
          <h2 className="text-white font-bold text-2xl mt-4">Cross-Platform Availability</h2>
          <p>
            SAFE is available on Website, Android, iOS, and Chrome extension, letting you manage your passwords conveniently on any device. Stay
            secure and synchronized across all your platforms with SAFE.
          </p>
        </GlareCard>
        <GlareCard className="md:px-20 md:py-10 px-10 py-5 w-full space-y-5">
          <FaDollarSign size={25} />
          <h2 className="text-white font-bold text-2xl mt-4">Completely Free</h2>
          <p>
            SAFE is a free service, offering top-quality password management with no hidden fees or subscriptions. Everyone deserves access to robust
            security tools, and SAFE provides just that.
          </p>
        </GlareCard>
        <GlareCard className="md:px-20 md:py-10 px-10 py-5 w-full space-y-5">
          <FaUser size={25} />
          <h2 className="text-white font-bold text-2xl mt-4">Individually Crafted</h2>
          <p>
            SAFE is meticulously designed by an individual committed to creating a trustworthy and reliable password manager. This personal touch
            ensures a focus on user experience and security.
          </p>
        </GlareCard>
      </div>
    </div>
  );
};

export default WhySafePage;
