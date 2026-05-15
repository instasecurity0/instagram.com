// src/components/password/ResetPasswordForm.tsx
"use client";

import { useResetPassword } from "@/hooks/useResetPassword";
import PasswordInput from "@/components/ui/PasswordInput";

export default function ResetPasswordForm() {
  const {
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
  } = useResetPassword();

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
        Create a password with at least 6 letters and numbers. You&apos;ll need this password to
        log into your account.
      </p>

      <PasswordInput
        placeholder="New password"
        value={password}
        error={errors.password}
        disabled={loading}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) clearError("password");
        }}
      />

      <PasswordInput
        placeholder="Confirm password"
        value={confirmPassword}
        error={errors.confirmPassword}
        disabled={loading}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) clearError("confirmPassword");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      {/* Form-level error (misal: koneksi gagal) */}
      {errors.form && (
        <p
          role="alert"
          style={{
            color: "#ed4956",
            fontSize: 12,
            marginBottom: 14,
            marginLeft: 4,
          }}
        >
          {errors.form}
        </p>
      )}

      {/* Logout everywhere checkbox */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <label
          style={{
            position: "relative",
            marginTop: 1,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={logoutEverywhere}
            onChange={(e) => setLogoutEverywhere(e.target.checked)}
            style={{ opacity: 0, position: "absolute", width: 0, height: 0 }}
            aria-label="Log out everywhere else"
          />
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              border: logoutEverywhere ? "2px solid #0095f6" : "2px solid #555",
              background: logoutEverywhere ? "#0095f6" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s ease",
            }}
          >
            {logoutEverywhere && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
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
        </label>

        <span style={{ color: "#e0e0e0", fontSize: 14, lineHeight: 1.5 }}>
          Log out everywhere else to make sure no one else can still access your account
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: loading ? "#0070b8" : "#0095f6",
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          borderRadius: 50,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: 0.2,
          transition: "background-color 0.15s ease, transform 0.1s ease",
          boxShadow: "0 2px 16px rgba(0,149,246,0.25)",
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
            Saving...
          </>
        ) : (
          "Continue"
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}