import { Card, Category, CustomField, Password, Note, Settings, User, Identity } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type PasswordWithFieldsType = Password & { customFields: CustomField[] };
export type CardWithFieldsType = Card & { customFields: CustomField[] };
export type IdentityWithFieldsType = Identity & { customFields: CustomField[] };
export type NoteWithFieldsType = Note & { customFields: CustomField[] };

export type UserDataType = User & {
  settings: Settings | null;
  passwords: PasswordWithFieldsType[];
  cards: CardWithFieldsType[];
  identities: IdentityWithFieldsType[];
  notes: NoteWithFieldsType[];
  categories: Category[];
};

export type AllVariantsWithCustomFieldType = PasswordWithFieldsType | CardWithFieldsType | IdentityWithFieldsType | NoteWithFieldsType;

export type ModulesVariantTypes = "passwords" | "cards" | "notes" | "identities";

export type ModuleSidebarLinks = {
  title: string;
  label: string;
  link: string;
  icon: LucideIcon;
};
