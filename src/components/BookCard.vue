<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

defineProps(['book'])
</script>

<template>
   <section @click="router.push(`/products/${book.id}`)">
      <figure>
         <img :src="book.thumbnail" alt="car!" class="h-[300px] w-full" />
      </figure>
      <div class="card-body justify-start">
         <p class="text-gray-400">{{ book.publisher }}</p>
         <h2 class="text-[18px]">{{ book.name }}</h2>
         <h3 class="text-blue-800 text-3xl">Rp {{ book.price }}</h3>
         <p class="text-gray-400 line-through italic">Rp {{ book.price - (20 / 100 * book.price) }} </p>
      </div>
   </section>
</template>