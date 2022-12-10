import type { Database } from "@/types/supabase/database-types";

export type IApartment = Database["public"]["Tables"]["apartments"]["Row"];
