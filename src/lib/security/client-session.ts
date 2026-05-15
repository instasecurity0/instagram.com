const SESSION_KEY = "security_session_id";

export function getSecuritySessionId() {
  if (typeof window === "undefined") {
    return null;
  }

  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem(
      SESSION_KEY,
      sessionId
    );
  }

  return sessionId;
}