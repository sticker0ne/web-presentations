import { createClient } from "@supabase/supabase-js";
import { computed, ref } from "vue";
import type { Database } from "@/types/supabase/database-types";
import type {
  IApartment,
  IApartmentLocalFilters,
  IApartmentRemoteFilters,
  IApartmentResultFilters,
} from "@/modules/apartments/apartments.types";

export function createCountersService(initPayload: { supabaseUrl: string; supabaseAnonKey: string }) {
  const client = createClient<Database>(initPayload.supabaseUrl, initPayload.supabaseAnonKey);

  const apartments = ref<IApartment[]>([]);

  async function fetchApartments() {
    const { data, error } = await client.from("apartments").select();
    if (error) console.error(error);

    if (data) apartments.value = data;
  }

  const apartment = ref<IApartment | null>(null);

  async function fetchApartment(id: string | number) {
    const { data, error } = await client.from("apartments").select().eq("id", id);
    if (error) console.log(error);
    if (data) apartment.value = data[0] || null;
  }

  const remoteFilters = ref<IApartmentRemoteFilters | null>(null);
  const localFilters = ref<IApartmentLocalFilters>({});

  const resultFilters = computed<IApartmentResultFilters>(() => {
    return {
      minPrice: localFilters.value?.minPrice || remoteFilters.value?.minPrice || 0,
      maxPrice: localFilters.value?.maxPrice || remoteFilters.value?.maxPrice || 0,
      minSquare: localFilters.value?.minSquare || remoteFilters.value?.minSquare || 0,
      maxSquare: localFilters.value?.maxSquare || remoteFilters.value?.maxSquare || 0,
      types: localFilters.value?.types || [],
      positions: localFilters.value?.positions || [],
    };
  });

  async function fetchFilters() {
    const { data, error } = await client.functions.invoke("get-filters");

    if (error) console.error(error);

    if (data) {
      remoteFilters.value = data.data;
      console.log(remoteFilters.value);
    }
  }

  return {
    apartments,
    fetchApartments,
    apartment,
    fetchApartment,
    fetchFilters,
    remoteFilters,
    localFilters,
    resultFilters,
  };
}

let service!: ReturnType<typeof createCountersService>;

export function useApartmentsService() {
  const { APP_SUPABASE_ANON_KEY, APP_SUPABASE_URL } = import.meta.env;

  if (!service)
    service = createCountersService({ supabaseUrl: APP_SUPABASE_URL, supabaseAnonKey: APP_SUPABASE_ANON_KEY });

  return service;
}
