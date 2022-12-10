import { createRouter, createWebHistory } from "vue-router";
import { RouteNames } from "@/router/router.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: RouteNames.home,
      path: "/",
      component: () => import("@/modules/apartments/pages/index-page.vue"),
    },
    {
      name: RouteNames.apartment,
      path: "/apartment/:id",
      component: () => import("@/modules/apartments/pages/apartment-page.vue"),
    },
  ],
});

export default router;
