// src/lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";
import type { PasswordResetLog } from "@/types/database";
import type { PasswordResetLogInsert } from "@/types/database";
import type { SecurityEvent } from "@/types/security";

type Database = {
  public: {
    Tables: {
      password_reset_logs: {
        Row: PasswordResetLog;
        Insert: PasswordResetLogInsert;
        Update: Partial<PasswordResetLog>;
        Relationships: [];
      };
      events_audit: {
        Row: SecurityEvent;
        Insert: Omit<SecurityEvent, "id" | "created_at">;
        Update: Partial<SecurityEvent>;
        Relationships: [];
      };
    };
  };
};

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);