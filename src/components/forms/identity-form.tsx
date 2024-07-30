import { AllVariantsWithCustomFieldType, UserDataType } from "@/types";
import { Category } from "@prisma/client";
import React, { FC } from "react";

const IdentityForm: FC<{
  formState: string;
  initialValues: AllVariantsWithCustomFieldType | null;
  userInfo: UserDataType;
}> = ({ userInfo, formState, initialValues }) => {
  return <div>IdentityForm</div>;
};

export default IdentityForm;
