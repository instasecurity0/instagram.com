"use client";

interface GradientOverlayProps {
  visible: boolean;
}

export default function GradientOverlay({ visible }: GradientOverlayProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: [
          // Kuning muda — pojok kiri atas, titik awal
          "radial-gradient(ellipse at 0% 0%, rgba(255,223,158,0.04) 0%, transparent 18%)",
          // Oranye — sedikit ke dalam dari pojok
          "radial-gradient(ellipse at 2% 4%, rgba(255,194,115,0.02) 0%, transparent 24%)",
          // Merah-pink — transisi ke tengah
          "radial-gradient(ellipse at 4% 8%, rgba(229,105,105,0.03) 0%, transparent 24%)",
          // Magenta — menuju tengah
          "radial-gradient(ellipse at 8% 12%, rgba(193,85,139,0.08) 0%, transparent 28%)",
          // Ungu — mulai memasuki zona biru
          "radial-gradient(ellipse at 16% 24%, rgba(138,73,161,0.08) 0%, transparent 38%)",
          // Biru gelap — mulai dominan dari tengah ke kanan bawah
          "radial-gradient(ellipse at 32% 33%, rgba(32,47,56,0.2) 0%, transparent 50%)",
          "radial-gradient(ellipse at 80% 82%, rgba(32,47,56,0.2) 0%, transparent 48%)",
          // Biru gelap paling kuat di pojok kanan bawah (~70% coverage)
          "radial-gradient(ellipse at 100% 100%, rgba(32,47,56,0.2) 0%, transparent 55%)",
        ].join(", "),
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 2.8s cubic-bezier(0.4,0,0.2,1) 0.3s",
        zIndex: 0,
      }}
    />
  );
}