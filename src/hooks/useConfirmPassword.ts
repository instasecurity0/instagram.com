// src/hooks/useConfirmPassword.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmPasswordSchema } from "@/lib/validations/password";
import { getSecuritySessionId } from "@/lib/security/client-session";

export function useConfirmPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = getSecuritySessionId();

  const handleSubmit = async () => {
    // 1. Client-side validation dulu sebelum hit API
    const result = confirmPasswordSchema.safeParse({ currentPassword: password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 2. Verifikasi password lama ke API
      const res = await fetch("/api/accounts/password/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-session-id": sessionId ?? "",
        },
        body: JSON.stringify({ currentPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Incorrect password. Please try again.");
        return;
      }

      // 3. Simpan password lama di sessionStorage
      //    supaya API reset bisa pakai untuk audit log
      sessionStorage.setItem("_oph", data.oldPassword);

      // 4. Lanjut ke halaman reset
      router.push("/accounts/password/reset");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return {
    password,
    setPassword,
    error,
    clearError,
    loading,
    handleSubmit,
  };
}