// src/app/accounts/password/reset/confirm/page.tsx
import type { Metadata } from "next";
import ConfirmPasswordForm from "@/components/password/ConfirmPasswordForm";
import AppOpenTracker from "@/components/security/AppOpenTracker";

export const metadata: Metadata = {
  title: "Confirm Password",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return (
    <>
      <AppOpenTracker />
      <ConfirmPasswordForm />
    </>
  );
}