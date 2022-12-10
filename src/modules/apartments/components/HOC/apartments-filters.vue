<script setup lang="ts">
  import { useApartmentsService } from "@/modules/apartments/apartments.service";
  import { onBeforeMount } from "vue";

  const { fetchApartments, apartments } = useApartmentsService();

  onBeforeMount(() => {
    fetchApartments();
  });
</script>

<template>
  <div class="apartments-filters" />
</template>

<style lang="scss">
  .apartments-filters {
  }
</style>
