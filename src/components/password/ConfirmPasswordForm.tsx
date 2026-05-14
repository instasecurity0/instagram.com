"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmPasswordSchema } from "@/lib/validations/password";
import PasswordInput from "@/components/ui/PasswordInput";

export default function ConfirmPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = confirmPasswordSchema.safeParse({ currentPassword: password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    // 2. CEK KE BACKEND (Contoh kalau nanti udah nyambung API)
    /*
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    
    if (!response.ok) {
      setError("Incorrect password. Please try again.");
      return;
    }
    */

    router.push("/accounts/password/reset/");
  };

  return (
    <>
      <h1
        style={{
          color: "#fff",
          fontSize: 21,
          fontWeight: 700,
          marginBottom: 9,
          lineHeight: 1.3,
        }}
      >
        Confirm your password
      </h1>
      <p
        style={{
          color: "#a8a8a8",
          fontSize: 13.5,
          lineHeight: 1.6,
          marginBottom: 26,
          maxWidth: 430,
        }}
      >
        To continue, please enter your current password to verify it&apos;s you.
      </p>

      <PasswordInput
        placeholder="Current password"
        value={password}
        error={error}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
      />

      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          display: "inline-block",
          color: "#0095f6",
          fontSize: 13,
          textDecoration: "none",
          marginBottom: 22,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#1aa3ff")}
        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#0095f6")}
      >
        Forgot your password?
      </a>

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#1877F2",
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 600,
          border: "none",
          borderRadius: 50,
          cursor: "pointer",
          letterSpacing: 0.15,
          transition: "background-color 0.15s, transform 0.1s",
          boxShadow: "0 2px 14px rgba(0,149,246,0.22)",
        }}
        onMouseEnter={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#1aa3ff";
          btn.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#0095f6";
          btn.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(0.98)")}
        onMouseUp={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1.01)")}
      >
        Continue
      </button>
    </>
  );
}