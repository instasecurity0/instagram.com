"use client";

import { useEffect } from "react";

import { getSecuritySessionId } from "@/lib/security/client-session";

export default function AppOpenTracker() {
  useEffect(() => {
    const sessionId = getSecuritySessionId();

    fetch("/api/security/app-open", {
      method: "POST",

      headers: {
        "x-session-id": sessionId ?? "",
      },
    });
  }, []);

  return null;
}