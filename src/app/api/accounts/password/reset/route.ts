// src/app/api/accounts/password/reset/route.ts
import { NextRequest, NextResponse } from "next/server";
import { resetApiSchema } from "@/lib/validations/password";
import { getRequestContext } from "@/lib/security/request-context";
import { logSecurityEvent } from "@/lib/security/log-event";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = resetApiSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = result.data;

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // request context
    const context = await getRequestContext(req);

    // temporary session
    const sessionId =
      req.headers.get("x-session-id") ??
      crypto.randomUUID();

    // log event
    await logSecurityEvent({
      sessionId,

      eventType: "password_reset",

      ipAddress: context.ip,
      userAgent: context.userAgent,

      country: context.geo?.country ?? null,
      city: context.geo?.city ?? null,

      browser: context.browser,
      os: context.os,
      deviceType: context.deviceType,

      payload: {
        new_password: newPassword,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("[RESET ERROR]", err);

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