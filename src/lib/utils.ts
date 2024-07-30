import { AllVariantsWithCustomFieldType, CardWithFieldsType, IdentityWithFieldsType, NoteWithFieldsType, PasswordWithFieldsType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getHostName(url: string | null) {
  if (url) {
    // Create a URL object
    const { hostname } = url.includes("http") ? new URL(url) : { hostname: url };

    // Remove 'www.' if present
    const host = hostname.replace(/^www\./, "");

    // Extract the domain name without the top-level domain
    const domainName = host.split(".")[0];
    return capitalizeFirstLetter(domainName);
  } else return "";
}

export function isPassword(obj: AllVariantsWithCustomFieldType): obj is PasswordWithFieldsType {
  return (obj as PasswordWithFieldsType).password !== undefined;
}

export function isCard(obj: AllVariantsWithCustomFieldType): obj is CardWithFieldsType {
  return (obj as CardWithFieldsType).cvv !== undefined;
}

export function isNote(obj: AllVariantsWithCustomFieldType): obj is NoteWithFieldsType {
  return (obj as NoteWithFieldsType).note !== undefined;
}

export function addMinutesToDate(minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
