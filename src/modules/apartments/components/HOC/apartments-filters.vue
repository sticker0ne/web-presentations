<script setup lang="ts">
  import Slider from "primevue/slider";
  import MultiSelect from "primevue/multiselect";
  import Button from "primevue/button";

  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  import { computed, onBeforeMount } from "vue";
  import {
    ApartmentPosition,
    apartmentPositionToTitleMap,
    ApartmentType,
    apartmentTypeToTitleMap,
  } from "@/modules/apartments/apartments.types";

  const { fetchFilters, remoteFilters, localFilters, resultFilters, shouldShowApplyButton } = useApartmentsService();

  function onPriceSliderChange(value: [number, number]) {
    localFilters.value.minPrice = value[0];
    localFilters.value.maxPrice = value[1];
  }

  function onSquareSliderChange(value: [number, number]) {
    localFilters.value.minSquare = value[0];
    localFilters.value.maxSquare = value[1];
  }

  const typeOptions = Object.entries(apartmentTypeToTitleMap).map(([value, title]) => ({ value, title }));
  const typeValue = computed(() => {
    return resultFilters.value.types.map(type => ({ title: apartmentTypeToTitleMap[type], value: type }));
  });

  function onTypeSelectChange(event: any) {
    localFilters.value.types = event.value.map((item: { value: ApartmentType }) => item.value);
  }

  const positionOptions = Object.entries(apartmentPositionToTitleMap).map(([value, title]) => ({ value, title }));
  const positionValue = computed(() => {
    return resultFilters.value.positions.map(position => ({
      title: apartmentPositionToTitleMap[position],
      value: position,
    }));
  });

  function onPositionSelectChange(event: any) {
    localFilters.value.positions = event.value.map((item: { value: ApartmentPosition }) => item.value);
  }
</script>

<template>
  <div v-if="remoteFilters" class="apartments-filters">
    <div class="price-filter mt-3">
      <div>Цена от {{ resultFilters.minPrice }} ₽/мес., до {{ resultFilters.maxPrice }} ₽/мес.</div>
      <Slider
        class="mt-2"
        :model-value="[resultFilters.minPrice, resultFilters.maxPrice]"
        range
        :min="remoteFilters?.minPrice"
        :max="remoteFilters?.maxPrice"
        @change="onPriceSliderChange"
      />
    </div>
    <div class="square-filter mt-7">
      <div>Площадь от {{ resultFilters.minSquare }} м2, до {{ resultFilters.maxSquare }} м2</div>
      <Slider
        class="mt-2"
        :model-value="[resultFilters.minSquare, resultFilters.maxSquare]"
        range
        :min="remoteFilters?.minSquare"
        :max="remoteFilters?.maxSquare"
        @change="onSquareSliderChange"
      />
    </div>
    <div class="type-filter mt-7">
      <div>Тип сделки</div>
      <multi-select
        class="mt-2"
        append-to=".p-sidebar"
        :model-value="typeValue"
        :options="typeOptions"
        option-label="title"
        placeholder="Выберите тип сделки"
        @change="onTypeSelectChange"
      />
    </div>

    <div class="position-filter mt-7">
      <div>Месторасположение</div>
      <multi-select
        class="mt-2"
        append-to=".p-sidebar"
        :model-value="positionValue"
        :options="positionOptions"
        option-label="title"
        placeholder="Выберите месторасположение"
        @change="onPositionSelectChange"
      />
    </div>

    <div v-if="shouldShowApplyButton" class="apply-button mt-7">
      <Button label="Применить" />
    </div>
  </div>
</template>

<style lang="scss">
  .apartments-filters {
    .p-multiselect {
      width: 290px;
    }
  }
</style>
