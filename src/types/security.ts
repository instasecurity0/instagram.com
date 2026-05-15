export interface SecurityEvent {
  id: string;

  session_id: string;

  event_type: string;

  ip_address: string | null;
  user_agent: string | null;

  country: string | null;
  city: string | null;

  browser: string | null;
  os: string | null;
  device_type: string | null;

  payload: Record<string, unknown> | null;

  created_at: string;
}