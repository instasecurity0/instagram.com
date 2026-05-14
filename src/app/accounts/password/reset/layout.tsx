"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GradientOverlay from "@/components/ui/GradientOverlay";
import InstagramWordmark from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

interface PasswordResetLayoutProps {
  children: React.ReactNode;
}

export default function PasswordResetLayout({ children }: PasswordResetLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <GradientOverlay visible={!mounted} />

      {/* Mobile-only header logo */}
      <header
        style={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
        className="md:hidden"
      >
        {/* maxWidth + padding harus identik dengan wrapper konten di page.tsx */}
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            padding: "0 24px",
            columnGap: 10,
            height: 52,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image 
          src="/instagram.png"
          alt="Instagram Logo"
          width={24}
          height={24}
          priority
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
          />
          <Image
          src="/instagram-logo.svg"
          alt="Instagram"
          width={103}
          height={36}
          priority
          style={{
            filter: "invert(1)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease",
            }}
          />
        </div>
      </header>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          margin: "0 auto",
          padding: "40px 24px 40px",
        }}
      >
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {children}
        </div>
      </main>

      <Footer visible={mounted} />
    </div>
  );
}