"use client";
import React, { useEffect } from "react";

import VariantItemCard from "@/components/modules/variant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus } from "lucide-react";
import { ModulesVariantTypes, UserDataType } from "@/types";
import VariantLeftScreen from "./variant-left";
import { useAppContext } from "@/providers/app-provider";
import { capitalizeFirstLetter } from "@/lib/utils";

const VariantMainPage = ({ userInfo, type }: { userInfo: UserDataType; type: ModulesVariantTypes }) => {
  const { setFormState } = useAppContext();

  const inputPlaceholder = `Search your ${type} ...`;
  const emptyMessage = `You haven't created any ${type} yet`;
  const addBtnMsg = `Add New ${capitalizeFirstLetter(type)}`;

  useEffect(() => {
    setFormState("empty");
  }, [setFormState]);

  return (
    <>
      <div className="relative border w-[35%] min-h-screen p-5 space-y-5">
        <div className="gap-x-2 h-[50px] flex items-center">
          <Input className="w-full h-full px-5" placeholder={inputPlaceholder} />
          <Button variant="modern" className="border h-full">
            <Filter className="text-muted-foreground" size={20} />
          </Button>
        </div>
        <div className="w-full space-y-5">
          {userInfo[type]?.length > 0 ? (
            userInfo[type]?.map((field, index) => <VariantItemCard key={field.id + index} field={field} type={type} />)
          ) : (
            <div className="flex flex-col items-center mt-10 space-y-5">
              <p className="font-semibold tracking-wide text-muted-foreground">{emptyMessage}</p>
              <Button onClick={() => setFormState("new")}>{addBtnMsg}</Button>
            </div>
          )}
        </div>
        <div className="absolute bottom-5 right-5">
          <Button className="gap-x-2" onClick={() => setFormState("new")}>
            Add New <Plus size={22} />
          </Button>
        </div>
      </div>

      <VariantLeftScreen variant={type} userInfo={userInfo} />
    </>
  );
};

export default VariantMainPage;
