<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

import { useBookStore } from "../stores/bookStore";

const bookStore = useBookStore();
const router = useRouter();

let currentPage = ref(1);

const categories: string[] = [
  "Novel",
  "Humor",
  "Autobiografi",
  "Drama",
  "Biografi",
  "Fiksi",
];

const route = useRoute();
const id = ref<string | null>(route.query.q ? route.query.q.toString() : null);

// Fetch
if (id.value) {
  bookStore.fetchBooksByCategory(undefined, id.value);
} else {
  bookStore.fetchBooksByCategory();
}

console.log(bookStore.booksByCategory);

const activeIndex = ref<number | null>(null);

// Handle

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    bookStore.fetchBooksByCategory(currentPage.value, route.query.q);
  }
};

const nextPage = () => {
  currentPage.value++;
  bookStore.fetchBooksByCategory(currentPage.value, route.query.q);
};

function toggleAccordion(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

const handleCategory = (cat: string) => {
  id.value = cat;

  const query = { ...route.query, q: cat };
  router.replace({ query });

  bookStore.fetchBooksByCategory(undefined, cat);
  console.log(bookStore.booksByCategory);
};
const handleJumpBooks = (id: string) => {
  router.push(`/products/${id}`);
};
</script>

<template>
  <div class="p-4 max-w-6xl mt-8 w-full mx-auto">
    <h1>List buku</h1>
    <div class="mt-8 pt-4 w-full mx-auto flex border-t-2 border-slate-600">
      <div class="w-[40%] h-screen py-4 flex flex-col gap-8">
        <h1 class="text-4xl">Filter</h1>

        <div class="">
          <h1 class="text-2xl">Kategori</h1>
          <div class="mt-4 flex flex-col gap-4">
            <div class="collapse collapse-arrow">
              <input
                type="radio"
                id="accordion-1"
                name="my-accordion-2"
                @click="toggleAccordion(0)"
              />
              <div
                class="text-blue-800 pb-4 border-b-2 border-slate-300 collapse-title text-xl font-medium"
              >
                Books
              </div>
              <div class="collapse-content mt-4" v-if="activeIndex === 0">
                <ul class="px-4" v-for="cat in categories">
                  <li class="mb-6 cursor-pointer" @click="handleCategory(cat)">
                    {{ cat }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="collapse collapse-arrow">
              <input
                type="radio"
                id="accordion-2"
                name="my-accordion-2"
                @click="toggleAccordion(1)"
              />
              <!-- <div
                class="text-blue-800 pb-4 border-b-2 border-slate-300 collapse-title text-xl font-medium"
              >
                International Book
              </div>
              <div class="collapse-content mt-4" v-if="activeIndex === 1">
                <p>Hello from Book 2</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 w-[70%]">
        <div class="grid grid-cols-4 gap-5">
          <div
            v-for="x in bookStore.booksByCategory"
            @click="handleJumpBooks(x.id)"
            class="cursor-pointer card gap-4 card-compact w-40 h-80 bg-base-100 shadow-xl"
          >
            <div class="w-24 h-40 mx-auto">
              <img
                :src="x.thumbnail"
                alt="Shoes"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="card-body">
              <h2 class="text-xs hover:underline">
                {{
                  x.publisher.length > 15
                    ? x.publisher.slice(0, 15) + "..."
                    : x.publisher
                }}
              </h2>
              <h2 class="block w-full h-12 font-semibold hover:underline">
                {{ x.name.length > 30 ? x.name.slice(0, 30) + "..." : x.name }}
              </h2>
              <p class="mt-4 font-bold text-blue-400">
                {{ `RP  ${x.price.toLocaleString("id-ID")}` }}
              </p>
              <div class="card-actions justify-end"></div>
            </div>
          </div>
        </div>
        <div class="pt-4 mt-4 join flex w-full justify-evenly">
          <button @click="previousPage" class="join-item w-36 btn btn-outline">
            Previous page
          </button>
          <button @click="nextPage" class="join-item w-36 btn btn-outline">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
