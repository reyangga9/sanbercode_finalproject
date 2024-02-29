<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <main class="mt-16">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
