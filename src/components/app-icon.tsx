"use client";
import { getHostName } from "@/lib/utils";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const AppIcon: FC<{ url: string | null }> = ({ url }) => {
  const iconBaseUrl = `/icons/`;
  const label = getHostName(url);
  const [imgSrc, setImgSrc] = useState<string>(iconBaseUrl + "default.png");

  useEffect(() => {
    setImgSrc(iconBaseUrl + (label ? label : url) + ".png");
  }, [url, label, iconBaseUrl]);

  return (
    <Image
      src={imgSrc}
      width={100}
      height={100}
      onError={() => {
        setImgSrc(`/icons/default.png`);
      }}
      alt="Website Icons"
      className="w-[50px]"
    />
  );
};

export default AppIcon;
