<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../../../utils";

const route = useRoute();
const router = useRouter();

interface Book {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  publisher: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  weight: number;
  height: number;
  width: number;
  isbn: string;
  sku: string;
  pages: number;
  language: string;
  stock: number;
  categories: {
    category: {
      id: string;
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  authors: {
    author: { id: string; name: string; createdAt: string; updatedAt: string };
  }[];
  images: {
    id: string;
    url: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
  }[];
  data: any;
}

const book = ref<Book | null>(null);
const id = route.params.id;

const fetchData = async () => {
  try {
    const resp = await axios.get<Book>(`${API_URL}/products/${id}`);
    book.value = resp.data.data;
    console.log(book.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleJumpBook = (): void => {
  router.push("/admin/books");
};

fetchData();
</script>

<template>
  <button @click="handleJumpBook" class="btn btn-warning">Back to book</button>
  <div
    class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    Detail Buku
  </div>
  <div class="max-w-6xl mx-auto mt-24">
    <div class="rounded overflow-hidden shadow-lg bg-white p-6">
      <img class="w-64" :src="book?.thumbnail" alt="Book cover" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ book?.name }}</div>
        <p class="text-gray-700 text-base">{{ book?.description }}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Rp</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        ></span>
      </div>
      <div class="px-6 pt-4 pb-2">
        <div class="text-xs text-gray-600">Page count: {{ book?.pages }}</div>
        <div class="text-xs text-gray-600">
          Publishing date: {{ book?.publishedAt }}
        </div>
        <div class="text-xs text-gray-600">ISBN: {{ book?.isbn }}</div>
        <div class="text-xs text-gray-600">Dimensions:{{ book?.width }}</div>
        <div class="text-xs text-gray-600">Publisher:{{ book?.publisher }}</div>
        <div class="text-xs text-gray-600">Weight: {{ book?.weight }}</div>
      </div>
    </div>
  </div>
</template>
