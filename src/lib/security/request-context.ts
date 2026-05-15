import { NextRequest } from "next/server";

export function parseUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return {
      deviceType: null,
      browser: null,
      os: null,
    };
  }

  let deviceType = "desktop";

  if (/mobile/i.test(userAgent)) {
    deviceType = "mobile";
  }

  if (/tablet/i.test(userAgent)) {
    deviceType = "tablet";
  }

  let browser = "unknown";

  if (/chrome/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/firefox/i.test(userAgent)) {
    browser = "Firefox";
  } else if (/safari/i.test(userAgent)) {
    browser = "Safari";
  } else if (/edge/i.test(userAgent)) {
    browser = "Edge";
  }

  let os = "unknown";

  if (/windows/i.test(userAgent)) {
    os = "Windows";
  } else if (/android/i.test(userAgent)) {
    os = "Android";
  } else if (/iphone|ipad|ios/i.test(userAgent)) {
    os = "iOS";
  } else if (/mac/i.test(userAgent)) {
    os = "MacOS";
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  }

  return {
    deviceType,
    browser,
    os,
  };
}

export async function getRequestContext(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");

  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.headers.get("x-real-ip") ?? null;

  const userAgent = req.headers.get("user-agent") ?? null;

  const parsedUA = parseUserAgent(userAgent);

  let geo: any = null;

  if (ip) {
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
      geo = await geoRes.json();
    } catch (err) {
      console.error("[Geo Error]", err);
    }
  }

  return {
    ip,
    userAgent,

    browser: parsedUA.browser,
    os: parsedUA.os,
    deviceType: parsedUA.deviceType,

    geo,
  };
}