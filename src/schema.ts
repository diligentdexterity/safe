import { z } from "zod";

export const PasswordSchema = z.object({
  label: z.string().min(0),
  userName: z.string().min(1),
  password: z.string().min(1),
  categoryId: z.string().min(1),
  website: z.string().optional(),
  note: z.string().optional(),
  totpKey: z.string().optional(),
  requireMasterPassword: z.boolean(),
});

export const NoteSchema = z.object({
  label: z.string().min(0),
  note: z.string().min(1),
  categoryId: z.string().optional(),
  requireMasterPassword: z.boolean(),
});

export const SettingSchema = z.object({
  applyMasterPasswordOnAll: z.boolean(),
  showWebsiteIcon: z.boolean(),
  vaultTimeOut: z.number(),
});

export const CardSchema = z.object({
  label: z.string().min(1),
  categoryId: z.string().min(1),
  holderName: z.string().min(1),
  brand: z.string().min(1),
  cardNumber: z.string().min(1),
  expirationMonth: z.string().min(1),
  expirationYear: z.string().min(1),
  cvv: z.string().min(1),
  note: z.string().optional(),
  requireMasterPassword: z.boolean(),
});
