import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Apple, Globe, LogInIcon, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../_components/logo";
import { HowItWorks } from "@/components/how-it-work";
import { WobbleCard } from "@/components/ui/wobble-card";
import GetItOnPlayStore from "@/components/GetItOnPlayStore";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const landingScreenHeight = "min-h-[calc(100vh-80px)]";
  const session = await auth();

  if (session) {
    redirect("/passwords");
  }
  return (
    <div>
      <div className={cn("flex max-w-5xl justify-between mx-auto items-center", landingScreenHeight)}>
        <div className="flex-1 space-y-10">
          <div className="text-[60px] leading-snug mona-sans font-extrabold">
            <p>Never</p>
            <p> Forgot</p> <span className="text-primary">Password</span> <p>Anymore</p>
          </div>
          <Link href="/auth" className={buttonVariants({ size: "lg", className: "gap-x-2" })}>
            <p className="text-lg">Sign Up</p>
            <MoveRight size={20} />
          </Link>
        </div>
        <div className="flex-1 items-center justify-center flex">
          <Image src="/images/mobile.svg" alt="mobile" width={372} height={746} />
        </div>
      </div>
      <div className="space-y-10">
        <div className="justify-center text-6xl mona-sans font-extrabold flex items-end gap-x-3">
          How does <Logo height="h-full" /> works?
        </div>
        <HowItWorks />
      </div>

      <div className="text-6xl font-extrabold text-center mt-40 space-y-10 min-h-screen">
        <h1>
          Feels great in <span className="text-primary font-extrabold">low-light</span>
        </h1>

        <div className="flex justify-center items-center gap-x-10">
          <div className="bg-gray-900 max-w-[500px] space-y-3 px-11 py-8 rounded-xl">
            <h3 className="text-4xl mona-sans">
              Dark Mode <span className="text-primary">On</span>
            </h3>
            <p className="text-lg font-normal">Securely manage your passwords with ease and enjoy a sleek Dark Mode for a seamless experience</p>
          </div>
          <div className="max-w-[500px] space-y-3 px-11 py-8 rounded-xl">
            <h3 className="text-4xl mona-sans">
              <span className="text-primary">3x</span> Experience
            </h3>
            <p className="text-lg font-normal">Experience triple the convenience and security with our advanced password manager</p>
          </div>
        </div>
        <div className="min-h-full landing__darkPattern flex items-center justify-center">
          <Image src="/images/screen.png" alt="Screen" width={841.59} height={806} className="" />
        </div>
      </div>

      <WobbleCard className="flex flex-col gap-3 items-center justify-center" containerClassName="my-10">
        <div className="text-5xl mona-sans font-bold items-center flex gap-x-4 capitalize">
          <h1>Get started with</h1> <Logo height="h-[full]" /> <h1>today</h1>
        </div>
        <div className="flex gap-x-5 items-center">
          <Link href="/auth" className={buttonVariants({ variant: "secondary", className: "gap-x-2 bg-black h-full cursor-pointer z-10" })}>
            <Globe size={20} /> Continue On Web
          </Link>
          <Link href="/auth" className={buttonVariants({ variant: "secondary", className: "gap-x-2 bg-black h-full cursor-pointer z-10" })}>
            <Apple size={20} /> Download For iOs
          </Link>
          <Link href="/auth" className={buttonVariants({ variant: "secondary", className: "gap-x-2 bg-black h-full cursor-pointer z-10" })}>
            <Image src="/icons/PlayStore.svg" alt="playstore" width={21} height={24} className="w-[21px]" />
            Download For Android
          </Link>
        </div>
      </WobbleCard>
    </div>
  );
};

export default HomePage;
