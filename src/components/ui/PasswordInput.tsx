// src/components/ui/PasswordInput.tsx
"use client";

import { useState, type InputHTMLAttributes } from "react";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: string;
  label?: string;
}

function EyeIcon({ show }: { show: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export default function PasswordInput({
  error,
  label,
  placeholder,
  style,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ marginBottom: error ? 6 : 16 }}>
      {label && (
        <label style={{ display: "block", color: "#a8a8a8", fontSize: 12, marginBottom: 6 }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          backgroundColor: "#2a2a2a",
          borderRadius: 12,
          border: error ? "1.5px solid #ed4956" : "1.5px solid #3a3a3a",
          transition: "border-color 0.2s",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = error ? "#ed4956" : "#555";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = error ? "#ed4956" : "#3a3a3a";
        }}
      >
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontSize: 15,
            padding: "16px 52px 16px 18px",
            boxSizing: "border-box",
            fontFamily: "inherit",
            ...style,
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#a8a8a8",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <EyeIcon show={showPassword} />
        </button>
      </div>
      {error && (
        <p role="alert" style={{ color: "#ed4956", fontSize: 12, marginTop: 5, marginLeft: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}