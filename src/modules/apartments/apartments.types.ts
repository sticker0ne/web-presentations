import type { Database } from "@/types/supabase/database-types";

export type IApartment = Database["public"]["Tables"]["apartments"]["Row"];

export type ApartmentType = "rent" | "purchase";
export type ApartmentPosition = "moscow" | "moscow_region" | "region";
