// src/hooks/useResetPassword.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/lib/validations/password";
import { getSecuritySessionId } from "@/lib/security/client-session";

export function useResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutEverywhere, setLogoutEverywhere] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const sessionId = getSecuritySessionId();

  const handleSubmit = async () => {
    // 1. Client-side validation
    const result = resetPasswordSchema.safeParse({
      newPassword: password,
      confirmPassword,
    });
    

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        let field = issue.path[0] as string;
        if (field === "newPassword") field = "password";
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // 2. Ambil password lama dari sessionStorage (disimpan saat confirm step)
      const oldPassword = sessionStorage.getItem("_oph") ?? "";

      // 3. Kirim ke API reset
      const res = await fetch("/api/accounts/password/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId ?? "",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword: password,
          confirmPassword,
          logoutEverywhere,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
        return;
      }

      // 4. Bersihkan sessionStorage setelah berhasil
      sessionStorage.removeItem("_oph");

      // 5. Redirect ke halaman sukses
      router.push("/accounts/password/reset/success");
    } catch {
      setErrors({ form: "Connection error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: keyof typeof errors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    logoutEverywhere,
    setLogoutEverywhere,
    errors,
    clearError,
    loading,
    handleSubmit,
  };
}