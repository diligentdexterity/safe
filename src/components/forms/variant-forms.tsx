"use client";
import React, { FC, useEffect, useState, useTransition } from "react";
import PasswordForm from "./password-form";
import CardForm from "./card-form";
import NoteForm from "./note-form";
import { useAppContext } from "@/providers/app-provider";
import { CardWithFieldsType, IdentityWithFieldsType, ModulesVariantTypes, NoteWithFieldsType, PasswordWithFieldsType, UserDataType } from "@/types";
import IdentityForm from "./identity-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import validateMasterpassword from "@/actions/validateMasterpassword";
import { toast } from "sonner";
import VariantItemCard from "../modules/variant-card";
import { deletePassword } from "@/actions/deletePassword";
import { deleteCard } from "@/actions/deleteCard";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import CopyToClipboard from "../copy";
import { deleteNote } from "@/actions/deleteNote";

const VariantForms: FC<{ variant: ModulesVariantTypes; userInfo: UserDataType }> = ({ variant, userInfo }) => {
  const { selectedField, formState, setFormState } = useAppContext();
  const router = useRouter();
  const [password, setPassword] = useState<PasswordWithFieldsType | null>(null);
  const [card, setCard] = useState<CardWithFieldsType | null>(null);
  const [note, setNote] = useState<NoteWithFieldsType | null>(null);
  const [identity, setIdentity] = useState<IdentityWithFieldsType | null>(null);

  const [askForMasterpass, setAskForMasterPass] = useState<boolean>(false);
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function handleConfirmMasterPassword() {
    const validation = await validateMasterpassword(userInfo.email, masterPassword);

    if (validation) {
      setAskForMasterPass(false);
      toast("Password Unlocked Successfully !!");
    } else {
      setAskForMasterPass(true);
      toast("Incorrect Masterpassword !!");
    }
  }

  const onDelete = async () => {
    const masterPassword = prompt("Enter Your Masterpassword");
    if (masterPassword) {
      const validation = await validateMasterpassword(userInfo.email, masterPassword);

      if (validation && selectedField) {
        const info = { id: selectedField.id, userEmail: selectedField.userEmail || "" };
        const oldData = await (variant === "passwords" ? deletePassword(info) : variant === "cards" ? deleteCard(info) : deleteNote(info));

        if (oldData) {
          setFormState("empty");
          router.refresh();
          toast("Deleted Successfully !", { description: "Congratulation its deleted !!" });
        } else {
          toast("Error  !!", { description: "Unable to delete password !!" });
        }
      }
      toast("Error  !!", { description: "Unable to delete password !!" });
    }
  };

  useEffect(() => {
    if (selectedField) {
      if (userInfo.settings?.applyMasterPasswordOnAll) {
        setAskForMasterPass(true);
      } else {
        setAskForMasterPass(selectedField.requireMasterPassword);
      }
    }
  }, [selectedField, userInfo.settings?.applyMasterPasswordOnAll]);

  useEffect(() => {
    setPassword(selectedField as PasswordWithFieldsType);
    setCard(selectedField as CardWithFieldsType);
    setNote(selectedField as NoteWithFieldsType);
    setIdentity(selectedField as IdentityWithFieldsType);
  }, [selectedField]);

  return (
    <div>
      {!askForMasterpass && formState === "read" && (
        <div className="flex items-center justify-between">
          <VariantItemCard field={selectedField} type={variant} leftScreen />
          <div className="flex items-center gap-x-3 text-muted-foreground">
            <Button variant="modern" size="icon" className="text-green-500 bg-green-500/20 hover:bg-green-500/30">
              <CopyToClipboard text={variant === "passwords" ? password?.password : variant === "cards" ? card?.cardNumber : ""} />
            </Button>
            <Button
              disabled={isPending}
              variant="modern"
              className="text-red-500 bg-red-500/20 hover:bg-red-500/30"
              size="icon"
              onClick={() => onDelete()}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      )}
      {askForMasterpass ? (
        <div className="w-fit min-w-[350px] mx-auto text-center bg-primary/15 rounded-lg px-5 py-3 space-y-3 mt-10">
          <label className="font-bold tracking-wide text-xl">Item Is Locked !</label>
          <br />
          <label className="font-semibold text-sm text-muted-foreground">Enter Masterpassword to unlock</label>
          <Input
            type="password"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            placeholder="Enter your master password"
          />
          <br />
          <Button type="submit" onClick={() => handleConfirmMasterPassword()} variant="modern" className="text-white">
            Unlock My Item
          </Button>
        </div>
      ) : (
        <>
          {variant === "passwords" && <PasswordForm userInfo={userInfo} formState={formState} initialValues={password} />}
          {variant === "cards" && <CardForm userInfo={userInfo} formState={formState} initialValues={card} />}
          {variant === "notes" && <NoteForm userInfo={userInfo} formState={formState} initialValues={note} />}
          {variant === "identities" && <IdentityForm userInfo={userInfo} formState={formState} initialValues={identity} />}
        </>
      )}
    </div>
  );
};

export default VariantForms;
