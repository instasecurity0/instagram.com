// src/lib/validations/password.ts
import { z } from "zod"

export const confirmPasswordSchema = z.object({
  currentPassword: z.string().min(6, "Please enter your current password."),
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

export type ConfirmPasswordInput = z.infer<typeof confirmPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>