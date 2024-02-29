<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
console.log(user.value);
</script>

<template>
  <div class="sticky top-0 z-30 p-4 navbar bg-blue-600">
    <div class="flex-1">
      <router-link
        to="/admin/dashboard"
        class="btn btn-warning font-bold text-xl"
        >SanberLibrary</router-link
      >
    </div>
    <div class="flex-none gap-6">
      <input type="checkbox" class="toggle theme-controller" />

      <div class="text-white font-bold text-xl">Hi, {{ user?.name }}</div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>

        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <router-link to="/admin/profile" class="justify-between">
              Profile
              <span class="badge text-primary">New</span>
            </router-link>
          </li>
          <li><a>Settings</a></li>
          <li @click="authStore.onLogOut"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavDashboard",
};
</script>
