<script setup lang="ts">
import { defineProps } from 'vue'
import BookCard from './BookCard.vue'

defineProps(['books'])
</script>

<template>
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="book in books" :key="book.id" class="card w-[300px] glass cursor-pointer shadow-lg">
         <BookCard :book="book" />
      </div>
   </div>
</template>