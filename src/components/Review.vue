<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
</script>

<template>
  <div class="p-4 max-w-6xl mt-8 w-full mx-auto">
    <h1>Review Buku</h1>

    <div id="app" class="antialiased min-h-screen pt-8 pb-12">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="px-8 py-8 rounded-md w-full shadow-lg bg-white">
          <div class="flex space-x-0.5">
            <svg
              class="w-5 h-5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
          </div>
          <p class="mt-2 text-sm font-medium leading-5 text-gray-500">
            Tanggal
          </p>

          <div class="space-y-1">
            <h3 class="font-semibold text-gray-800">
              <!-- {{ review.title }} -->
              Title
            </h3>
            <p class="text-sm font-medium leading-5 text-gray-600">
              <!-- {{ review.body }} -->
              Description
            </p>
          </div>
          <div class="mt-6 flex items-center space-x-2">
            <span class="text-sm font-semibold leading-5 text-gray-900">
              Nama
            </span>
            <div class="flex-shrink-0">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
