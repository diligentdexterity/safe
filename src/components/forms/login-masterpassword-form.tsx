"use client";
import createUser from "@/actions/createUser";
import validateMasterpassword from "@/actions/validateMasterpassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { removeRequestMeta } from "next/dist/server/request-meta";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";

const MasterPasswordLoginForm: FC<{ session: Session }> = ({ session }) => {
  const { update } = useSession();
  const [activate, setActivate] = useState(false);
  const [masterPassword, setMasterpassword] = useState<string>("");

  useEffect(() => {
    if (!session.user.masterPassword) {
      setActivate(true);
    }
  }, [session]);

  if (!activate) return <></>;

  async function handleConfirmMasterPassword() {
    const validation = await validateMasterpassword(session.user.email, masterPassword);

    if (validation) {
      await update({ ...session, user: { ...session.user, masterPassword, logInTime: Date.now() } });
      toast("Vault Opned Successfully !!");
      window.location.reload();
    } else {
      toast("Incorrect Masterpassword !!");
    }

    update();
  }

  return (
    <div className="bg-blue-500 background">
      <div className="backdrop-blur-3xl w-full bg-black/70 h-screen flex items-center justify-center">
        <div className="w-[90%] lg:w-[30%] bg-white/10 px-10 py-12 rounded-lg my-auto flex-col flex">
          <div className="flex flex-col items-center justify-center mb-10">
            <Image src={session.user?.image || "/images/avatar.svg"} alt="user avatar" width={100} height={100} className="rounded-full mb-3" />
            <h3 className="text-xl font-bold">{session.user?.name}</h3>
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">{session.user?.email}</p>
          </div>

          <label className="font-semibold tracking-wide mt-5 mb-2">Masterpassword</label>
          <Input value={masterPassword} onChange={(e) => setMasterpassword(e.target.value)} placeholder="Enter your master password" />
          <Button type="submit" onClick={() => handleConfirmMasterPassword()} variant="modern" className="text-white mt-10">
            Open My Vault
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MasterPasswordLoginForm;
