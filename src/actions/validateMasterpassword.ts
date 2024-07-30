"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export default async function validateMasterpassword(email: string | undefined | null, password: string): Promise<boolean> {
  try {
    if (!email) {
      return false;
    }
    const user = await db.user.findUnique({ where: { email }, select: { masterPassword: true } });
    if (!user) {
      return false;
    }
    const validate = await bcrypt.compare(password, user.masterPassword);
    return validate;
  } catch (error) {
    console.log("ERROR_VALIDATEMASTERPASSWORD");
    return false;
  }
}
