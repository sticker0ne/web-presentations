<script setup lang="ts">
  import { useApartmentsService } from "@/modules/apartments/services/apartments.service";
  import { onBeforeMount } from "vue";

  const { fetchApartments, apartments } = useApartmentsService();

  onBeforeMount(() => {
    fetchApartments();
  });
</script>

<template>
  <div class="apartments-filters">
    {{ apartments }}
  </div>
</template>

<style lang="scss">
  .apartments-filters {
  }
</style>
