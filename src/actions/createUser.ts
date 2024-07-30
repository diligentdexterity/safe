"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { Session } from "next-auth";

export default async function createUser(masterPassword: string, session: Session) {
  try {
    if (!session.user) {
      console.log("CREATE_USER_NO_USER");
      return null;
    }
    if (!session.user.email) {
      console.log("CREATE_USER_NO_EMAIL");
      return null;
    }
    if (!session.user.name) {
      console.log("CREATE_USER_NO_NAME");
      return null;
    }

    const hashedPassword = await bcrypt.hash(masterPassword, 12);

    const newUser = await db.user.create({
      data: {
        id: session.user.id,
        email: session.user.email,
        masterPassword: hashedPassword,
        name: session.user.name,
      },
    });

    return newUser;
  } catch (error) {
    console.log("CREATEUSER_ERROR ", error);
    return null;
  }
}
