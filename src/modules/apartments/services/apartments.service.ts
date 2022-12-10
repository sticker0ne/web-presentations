import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";
import type { Database } from "@/types/supabase/database-types";
import type { IApartment } from "@/modules/apartments/services/apartments.types";

export function createCountersService(initPayload: { supabaseUrl: string; supabaseAnonKey: string }) {
  const client = createClient<Database>(initPayload.supabaseUrl, initPayload.supabaseAnonKey);
  const apartments = ref<IApartment[]>([]);

  async function fetchApartments() {
    const { data, error } = await client.from("apartments").select();
    if (error) console.error(error);

    if (data) apartments.value = data;
  }

  return { apartments, fetchApartments };
}

let service!: ReturnType<typeof createCountersService>;

export function useApartmentsService() {
  const { APP_SUPABASE_ANON_KEY, APP_SUPABASE_URL } = import.meta.env;

  if (!service)
    service = createCountersService({ supabaseUrl: APP_SUPABASE_URL, supabaseAnonKey: APP_SUPABASE_ANON_KEY });

  return service;
}
