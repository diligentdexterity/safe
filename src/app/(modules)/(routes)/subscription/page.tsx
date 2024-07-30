import Image from "next/image";
import React from "react";

const Subscription = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src="/images/coming-soon.gif" className="w-64" width={100} height={100} alt="coming soon gif animation" />
    </div>
  );
};

export default Subscription;
