<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { onBeforeMount, onBeforeUnmount, ref } from "vue";
  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  import {
    buildApartmentImageUrl,
    getApartmentTypeTitle,
    getApartmentPositionTitle,
    buildApartmentPresentationUrl,
  } from "@/modules/apartments/apartments.utils";

  const route = useRoute();
  const { apartment, fetchApartment } = useApartmentsService();
  const pdfHeight = ref(0);

  onBeforeMount(() => {
    pdfHeight.value = window.innerHeight * 0.7;

    const { id: paramId } = route.params;
    if (!paramId) return;

    const id = Array.isArray(paramId) ? paramId[0] : paramId;

    fetchApartment(id);
  });

  onBeforeUnmount(() => {
    apartment.value = null;
  });
</script>

<template>
  <div v-if="apartment" class="apartment-index-page p-1">
    <div class="card-container w-full flex align-items-center justify-content-center mb-5">
      <div class="card max-w-30rem">
        <img
          v-if="apartment.imageFileName"
          :src="buildApartmentImageUrl(apartment.imageFileName)"
          style="width: 100%"
        />
        <h2>{{ apartment.title }}</h2>
        <h4 class="text-700">
          {{ getApartmentTypeTitle(apartment.type) }}, {{ getApartmentPositionTitle(apartment.position) }},
          {{ apartment.price }}&nbsp;руб./мес.
        </h4>
        <p class="mb-0">
          {{ apartment.description }}
        </p>
      </div>
    </div>
    <iframe
      v-if="apartment.presentationFileName"
      :src="buildApartmentPresentationUrl(apartment.presentationFileName)"
      width="100%"
      :height="pdfHeight"
    />
  </div>
</template>

<style lang="scss">
  .apartment-index-page {
  }
</style>
