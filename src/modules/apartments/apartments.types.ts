import type { Database } from "@/types/supabase/database-types";

export type IApartment = Database["public"]["Tables"]["apartments"]["Row"];

export type ApartmentType = "rent" | "purchase";
export type ApartmentPosition = "moscow" | "moscow_region" | "region";

export interface IApartmentRemoteFilters {
  maxPrice: number;
  minPrice: number;
  maxSquare: number;
  minSquare: number;
}

export interface IApartmentLocalFilters {
  maxPrice?: number;
  minPrice?: number;
  maxSquare?: number;
  minSquare?: number;
  types?: ApartmentType[];
  positions?: ApartmentPosition[];
}

export interface IApartmentResultFilters {
  maxPrice: number;
  minPrice: number;
  maxSquare: number;
  minSquare: number;
  types: ApartmentType[];
  positions: ApartmentPosition[];
}
