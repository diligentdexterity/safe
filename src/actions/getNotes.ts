import db from "@/lib/db";
import { decrypt } from "@/lib/encryption";
import { Note } from "@prisma/client";

export default async function getNotes(email: string, masterPassword: string): Promise<Note[] | null> {
  try {
    if (!email) {
      console.log("getNotes-Invalid_Email");
      return null;
    }

    const notes: Note[] | null = await db.note.findMany({
      where: {
        userEmail: email,
      },
      include: {
        category: true,
        customFields: true,
      },
    });

    if (notes) {
      let decryptedNote: Note[] = [];
      notes.map((note) => {
        decryptedNote.push({
          ...note,
          note: decrypt(note.note, masterPassword) || "",
        });
      });
      return decryptedNote;
    }

    return null;
  } catch (error) {
    console.log("GET_NOTES_ERROR = ", error);
    return null;
  }
}
