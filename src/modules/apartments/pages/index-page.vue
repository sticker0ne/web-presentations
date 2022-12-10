<script setup lang="ts">
  import Card from "primevue/card";
  import ApartmentsFilters from "@/modules/apartments/components/HOC/apartments-filters.vue";
  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  const { apartments } = useApartmentsService();

  import {
    buildApartmentImageUrl,
    getApartmentTypeTitle,
    getApartmentPositionTitle,
  } from "@/modules/apartments/apartments.utils";
</script>

<template>
  <div class="apartments-index-page p-1">
    <apartments-filters />
    <div class="cards-container w-full flex align-items-center justify-content-center">
      <div class="cards">
        <Card v-for="apartment in apartments" :key="apartment.id" style="width: 20em" class="mb-2">
          <template #header>
            <img class="border-round-top" :src="buildApartmentImageUrl(apartment.imageFileName)" style="width: 20em" />
          </template>
          <template #title> {{ apartment.title }}</template>
          <template #subtitle>
            {{ getApartmentTypeTitle(apartment.type) }}, {{ getApartmentPositionTitle(apartment.position) }},
            {{ apartment.price }}&nbsp;руб./мес.
          </template>
          <template #content>
            <p class="mb-0">
              {{ apartment.description }}
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .apartments-index-page {
    .p-card {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        box-shadow: 2px 4px 1px -1px rgb(0 0 0 / 20%), 2px 3px 1px 0 rgb(0 0 0 / 14%), 2px 3px 3px 0 rgb(0 0 0 / 12%);
      }
    }

    .p-card-content {
      padding: 0.5rem;
    }
  }
</style>
