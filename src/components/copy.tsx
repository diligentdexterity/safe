"use client";
import { decrypt } from "@/lib/encryption";
import { Check, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import Error from "./error";

const CopyToClipboard: FC<{ text: string | null | undefined }> = ({ text }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { data } = useSession();

  function copyToClipBoard(text: string | null | undefined) {
    if (!data) {
      return navigator.clipboard.writeText("LOL YOU FOOL !");
    }
    navigator.clipboard
      .writeText(text || "Error Bruh !")
      .then(() => {
        toast("Copied To Clipboard !!");
        setCopied(true);
      })
      .catch(() => {
        toast("Error Can't Copy To Clipboard !!");
      });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div onClick={() => copyToClipBoard(text)} className="hover:bg-muted cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center">
      {copied ? <Check className="animate-in text-green-500" size={30} /> : <Copy className="animate-in" />}
    </div>
  );
};

export default CopyToClipboard;
