"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { PasswordSchema } from "@/schema";
import * as z from "zod";
import { encrypt } from "@/lib/encryption";
import { Session } from "next-auth";

export default async function createPassword(values: z.infer<typeof PasswordSchema>, passwordId: string, session: Session | null) {
  const validatedFields = PasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  if (!session) return null;
  if (!session.user.email) return null;

  try {
    const { categoryId, totpKey, note, label, password, requireMasterPassword, userName, website } = values;

    const encryptionKey = session.user.masterPassword;

    const encryptedPassword = encrypt(password, encryptionKey);
    const encryptedNote = note ? encrypt(note, encryptionKey) : null;
    const encryptedTotpKey = totpKey ? encrypt(totpKey, encryptionKey) : null;

    const newPassword = await db.password.upsert({
      where: {
        id: passwordId,
      },
      create: {
        label,
        password: JSON.stringify(encryptedPassword),
        userName,
        website,
        categoryId: categoryId === "-" ? null : categoryId,
        requireMasterPassword,
        userEmail: session.user.email,
        note: encryptedNote ? JSON.stringify(encryptedNote) : null,
        totpKey: encryptedTotpKey ? JSON.stringify(encryptedTotpKey) : null,
      },
      update: {
        label,
        password: JSON.stringify(encryptedPassword),
        userName,
        website,
        categoryId: categoryId === "-" ? null : categoryId,
        note: encryptedNote ? JSON.stringify(encryptedNote) : null,
        requireMasterPassword,
        userEmail: session.user.email,
        totpKey: encryptedTotpKey ? JSON.stringify(encryptedTotpKey) : null,
      },
    });
    return newPassword;
  } catch (error) {
    console.log("CREATE_PASSWORD_ERROR ", error);
    return null;
  }
}
