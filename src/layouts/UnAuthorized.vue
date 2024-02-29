<!-- UnAuthorized.vue -->
<template>
  <div
    class="h-screen bg-gray-100 flex flex-col justify-center lg:gap-6 py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="mt-6 text-6xl font-extrabold text-gray-900">
          Unauthorized Access
        </h2>
        <p class="mt-4 text-2xl text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
      <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="mt-6 text-4xl text-center">401</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UnAuthorized",
};
</script>

<!-- Add styling if needed -->
<style scoped>
/* Your CSS styles here */
</style>
