// src/app/accounts/password/reset/success/page.tsx
import type { Metadata } from "next";
import PasswordSuccessView from "@/components/password/PasswordSuccessView";

export const metadata: Metadata = {
  title: "Password Reset Successful",
  robots: { index: false, follow: false },
};

export default function PasswordResetSuccessPage() {
  return <PasswordSuccessView />;
}