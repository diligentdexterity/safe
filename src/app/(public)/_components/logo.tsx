import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

const Logo: FC<React.HTMLAttributes<HTMLDivElement> & { height?: string }> = (props) => {
  return (
    <div {...props}>
      <Image src="/logo.svg" width={139} height={44} alt="safe logo" className={cn("h-[40px]", props.height && props.height)} />
    </div>
  );
};

export default Logo;
