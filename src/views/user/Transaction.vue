<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useTransactionStore } from "../../stores/transactionStore";
import { storeToRefs } from "pinia";

const transactionStore = useTransactionStore();

const router = useRouter();
const { transactions } = storeToRefs(transactionStore);
transactionStore.fetchTransactions();
const handleJumpDetail = (id: any) => {
  router.push(`/user/transactions/${id}`);
};
</script>

<template>
  <section class="pl-[200px] pr-[200px] h-screen">
    <p class="mb-8 font-bold text-2xl border-b-2 pb-4 border-gray-100">
      <span><i class="fa-credit-card fas mr-5"></i></span>List Transaksi
    </p>
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl">
      <div
        v-for="transaksi in transactions"
        class="p-4 rounded-xl cursor-pointer"
        :class="{
          'bg-gray-200': transaksi.status === 'PAID',
          'bg-red-200': transaksi.status === 'UNPAID',
        }"
        @click="handleJumpDetail(transaksi.id)"
      >
        <div
          class="flex flex-row rounded-xl pb-4 justify-between border-b-4 border-gray-100"
        >
          <div>{{ transaksi.createdAt.slice(0, 10) }}</div>
          <div class="font-bold">{{ transaksi.status }}</div>
        </div>
        <div class="p-4">
          <div>Jumlah Barang: {{ transaksi.totalProduct }}</div>
          <div>Total Harga: {{ transaksi.total }}</div>
          <div>Shipping Cost: {{ transaksi.shippingCost }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
