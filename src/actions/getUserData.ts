/**
 * @file getUserData.ts
 * @description Retrieves all user information and data from database at once
 *                  ( all variants, categories, settings )
 * @usage Used in modules layout (server)  -  [ @/(modules)/layout.tsx ]
 */

import db from "@/lib/db";
import { UserDataType } from "@/types";
import { Session } from "next-auth";

export default async function getUserData(session: Session): Promise<UserDataType | null> {
  try {
    if (!session) {
      console.log("getUserData-Invalid_Session");
      return null;
    }
    if (!session.user) {
      console.log("getUserData-Invalid_User");
      return null;
    }
    if (!session.user.email) {
      console.log("getUserData-Invalid_Email");
      return null;
    }

    const userData: UserDataType | null = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        settings: true,
        categories: true,
        identities: {
          include: {
            customFields: true,
          },
        },
        cards: {
          include: {
            customFields: true,
          },
        },
        passwords: {
          include: {
            customFields: true,
          },
        },

        notes: {
          include: {
            customFields: true,
          },
        },
      },
    });

    return userData;
  } catch (error) {
    console.log("GET_USER_ERROR = ", error);
    return null;
  }
}
