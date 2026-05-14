"use client";

import { useState } from "react";
import { resetPasswordSchema } from "@/lib/validations/password";
import PasswordInput from "@/components/ui/PasswordInput";
import PasswordSuccessView from "@/components/password/PasswordSuccessView";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutEverywhere, setLogoutEverywhere] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const result = resetPasswordSchema.safeParse({
      password,
      confirmPassword,
      logoutEverywhere,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PasswordSuccessView
        title="Password updated!"
        description="Your password has been reset successfully. You can now log in with your new password."
      />
    );
  }

  return (
    <>
      <h1
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 10,
          lineHeight: 1.3,
        }}
      >
        Reset your password
      </h1>
      <p
        style={{
          color: "#a8a8a8",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 28,
          maxWidth: 440,
        }}
      >
        Create a password with at least 6 letters and numbers. You&apos;ll need this password to log
        into your account.
      </p>

      <PasswordInput
        placeholder="New password"
        value={password}
        error={errors.password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
      />

      <PasswordInput
        placeholder="Confirm password"
        value={confirmPassword}
        error={errors.confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
      />

      {/* Logout everywhere checkbox */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        <div style={{ position: "relative", marginTop: 1, flexShrink: 0 }}>
          <input
            type="checkbox"
            checked={logoutEverywhere}
            onChange={(e) => setLogoutEverywhere(e.target.checked)}
            style={{ opacity: 0, position: "absolute", width: 0, height: 0 }}
            aria-label="Log out everywhere else"
          />
          <div
            role="checkbox"
            aria-checked={logoutEverywhere}
            onClick={() => setLogoutEverywhere((prev) => !prev)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              border: logoutEverywhere ? "2px solid #1877F2" : "2px solid #555",
              background: logoutEverywhere ? "#1877F2" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s ease",
              cursor: "pointer",
            }}
          >
            {logoutEverywhere && (
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <polyline
                  points="2,6 5,9 10,3"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span style={{ color: "#e0e0e0", fontSize: 14, lineHeight: 1.5 }}>
          Log out everywhere else to make sure no one else can still access your account
        </span>
      </label>

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#1877F2",
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          borderRadius: 50,
          cursor: "pointer",
          letterSpacing: 0.2,
          transition: "background-color 0.15s ease, transform 0.1s ease",
          boxShadow: "0 2px 16px rgba(0,149,246,0.25)",
        }}
        onMouseEnter={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#1aa3ff";
          btn.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#1877F2";
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