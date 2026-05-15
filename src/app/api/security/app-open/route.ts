// src/app/api/security/app-open/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@/lib/security/request-context";
import { logSecurityEvent } from "@/lib/security/log-event";

export async function POST(req: NextRequest) {
  try {
    const context = await getRequestContext(req);
    const sessionId =
      req.headers.get("x-session-id") ??
      crypto.randomUUID();

    await logSecurityEvent({
      sessionId,

      eventType: "app_open",

      ipAddress: context.ip,
      userAgent: context.userAgent,

      country: context.geo?.country ?? null,
      city: context.geo?.city ?? null,

      browser: context.browser,
      os: context.os,
      deviceType: context.deviceType,

      payload: {
        pathname: "/accounts/password/reset/confirm",

        continent: context.geo?.continent ?? null,
        country_code: context.geo?.countryCode ?? null,
        region_name: context.geo?.regionName ?? null,

        zip: context.geo?.zip ?? null,
        timezone: context.geo?.timezone ?? null,

        isp: context.geo?.isp ?? null,
        org: context.geo?.org ?? null,
        as_name: context.geo?.asname ?? null,

        mobile: context.geo?.mobile ?? null,
        proxy: context.geo?.proxy ?? null,
        hosting: context.geo?.hosting ?? null,

        latitude: context.geo?.lat ?? null,
        longitude: context.geo?.lon ?? null,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("[APP OPEN ERROR]", err);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}