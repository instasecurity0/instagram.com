import { supabaseAdmin } from "@/lib/supabase/server";

interface LogSecurityEventParams {
  sessionId: string;

  eventType: string;

  ipAddress?: string | null;
  userAgent?: string | null;

  country?: string | null;
  city?: string | null;

  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;

  payload?: Record<string, any>;
}

export async function logSecurityEvent({
  sessionId,
  eventType,

  ipAddress = null,
  userAgent = null,

  country = null,
  city = null,

  browser = null,
  os = null,
  deviceType = null,

  payload = {},
}: LogSecurityEventParams) {
  const { error } = await supabaseAdmin
    .from("events_audit")
    .insert({
      session_id: sessionId,
      event_type: eventType,
      ip_address: ipAddress,
      user_agent: userAgent,

      country,
      city,

      browser,
      os,
      device_type: deviceType,

      payload,
    });

  if (error) {
    console.error("[Security Event Error]", error);
  }
}