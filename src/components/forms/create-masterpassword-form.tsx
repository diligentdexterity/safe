"use client";
import createUser from "@/actions/createUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";

// TODO: CODE SO THAT USER CANN'T CREATE WEAK MASTERPASSWORD

const MasterPasswordForm: FC<{ session: Session }> = ({ session }) => {
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [confirmMasterPassword, setConfirmMasterPassword] = useState<string>("");
  const [passStatus, setPassStatus] = useState<boolean>(false);

  useEffect(() => {
    if (masterPassword === confirmMasterPassword) {
      setPassStatus(true);
    } else {
      setPassStatus(false);
    }
  }, [masterPassword, confirmMasterPassword]);

  async function handleConfirmMasterPassword() {
    try {
      if (passStatus) {
        const newUser = await createUser(masterPassword, session);
        if (newUser) {
          toast("Successfull !!", {
            className: "bg-red-500",
            description: "Congratulation, Your account id fully setup !!",
          });
          window.location.reload();
        } else {
          toast("User Not Created !!", {
            description: "Sorry, Having Trouble Creating User",
          });
        }
      }
    } catch {
      toast("Error !!", {
        description: "Sorry, Having Trouble Setting Your Master Password",
      });
      console.log("HANDLE_CONFIRM_MASTER_PASSWORD_ERROR");
    }
  }

  return (
    <div className="bg-blue-500 background">
      <div className="backdrop-blur-3xl w-full bg-black/70 h-screen flex items-center justify-center">
        <div className="w-[90%] lg:w-[30%] bg-white/10 px-10 py-12 rounded-lg my-auto flex-col flex">
          <div className="flex flex-col items-center justify-center mb-10">
            <Image
              src={session.user?.image || "/images/avatar.svg"}
              alt="user avatar"
              width={100}
              height={100}
              className="rounded-full mb-3"
            />
            <h3 className="text-xl font-bold">{session.user?.name}</h3>
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              {session.user?.email}
            </p>
          </div>

          <label className="font-semibold tracking-wide mb-2">New Masterpassword</label>
          <Input
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            placeholder="Enter your master password"
          />
          <label className="font-semibold tracking-wide mt-5 mb-2">Confirm Masterpassword</label>
          <Input
            value={confirmMasterPassword}
            onChange={(e) => setConfirmMasterPassword(e.target.value)}
            placeholder="Confirm your master password"
          />
          <Button
            disabled={!passStatus}
            type="submit"
            onClick={() => handleConfirmMasterPassword()}
            variant="modern"
            className="text-white mt-10"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MasterPasswordForm;
