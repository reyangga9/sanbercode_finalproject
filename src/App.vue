<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import { useCartStore } from "./stores/cartStore.ts";
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();
const cartStore = useCartStore();

if (authStore?.user) {
  cartStore.fetchCarts();
}
</script>

<template>
  <MainLayout />
</template>
