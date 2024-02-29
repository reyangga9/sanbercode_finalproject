<script setup lang="ts">
// import { useRouter } from "vue-router";

// const router = useRouter();

// const handleJump = () => {
//   router.push({ path: "/admin/users/create" });
// };
</script>

<template>
  <MainLayout>
    <div
      class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <h1 class="text-3xl flex items-center gap-4">
        <span class="rounded-full bg-white border-2 p-2">
          <img
            src="https://www.svgrepo.com/show/54455/table.svg"
            width="25px"
          />
        </span>
        Table User
      </h1>
      <h1 class="text-3xl">Dashboard / Users</h1>
    </div>
    <div class="max-w-6xl mx-auto mt-24">
      <div class="flex flex-col w-full lg:flex-row">
        <div
          class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"
        >
          content
        </div>
        <div class="divider lg:divider-horizontal">OR</div>
        <div
          class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center"
        >
          content
        </div>
      </div>
    </div>
  </MainLayout>
</template>
