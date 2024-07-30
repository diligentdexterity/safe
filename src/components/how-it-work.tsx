"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]" className="">
        <div className="max-w-xs">
          <h2 className="text-left mona-sans text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Secure Account Creation
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            When you create an account with SAFE, your credentials are safeguarded and encrypted with the highest standards.
          </p>
        </div>
        <Image
          src="/images/login-illustration.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[20%] filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 mona-sans text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Master Password Protection
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Your master password is the key to your digital vault. It is securely hashed and stored, so even we do not have access to it.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-800 min-h-[500px] lg:min-h-[300px]" className="">
        <div className="max-w-xs">
          <h2 className="text-left mona-sans text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Encrypted Password Storage
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Every password you create with SAFE is encrypted using your master password, making it readable only by you and ensuring your sensitive
            information stays secure.
          </p>
        </div>
        <Image
          src="/images/encryption-ilustration.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[20%] filter -bottom-5 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 bg-yellow-700 min-h-[300px]">
        <h2 className="max-w-80 mona-sans text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Safe and Easy Access
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Whenever and wherever you need to access your stored passwords, simply log in and use your master password to decrypt them. This seamless
          process ensures you can retrieve your information quickly and securely.
        </p>
      </WobbleCard>
    </div>
  );
}
