"use server";
import { signOut } from "@/auth";

export async function handleSignOut() {
  try {
    await signOut();
    return true;
  } catch {
    return false;
  }
}
