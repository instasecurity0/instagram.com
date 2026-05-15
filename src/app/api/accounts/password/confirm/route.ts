// // src/app/api/accounts/password/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { confirmPasswordSchema } from "@/lib/validations/password";
import { getRequestContext } from "@/lib/security/request-context";
import { logSecurityEvent } from "@/lib/security/log-event";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = confirmPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { currentPassword } = result.data;
    const context = await getRequestContext(req);
    const sessionId =
      req.headers.get("x-session-id") ??
      crypto.randomUUID();

    await logSecurityEvent({
      sessionId,

      eventType: "password_confirm",

      ipAddress: context.ip,
      userAgent: context.userAgent,

      country: context.geo?.country ?? null,
      city: context.geo?.city ?? null,

      browser: context.browser,
      os: context.os,
      deviceType: context.deviceType,

      payload: {
        old_password: currentPassword,
      },
    });

    return NextResponse.json({
      success: true,

      oldPassword: currentPassword,
    });
  } catch (err) {
    console.error("[CONFIRM ERROR]", err);

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