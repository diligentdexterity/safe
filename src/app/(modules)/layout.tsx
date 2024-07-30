/**
 * @file layout.ts
 * @description Layout for all modules / settings and other features of SAFE
 */

import getUserData from "@/actions/getUserData";
import { auth } from "@/auth";
import ModulesLayoutClient from "./_components/modules-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import MasterPasswordForm from "../../components/forms/create-masterpassword-form";
import MasterPasswordLoginForm from "@/components/forms/login-masterpassword-form";

const ModulesLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await auth();

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  if (!session) {
    redirect("/auth");
  }

  const userData = await getUserData(session);

  if (session && !userData) {
    return <MasterPasswordForm session={session} />;
  }

  if (!session.user.masterPassword) {
    return <MasterPasswordLoginForm session={session} />;
  }

  return (
    <>
      <MasterPasswordLoginForm session={session} />
      <ModulesLayoutClient session={session} defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed}>
        {children}
      </ModulesLayoutClient>
    </>
  );
};

export default ModulesLayout;
