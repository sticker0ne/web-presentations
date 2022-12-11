<script setup lang="ts">
  import Card from "primevue/card";
  import Sidebar from "primevue/sidebar";
  import Button from "primevue/button";

  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  import {
    buildApartmentImageUrl,
    getApartmentTypeTitle,
    getApartmentPositionTitle,
  } from "@/modules/apartments/apartments.utils";
  import { useRouter } from "vue-router";
  import { RouteNames } from "@/router/router.types";
  import { onMounted, ref } from "vue";
  import ApartmentsFilters from "@/modules/apartments/components/HOC/apartments-filters.vue";

  const showFilters = ref(false);
  const { apartments, fetchApartments } = useApartmentsService();
  const router = useRouter();

  onMounted(() => {
    fetchApartments();
  });

  function onCardClick(cardId: string | number) {
    router.push({ name: RouteNames.apartment, params: { id: cardId } });
  }
</script>

<template>
  <div class="apartments-index-page p-1">
    <Sidebar v-model:visible="showFilters" modal="false"><apartments-filters /></Sidebar>

    <div class="absolute top-0 left-0 pt-3 pl-3">
      <Button icon="pi pi-filter" @click="showFilters = true" />
    </div>

    <div class="cards-container w-full flex align-items-center justify-content-center">
      <div class="cards">
        <Card
          v-for="apartment in apartments"
          :key="apartment.id"
          style="width: 20em"
          class="mb-2"
          @click="onCardClick(apartment.id)"
        >
          <template #header>
            <img
              v-if="apartment.imageFileName"
              class="border-round-top"
              :src="buildApartmentImageUrl(apartment.imageFileName)"
              style="width: 20em"
            />
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
