import crypto from "crypto";

export function encrypt(data: string, secret_key: string) {
  try {
    const ECNRYPTION_METHOD = process.env.NEXT_PUBLIC_ECNRYPTION_METHOD;
    if (!ECNRYPTION_METHOD) return null;
    const key = crypto.createHash("sha512").update(secret_key).digest("hex").substring(0, 32);
    const encryptionIV = crypto.createHash("sha512").update(secret_key).digest("hex").substring(0, 16);
    const cipher = crypto.createCipheriv(ECNRYPTION_METHOD, key, encryptionIV);
    return Buffer.from(cipher.update(data, "utf8", "hex") + cipher.final("hex")).toString("base64");
  } catch (error) {
    console.log("ERROR_ENCRUPT_FUNCTION", error);
  }
}

export function decrypt(encryptedData: string | null | undefined, masterPassword: string) {
  try {
    const ECNRYPTION_METHOD = process.env.NEXT_PUBLIC_ECNRYPTION_METHOD;
    if (!ECNRYPTION_METHOD || !encryptedData) return null;

    const key = crypto.createHash("sha512").update(masterPassword).digest("hex").substring(0, 32);
    const encryptionIV = crypto.createHash("sha512").update(masterPassword).digest("hex").substring(0, 16);

    const buff = Buffer.from(encryptedData, "base64");
    const decipher = crypto.createDecipheriv(ECNRYPTION_METHOD, key, encryptionIV);
    return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
  } catch (error) {
    console.log("ERROR_DECRYPT_FUNCTION ", error);
    return null;
  }
}
