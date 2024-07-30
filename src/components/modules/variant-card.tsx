"use client";
import { useAppContext } from "@/providers/app-provider";
import React, { FC } from "react";
import AppIcon from "../app-icon";
import { AllVariantsWithCustomFieldType, CardWithFieldsType, PasswordWithFieldsType } from "@/types";
import Error from "../error";
import { cn } from "@/lib/utils";

const VariantItemCard: FC<{ field: AllVariantsWithCustomFieldType | null; type: string; leftScreen?: boolean }> = ({
  field,
  type,
  leftScreen = false,
}) => {
  const { setSelectedField, selectedField } = useAppContext();
  const isPass = type === "passwords" && (field as PasswordWithFieldsType);
  const isCard = type === "cards" && (field as CardWithFieldsType);

  if (!field) return <Error />;

  return (
    <div
      onClick={() => setSelectedField(field)}
      className={cn(
        "flex items-center h-24 px-5  w-full rounded-xl group cursor-pointer gap-x-5 backdrop:blur-lg overflow-hidden",
        !leftScreen && "hover:bg-primary/20 opacity-90 border-b bg-primary/10",
        !leftScreen && selectedField?.id === field.id && "bg-primary/40 opacity-85"
      )}
    >
      <AppIcon url={isPass ? isPass.website : isCard ? isCard.brand : field.label} />
      <div>
        <div>
          <h5 className={cn("font-semibold text-nowrap", leftScreen && "text-xl")}>{field.label}</h5>
          <p className="text-sm font-medium text-muted-foreground text-nowrap">{isPass ? isPass.website : isCard ? isCard.brand : field.label}</p>
        </div>

        {isPass && <p className="text-nowrap text-gray-200">{isPass.userName}</p>}
      </div>
    </div>
  );
};

export default VariantItemCard;
