<script setup lang="ts">
import { useRouter } from "vue-router";
import TableTransactions from "../../components/admin/Transactions/TableTransactions.vue";

const router = useRouter();

const handleJump = () => {
  router.push({ path: "/admin/transactions/create" });
};
</script>

<template>
  <div
    class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <h1 class="text-3xl flex items-center gap-4">
      <span class="rounded-full bg-white border-2 p-2">
        <svg
          class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <rect
              x="3"
              y="6"
              width="18"
              height="13"
              rx="2"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></rect>
            <path
              d="M3 10H20.5"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7 15H9"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </span>
      Transactions
    </h1>
    <h1 class="text-3xl">Admin / Transactions</h1>
  </div>
  <div class="max-w-8xl mx-auto mt-24">
    <button @click="handleJump" className=" mb-8 ml-4 btn btn-warning">
      Add Transactions
    </button>

    <TableTransactions />
  </div>
</template>
