// src/lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import type { PasswordResetLog } from "@/types/database"

type Database = {
  public: {
    Tables: {
      password_reset_logs: {
        Row: PasswordResetLog;
        Insert: Omit<PasswordResetLog, "id" | "created_at">;
        Update: Partial<PasswordResetLog>;
      };
    };
  };
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);