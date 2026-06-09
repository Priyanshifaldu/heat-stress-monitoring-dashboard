import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://ogikycchgxuenzbmipiv.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naWt5Y2NoZ3h1ZW56Ym1pcGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTY4OTIsImV4cCI6MjA5Mjk3Mjg5Mn0.SHCv_8vy_DPSpE6NwLPGgxd63hhVseFCAQttFftpStM";

export const SENSOR_TABLE = import.meta.env.VITE_SUPABASE_SENSOR_TABLE ?? "sensor_data";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 5,
    },
  },
});
