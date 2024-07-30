"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { NoteSchema } from "@/schema";
import * as z from "zod";
import { encrypt } from "@/lib/encryption";
import { Session } from "next-auth";

export default async function createNote(values: z.infer<typeof NoteSchema>, noteId: string, session: Session | null) {
  const validatedFields = NoteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  if (!session) return null;
  if (!session.user.email) return null;

  try {
    const { categoryId, note, label, requireMasterPassword } = values;

    const encryptionKey = session.user.masterPassword;

    const encryptedNote = encrypt(note, encryptionKey);

    console.log("EMAIL => ", session.user.email);

    const newNote = await db.note.upsert({
      where: {
        id: noteId,
      },
      create: {
        label,
        note: encryptedNote ? JSON.stringify(encryptedNote) : "",
        categoryId: null,
        requireMasterPassword,
        userEmail: session.user.email,
      },
      update: {
        label,
        note: encryptedNote ? JSON.stringify(encryptedNote) : "",
        categoryId: null,
        requireMasterPassword,
        userEmail: session.user.email,
      },
    });
    return newNote;
  } catch (error) {
    console.log("CREATE_NOTE_ERROR ", error);
    return null;
  }
}
