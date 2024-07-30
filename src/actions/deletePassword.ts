"use server";
import db from "@/lib/db";

export async function deletePassword({ id, userEmail }: { id: string; userEmail: string }) {
  try {
    const oldPassword = await db.password.delete({
      where: {
        id,
        userEmail,
      },
    });
    return oldPassword;
  } catch (error) {
    console.log("DELETE_PASSWORD_ERROR ", error);
    return null;
  }
}
