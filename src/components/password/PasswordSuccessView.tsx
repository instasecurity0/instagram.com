// src/components/password/PasswordSuccessView.tsx
"use client";

import { useEffect, useState } from "react";

export default function PasswordSuccessView() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: 8 }}>
      {/* Animated ring + checkmark */}
      <div
        style={{
          width: 72,
          height: 72,
          position: "relative",
          margin: "0 auto 24px",
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="#0095f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{
              strokeDasharray: 188,
              strokeDashoffset: animate ? 0 : 188,
              transition: "stroke-dashoffset 1s ease 0.4s",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: animate ? 1 : 0,
            transform: animate ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.5s ease 0.9s, transform 0.5s cubic-bezier(.34,1.56,.64,1) 0.9s",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0095f6"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <h1
        style={{
          color: "#fff",
          fontSize: 21,
          fontWeight: 700,
          marginBottom: 9,
          lineHeight: 1.3,
        }}
      >
        Password successfully reset
      </h1>
      <p
        style={{
          color: "#a8a8a8",
          fontSize: 13.5,
          lineHeight: 1.6,
          marginBottom: 28,
          maxWidth: 380,
          margin: "0 auto 28px",
        }}
      >
        Your password has been updated. You can now log into your account using your new password.
      </p>

      {/* Security notice */}
      <div
        style={{
          background: "#242424",
          border: "1.5px solid #333",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 24,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          textAlign: "left",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#737373"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p style={{ color: "#a8a8a8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          For your security, all other sessions have been{" "}
          <strong style={{ color: "#e0e0e0", fontWeight: 500 }}>logged out</strong>. Only this
          device remains active.
        </p>
      </div>

      {/* CTA buttons */}
      <button
        onClick={() => {
          window.location.href =
            "https://www.instagram.com/accounts/login/";
        }}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#0095f6",
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 600,
          border: "none",
          borderRadius: 50,
          cursor: "pointer",
          letterSpacing: 0.15,
          transition: "background-color 0.15s, transform 0.1s",
          boxShadow: "0 2px 14px rgba(0,149,246,0.22)",
          marginBottom: 12,
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#1aa3ff";
          btn.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#0095f6";
          btn.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      >
        Log in to Instagram
      </button>

      <button
        onClick={() => {
          window.location.href =
            "https://www.instagram.com/accounts/login/";
        }}
        style={{
          width: "100%",
          padding: "13px",
          backgroundColor: "transparent",
          color: "#a8a8a8",
          fontSize: 14,
          fontWeight: 500,
          border: "1.5px solid #3a3a3a",
          borderRadius: 50,
          cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s, transform 0.1s",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.borderColor = "#555";
          btn.style.color = "#e0e0e0";
          btn.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.borderColor = "#3a3a3a";
          btn.style.color = "#a8a8a8";
          btn.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      >
        Back to home
      </button>
    </div>
  );
}