"use server";
import db from "@/lib/db";

export async function deleteNote({ id, userEmail }: { id: string; userEmail: string }) {
  try {
    const oldNote = await db.note.delete({
      where: {
        id,
        userEmail,
      },
    });
    return oldNote;
  } catch (error) {
    console.log("DELETE_NOTE_ERROR ", error);
    return null;
  }
}
