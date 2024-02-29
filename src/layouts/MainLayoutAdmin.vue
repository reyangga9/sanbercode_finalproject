<script setup lang="ts">
import Sidebar from "../components/admin/Sidebar.vue";
import { RouterView } from "vue-router";
import NavDashboard from "../components/admin/NavDashboard.vue";
</script>

<template>
  <div class="drawer lg:drawer-open">
    <label for="drawer" class="bg-blue-600 tex-white p-4 h-20">Sidebar</label>
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <NavDashboard />
      <div class="p-4 md:p-6 2xl:p-10">
        <RouterView />
      </div>
    </div>
    <div class="drawer-side z-40">
      <Sidebar />
    </div>
  </div>
</template>

<!-- <script lang="ts">
export default {
  name: "MainLayout",
};
</script> -->
