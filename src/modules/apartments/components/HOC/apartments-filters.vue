<script setup lang="ts">
  import Slider from "primevue/slider";
  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  import { onBeforeMount } from "vue";

  const { fetchFilters, remoteFilters, localFilters, resultFilters } = useApartmentsService();

  function onPriceSliderChange(value: [number, number]) {
    localFilters.value.minPrice = value[0];
    localFilters.value.maxPrice = value[1];
  }

  onBeforeMount(() => {
    fetchFilters();
  });
</script>

<template>
  <div v-if="remoteFilters" class="apartments-filters">
    <div class="price-filter mt-3">
      <span>Цена от {{ resultFilters.minPrice }} до {{ resultFilters.maxPrice }}</span>
      <Slider
        class="mt-2"
        :model-value="[resultFilters.minPrice, resultFilters.maxPrice]"
        range
        :min="remoteFilters?.minPrice"
        :max="remoteFilters?.maxPrice"
        @change="onPriceSliderChange"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .apartments-filters {
  }
</style>
