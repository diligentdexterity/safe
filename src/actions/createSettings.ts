"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { SettingSchema } from "@/schema";
import * as z from "zod";
import { Session } from "next-auth";

export default async function createSetting(values: z.infer<typeof SettingSchema>, settingId: string, session: Session | null) {
  const validatedFields = SettingSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  if (!session) return null;
  if (!session.user.email) return null;

  try {
    const { applyMasterPasswordOnAll, showWebsiteIcon, vaultTimeOut } = values;

    const newSetting = await db.settings.upsert({
      where: {
        id: settingId,
      },
      create: {
        applyMasterPasswordOnAll,
        showWebsiteIcon,
        vaultTimeOut,
        userEmail: session.user.email,
      },
      update: {
        applyMasterPasswordOnAll,
        showWebsiteIcon,
        vaultTimeOut,
      },
    });
    return newSetting;
  } catch (error) {
    console.log("CREATE_SETTINGS_ERROR ", error);
    return null;
  }
}
