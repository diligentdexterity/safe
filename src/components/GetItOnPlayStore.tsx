import Image from "next/image";
import React from "react";

const GetItOnPlayStore = () => {
  return (
    <div className="bg-black text-white flex gap-x-3 border overflow-hidden px-4 py-1 cursor-pointer items-center rounded-md">
      <Image src="/icons/PlayStore.svg" alt="playstore" width={21} height={24} className="w-[21px]" />
      <div>
        <p>Get It On</p>
        <h6 className="text-lg font-bold leading-snug">PlayStore</h6>
      </div>
    </div>
  );
};

export default GetItOnPlayStore;
