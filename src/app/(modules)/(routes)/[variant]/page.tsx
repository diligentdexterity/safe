import React, { FC } from "react";
import VariantMainPage from "./_components/variant-main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getUserData from "@/actions/getUserData";
import { Loader } from "lucide-react";
import { ModulesVariantTypes } from "@/types";

type props = {
  params: {
    variant: ModulesVariantTypes;
  };
};

const ModulesVariantPage: FC<props> = async ({ params: parms }) => {
  const { variant } = parms;
  const session = await auth();

  if (!session) redirect("/auth");

  const userInfo = await getUserData(session);

  return (
    <>
      {userInfo ? (
        <VariantMainPage userInfo={userInfo} type={variant} />
      ) : (
        <div className="w-full  min-h-screen flex items-center justify-center">
          <Loader className="animate-spin" size={30} />
        </div>
      )}
    </>
  );
};

export default ModulesVariantPage;
