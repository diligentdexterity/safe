"use client";
import { Eye, Plus } from "lucide-react";
import React, { FC, useEffect } from "react";
import { useAppContext } from "@/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils";
import VariantForms from "@/components/forms/variant-forms";
import { ModulesVariantTypes, UserDataType } from "@/types";

const VariantLeftScreen: FC<{
  userInfo: UserDataType;
  variant: ModulesVariantTypes;
}> = ({ userInfo, variant }) => {
  const emptyMsgTitle = `Select ${capitalizeFirstLetter(variant)}`;
  const emptyMsgDesc = `Select any ${variant} to see its info`;
  const addBtnMsg = `Add New ${capitalizeFirstLetter(variant)}`;

  const { selectedField, formState, setFormState } = useAppContext();

  useEffect(() => {
    if (!selectedField) {
      setFormState("empty");
    }
  }, [selectedField, setFormState]);

  return (
    <div className="w-[65%] px-10 py-5">
      {formState !== "empty" && (
        <div>
          <VariantForms userInfo={userInfo} variant={variant} />
        </div>
      )}
      {formState === "empty" && (
        <div className="flex items-center justify-center h-full">
          <div className="bg-primary/10 px-14 text-center py-10 rounded-lg flex flex-col items-center justify-center space-y-5">
            <div>
              <h5 className="text-2xl font-bold tracking-wide">{emptyMsgTitle}</h5>
              <p className="font-medium text-muted-foreground flex items-center gap-x-2">
                {emptyMsgDesc} <Eye />
              </p>
            </div>

            <div className="flex items-center justify-center gap-x-5">
              <Separator />
              <h6 className="font-semibold text-muted-foreground">OR</h6>
              <Separator />
            </div>
            <Button className="gap-x-5" onClick={() => setFormState("new")}>
              {addBtnMsg} <Plus size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantLeftScreen;
