<script setup lang="ts">
import TableBooks from "../../components/admin/Books/TableBooks.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleJump = () => {
  router.push({ path: "/admin/books/create" });
};
</script>

<template>
  <div
    class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <h1 class="text-3xl flex items-center gap-4">
      <span class="rounded-full bg-white border-2 p-2">
        <img src="https://www.svgrepo.com/show/54455/table.svg" width="25px" />
      </span>
      Books
    </h1>
    <h1 class="text-3xl">Admin / Books</h1>
  </div>
  <div class="max-w-8xl mx-auto mt-24">
    <button @click="handleJump" className=" mb-8 ml-4 btn btn-warning">
      Add Books
    </button>

    <TableBooks />
  </div>
</template>
