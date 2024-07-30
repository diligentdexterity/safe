"use server";
import db from "@/lib/db";

export async function deleteCard({ id, userEmail }: { id: string; userEmail: string }) {
  try {
    const oldCard = await db.card.delete({
      where: {
        id,
        userEmail,
      },
    });
    return oldCard;
  } catch (error) {
    console.log("DELETE_PASSWORD_ERROR ", error);
    return null;
  }
}
