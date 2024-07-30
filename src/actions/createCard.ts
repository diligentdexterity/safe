"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { encrypt } from "@/lib/encryption";
import { CardSchema } from "@/schema";
import { Session } from "next-auth";
import * as z from "zod";

export default async function createCard(values: z.infer<typeof CardSchema>, cardId: string, session: Session) {
  const validatedFields = CardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  if (!session) return null;
  if (!session.user.email) return null;

  try {
    const { label, categoryId, holderName, brand, cardNumber, expirationMonth, expirationYear, cvv, note, requireMasterPassword } = values;

    const encryptionKey = session.user.masterPassword;
    const encryptedCardNumber = encrypt(cardNumber, encryptionKey);
    const encryptedNote = note ? encrypt(note, encryptionKey) : null;
    const encryptedCvv = cvv ? encrypt(cvv, encryptionKey) : null;

    if (!encryptedCardNumber) return null;

    const newUser = await db.card.upsert({
      where: {
        id: cardId,
      },
      create: {
        label,
        categoryId: categoryId === "-" ? undefined : categoryId,
        holderName,
        brand,
        cardNumber: JSON.stringify(encryptedCardNumber),
        expirationMonth,
        expirationYear,
        cvv: JSON.stringify(encryptedCvv),
        note: JSON.stringify(encryptedNote),
        userEmail: session.user.email,
        requireMasterPassword,
      },
      update: {
        label,
        categoryId: categoryId === "-" ? undefined : categoryId,
        holderName,
        brand,
        cardNumber: encryptedCardNumber,
        expirationMonth,
        expirationYear,
        cvv: JSON.stringify(encryptedCvv),
        note: JSON.stringify(encryptedNote),
        userEmail: session.user.email,
        requireMasterPassword,
      },
    });
    return newUser;
  } catch (error) {
    console.log("CREATE_CARD_ERROR ", error);
    return null;
  }
}
