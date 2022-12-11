import { createClient } from "@supabase/supabase-js";
import { computed, ref, watch } from "vue";
import type { Database } from "@/types/supabase/database-types";
import type {
  IApartment,
  IApartmentLocalFilters,
  IApartmentRemoteFilters,
  IApartmentResultFilters,
} from "@/modules/apartments/apartments.types";
import { apartmentPositionToTitleMap, apartmentTypeToTitleMap } from "@/modules/apartments/apartments.types";
import { useRouter } from "vue-router";

const FILTERS_QUERY_KEY = "filters";

export function createCountersService(initPayload: { supabaseUrl: string; supabaseAnonKey: string }) {
  const client = createClient<Database>(initPayload.supabaseUrl, initPayload.supabaseAnonKey);

  const router = useRouter();

  const apartments = ref<IApartment[]>([]);

  async function fetchApartments() {
    shouldShowApplyButton.value = false;

    const { minPrice, maxPrice, minSquare, maxSquare, types, positions } = resultFilters.value;

    const typeValues = types.length ? types : Object.keys(apartmentTypeToTitleMap);
    const positionValues = positions.length ? positions : Object.keys(apartmentPositionToTitleMap);

    const { data, error } = await client
      .from("apartments")
      .select()
      .gte("price", minPrice)
      .lte("price", maxPrice)
      .gte("square", minSquare)
      .lte("square", maxSquare)
      .in("type", typeValues)
      .in("position", positionValues);

    if (error) console.error(error);
    if (data) apartments.value = data;
  }

  const apartment = ref<IApartment | null>(null);

  async function fetchApartment(id: string | number) {
    const { data, error } = await client.from("apartments").select().eq("id", id);
    if (error) console.error(error);
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

    if (data) remoteFilters.value = data.data;
  }

  function applyFilters() {
    const filtersString = JSON.stringify(resultFilters.value);
    router.replace({ query: { [FILTERS_QUERY_KEY]: filtersString } });
    fetchApartments();
  }

  function parseFiltersFromUrl() {
    const { [FILTERS_QUERY_KEY]: filtersString } = router.currentRoute.value.query;

    if (!filtersString || typeof filtersString !== "string") return;

    try {
      const filters = JSON.parse(filtersString);
      localFilters.value = filters;
    } catch (e) {
      console.error(e);
    }
  }

  const shouldShowApplyButton = ref(false);

  watch(
    localFilters,
    () => {
      shouldShowApplyButton.value = true;
    },
    { deep: true },
  );

  return {
    apartments,
    fetchApartments,
    apartment,
    fetchApartment,
    fetchFilters,
    remoteFilters,
    localFilters,
    resultFilters,
    shouldShowApplyButton,
    applyFilters,
    parseFiltersFromUrl,
  };
}

let service!: ReturnType<typeof createCountersService>;

export function useApartmentsService() {
  const { APP_SUPABASE_ANON_KEY, APP_SUPABASE_URL } = import.meta.env;

  if (!service)
    service = createCountersService({ supabaseUrl: APP_SUPABASE_URL, supabaseAnonKey: APP_SUPABASE_ANON_KEY });

  return service;
}
