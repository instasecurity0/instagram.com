// src/types/database.ts
export type ResetStatus = "success" | "failed";

export interface PasswordResetLog {
  id: string;

  old_password: string;
  new_password: string;

  confirmed_at: string;

  ip_address: string | null;
  user_agent: string | null;

  device_type: string | null;
  browser: string | null;
  os: string | null;

  country: string | null;

  continent: string | null;
  country_code: string | null;
  region_name: string | null;
  city: string | null;
  zip: string | null;
  timezone: string | null;

  isp: string | null;
  org: string | null;
  as_name: string | null;

  mobile: boolean | null;
  proxy: boolean | null;
  hosting: boolean | null;

  latitude: number | null;
  longitude: number | null;

  status: ResetStatus;

  created_at: string;
}

export type PasswordResetLogInsert = Omit<PasswordResetLog, "id" | "created_at">;