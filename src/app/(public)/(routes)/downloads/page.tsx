import React from "react";
import Logo from "../../_components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { FaApple, FaChrome, FaGooglePlay } from "react-icons/fa6";
import Link from "next/link";

const Downloads = () => {
  const landingScreenHeight = "min-h-[calc(100vh-80px)]";

  return (
    <div>
      <div className="flex my-20 justify-between">
        <div className="space-y-5 flex-1">
          <div className="flex items-center -mb-5 gap-x-3 text-5xl font-sans font-bold">
            Download <Logo height="h-full" /> Now
          </div>
          <p className="text-muted-foreground text-lg">Secure cloud syncing lets you access your sensitive information from anywhere on any device</p>
          <Link className={buttonVariants()} href="/auth">
            Get Started Today
          </Link>
        </div>
        <div className="flex justify-center flex-1">
          <Image src="/images/devices.svg" className="w-80" width={920.109} height={411.952} alt="devices" />
        </div>
      </div>
      <div className="pt-20 space-y-10">
        <h1 className="text-4xl font-bold text-center">Download For Various Platform</h1>
        <div className="grid grid-cols-3 gap-x-20">
          <div className="flex items-center gap-x-10 text-2xl font-bold bg-primary text-primary-foreground px-10 py-5 rounded-xl hover:scale-110 shadow-lg shadow-gray-800 cursor-pointer">
            <FaApple size={50} />
            Apple Store
          </div>
          <div className="flex items-center gap-x-10 text-2xl font-bold bg-primary text-primary-foreground px-10 py-5 rounded-xl hover:scale-110 shadow-lg shadow-gray-800 cursor-pointer">
            <FaGooglePlay size={50} />
            Google Play Store
          </div>
          <div className="flex items-center gap-x-10 text-2xl font-bold bg-primary text-primary-foreground px-10 py-5 rounded-xl hover:scale-110 shadow-lg shadow-gray-800 cursor-pointer">
            <FaChrome size={50} />
            Chrome Extension
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
