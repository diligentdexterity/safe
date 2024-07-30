import db from "@/lib/db";
import { decrypt } from "@/lib/encryption";
import { Password } from "@prisma/client";

export default async function getPasswords(email: string, masterPassword: string): Promise<Password[] | null> {
  try {
    if (!email) {
      console.log("getUserData-Invalid_Email");
      return null;
    }

    const passwords: Password[] | null = await db.password.findMany({
      where: {
        userEmail: email,
      },
      include: {
        category: true,
        customFields: true,
      },
    });

    if (passwords) {
      let pass: Password[] = [];
      passwords.map((password) => {
        pass.push({
          ...password,
          password: decrypt(password.password, masterPassword) || "",
          totpKey: decrypt(password.totpKey, masterPassword) || "",
          note: decrypt(password.note, masterPassword) || "",
        });
      });
      return pass;
    }

    return null;
  } catch (error) {
    console.log("GET_PASSWORDS_ERROR = ", error);
    return null;
  }
}
