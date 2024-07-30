import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import Logo from "./logo";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaGooglePlay, FaAppStoreIos } from "react-icons/fa6";
import Link from "next/link";

const FooterLink: FC<{ link: string; label: string }> = ({ link, label }) => {
  return <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Web</p>;
};

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={cn("asbolute bottom-0 left-0 w-screen bg-gray-900 rounded-t-lg py-10", props.className)}>
      <div className="flex items-start justify-between container gap-x-10">
        <div className="flex-1 space-y-5">
          <Logo />
          <p className="text-lg">SAFE is a free and secure way to store your secrets </p>
          <div className="flex items-center gap-x-5">
            <FaFacebook size={22} className="cursor-pointer hover:scale-110" />
            <FaInstagram size={22} className="cursor-pointer hover:scale-110" />
            <FaYoutube size={22} className="cursor-pointer hover:scale-110" />
            <FaTwitter size={22} className="cursor-pointer hover:scale-110" />
            <FaGooglePlay size={22} className="cursor-pointer hover:scale-110" />
            <FaAppStoreIos size={22} className="cursor-pointer hover:scale-110" />
          </div>
        </div>
        <div className="flex-1 flex gap-x-20 bg-muted px-20 py-10 w-full rounded-3xl">
          <div>
            <h6 className="text-xl font-bold mb-3">Routes</h6>
            {navbarLinks.map((link, i) => (
              <Link
                key={link.link + i}
                href={link.link}
                className="block text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div>
            <h6 className="text-xl font-bold">Platforms</h6>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Android</p>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">iOs</p>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Web Extension</p>
          </div>
          <div>
            <h6 className="text-xl font-bold">External</h6>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Youtube</p>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Guides</p>
            <p className="text-lg text-muted-foreground font-semibold hover:text-white cursor-pointer">Blogs</p>
          </div>
        </div>
        <div className="flex-1">
          <iframe
            className="rounded-xl"
            width="560"
            height="250"
            src="https://www.youtube.com/embed/dgkp7KtnuQg?si=g2hqljGdv2yq8v7l&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
