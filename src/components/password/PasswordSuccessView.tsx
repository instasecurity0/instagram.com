"use client";

import { useEffect, useState } from "react";

interface PasswordSuccessViewProps {
  title?: string;
  description?: string;
  showDetailBox?: boolean;
  primaryLabel?: string;
  ghostLabel?: string;
  onPrimary?: () => void;
  onGhost?: () => void;
}

export default function PasswordSuccessView({
  title = "Password successfully reset",
  description = "Your password has been updated. You can now log into your account using your new password.",
  showDetailBox = true,
  primaryLabel = "Log in to Instagram",
  ghostLabel = "Back to home",
  onPrimary,
  onGhost,
}: PasswordSuccessViewProps) {
  const [ringIn, setRingIn] = useState(false);
  const [checkIn, setCheckIn] = useState(false);

  useEffect(() => {
    const ringTimer = setTimeout(() => setRingIn(true), 400);
    const checkTimer = setTimeout(() => setCheckIn(true), 1000);
    return () => {
      clearTimeout(ringTimer);
      clearTimeout(checkTimer);
    };
  }, []);

  return (
    <div role="status">
      {/* Animated icon — satu SVG tunggal, tidak ada overflow:hidden */}
      <div
        style={{
          width: 72,
          height: 72,
          marginBottom: 24,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ring + glow background dalam satu SVG */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          style={{ position: "absolute", inset: 0 }}
          aria-hidden="true"
        >
          {/* Static dark circle border */}
          <circle cx="36" cy="36" r="34" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
          {/* Radial glow fill */}
          <defs>
            <radialGradient id="iconGlow" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(0,149,246,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="36" cy="36" r="34" fill="url(#iconGlow)" />
          {/* Animated blue ring */}
          <circle
            cx="36"
            cy="36"
            r="34"
            fill="none"
            stroke="#0095f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{
              strokeDasharray: 214,
              strokeDashoffset: ringIn ? 0 : 214,
              transition: "stroke-dashoffset 1s ease",
            }}
          />
        </svg>

        {/* Animated checkmark — di atas SVG, tidak terclip */}
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0095f6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            position: "relative",
            zIndex: 1,
            opacity: checkIn ? 1 : 0,
            transform: checkIn ? "scale(1)" : "scale(0.6)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 style={{ color: "#fff", fontSize: 21, fontWeight: 700, marginBottom: 9, lineHeight: 1.3 }}>
        {title}
      </h1>
      <p style={{ color: "#a8a8a8", fontSize: 13.5, lineHeight: 1.6, marginBottom: 28, maxWidth: 420 }}>
        {description}
      </p>

      {showDetailBox && (
        <div
          style={{
            background: "#242424",
            border: "1.5px solid #333",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
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
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p style={{ fontSize: 13, color: "#a8a8a8", lineHeight: 1.5, margin: 0 }}>
            For security, all other sessions have been{" "}
            <strong style={{ color: "#e0e0e0", fontWeight: 500 }}>logged out</strong>. Only this
            device remains active.
          </p>
        </div>
      )}

      <button
        onClick={onPrimary}
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
          marginBottom: 14,
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1aa3ff";
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0095f6";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      >
        {primaryLabel}
      </button>

      <button
        onClick={onGhost}
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
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#555";
          e.currentTarget.style.color = "#e0e0e0";
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#3a3a3a";
          e.currentTarget.style.color = "#a8a8a8";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      >
        {ghostLabel}
      </button>
    </div>
  );
}