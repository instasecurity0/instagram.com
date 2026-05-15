// src/lib/validations/password.ts
import { z } from "zod";

export const confirmPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Please enter your current password.")
    .min(6, "Password must be at least 6 characters."),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Schema untuk API route — terima hash dari client
export const resetApiSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
  logoutEverywhere: z.boolean().optional().default(false),
});

export type ConfirmPasswordInput = z.infer<typeof confirmPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ResetApiInput = z.infer<typeof resetApiSchema>;