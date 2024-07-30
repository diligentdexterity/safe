import db from "@/lib/db";
import { Settings } from "@prisma/client";

export default async function getSettings(email: string): Promise<Settings | null> {
  try {
    if (!email) {
      console.log("getSetting-Invalid_Email");
      return null;
    }

    const setting = await db.settings.findFirst({
      where: {
        userEmail: email,
      },
    });

    return setting;
  } catch (error) {
    console.log("GET_SETTINGS_ERROR = ", error);
    return null;
  }
}
