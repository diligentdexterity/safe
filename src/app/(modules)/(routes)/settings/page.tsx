import getSettings from "@/actions/getSettings";
import { auth } from "@/auth";
import SettingForm from "@/components/forms/setting-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const ModulesSettings = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/auth");

  const settings = await getSettings(session.user.email);

  return (
    <div className="p-5 m-5 w-[60%] overflow-hidden space-y-10 mx-auto">
      <h4 className="text-xl font-bold">Settings</h4>
      <div className="space-y-5">
        <div className="flex justify-between items-center h-fit pl-5 bg-primary/15 rounded-xl hover:bg-primary/20 cursor-pointer">
          <div>
            <h6 className="font-bold text-lg">{session.user.name}</h6>
            <p>{session.user?.email}</p>
          </div>

          <Image src={session?.user?.image || "/images/avatar.svg"} alt="default avatar" width={128} height={128} className="h-20 w-20 rounded-xl" />
        </div>
        <SettingForm initialValues={settings} session={session} />
      </div>
    </div>
  );
};

export default ModulesSettings;
