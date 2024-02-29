<script setup lang="ts">
import axios from "axios";

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useAuthStore } from "../../../stores/authStore";

import { storeToRefs } from "pinia";
import { API_URL } from "../../../utils";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
console.log(user.value.token);

const router = useRouter();

interface Book {
  name: string;
  publisher: string;
  price: number;
  stock: number;
  publishedAt: any;
  description: string;
  weight: number;
  height: number;
  width: number;
  isbn: string;
  sku: string;
  pages: number;
  language: string;
  categories: any[];
  authors: any[];
  delete?: any;
}

const book = ref<Book>({
  name: "",
  publisher: "",
  price: 0,
  stock: 0,
  publishedAt: "test",
  description: "",
  weight: 0,
  height: 0,
  width: 0,
  isbn: "",
  sku: "",
  pages: 0,
  language: "",
  categories: [],
  authors: [],
});
let categories: any = ref([]);
let authorz: any = ref([]);
let id_category: any = ref(0);
let id_author: any = ref(0);

const route = useRoute();
const id = route.params.id;
const fetchDataBook = async (id: any) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  const responseData = res.data.data;

  const {
    name,
    publisher,
    price,
    stock,
    description,
    weight,
    height,
    width,
    isbn,
    sku,
    pages,
    language,
    categories,
    authors,
  } = responseData;

  const date = new Date(responseData.publishedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  book.value = {
    name,
    publisher,
    price,
    stock,
    publishedAt: formattedDate,
    description,
    weight,
    height,
    width,
    isbn,
    sku,
    pages,
    language,
    categories,
    authors,
  };
};

const fetchDataCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);

    categories = res.data.data;
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
};

const fetchDataAuthors = async () => {
  try {
    const res = await axios.get(`${API_URL}/authors?limit=50`);
    authorz = res.data.data;
    console.log(authorz);
  } catch (error) {
    console.log(error);
  }
};

fetchDataCategories();
fetchDataAuthors();

if (id) {
  fetchDataBook(id);
}

const handleSubmit = () => {
  if (id) {
    const isoDate = `${book.value.publishedAt}T00:00:00Z`;
    book.value.publishedAt = isoDate;

    // delete book.value.categories;
    // delete book.value.authors;

    const fetchEditBook = async (id: any) => {
      console.log(user.value);
      const config = {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
          "Content-Type": "application/json",
        },
      };

      try {
        await axios.put(`${API_URL}/products/${id}`, book.value, config);

        alert("data berhasild di edit");

        router.push("/admin/books");
      } catch (error) {
        console.error("Error editing book:", error);

        throw error;
      }
    };

    fetchEditBook(id);
  }
};
</script>

<template>
  <div class="mx-auto max-w-screen-lg p-4 md:p-6 2xl:p-10">
    <div>
      <div class="grid grid-flow-col auto-row grid-cols-5">
        <header
          class="flex flex-col col-start-2 col-span-3 p-10 bg-gray-100 text-center"
        >
          <h1 id="title" class="mb-2 text-4xl">
            {{ id ? "Form Edit Book" : "Form Add Book" }}
          </h1>
        </header>
        <section
          class="bg-base-300 col-start-2 col-span-3 mt-10 rounded-sm shadow"
        >
          <form
            id="survey-form"
            class="flex flex-col gap-6 p-5 md:p-10"
            @submit.prevent="handleSubmit"
          >
            <div class="flex gap-5 justify-around">
              <div class="flex flex-col w-full">
                <label
                  id="name-label"
                  for="name"
                  class="font-medium rounded-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  v-model="book.name"
                  placeholder="Type here"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="flex flex-col w-full">
                <label
                  id="publisher-label"
                  for="publisher"
                  class="font-medium text-gray-600"
                  >Publisher</label
                >
                <input
                  v-model="book.publisher"
                  id="publisher"
                  type="text"
                  required
                  class="input input-bordered w-full"
                  placeholder="Gramedia"
                />
              </div>
            </div>
            <div class="flex gap-5 justify-around">
              <div class="flex flex-col w-full">
                <label
                  id="price-label"
                  for="price"
                  class="font-medium rounded-sm text-gray-600"
                >
                  Price
                </label>
                <input
                  id="price"
                  v-model="book.price"
                  type="number"
                  placeholder="50000"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="flex flex-col w-full">
                <label
                  id="stock-label"
                  for="stock"
                  class="font-medium text-gray-600"
                  >Stock</label
                >
                <input
                  id="stock"
                  v-model="book.stock"
                  type="number"
                  required
                  class="input input-bordered w-full"
                  placeholder="50"
                />
              </div>
            </div>
            <!-- <div class="flex flex-col w-full">
              <label
                id="published-label"
                for="published"
                class="font-medium text-gray-600"
                >Published Date</label
              >
              <input
                v-model="book.publishedAt"
                id="published"
                type="date"
                required
                class="input input-bordered w-full"
                placeholder="john.doe@email.com"
              />
            </div> -->

            <div class="flex gap-5 justify-around">
              <!-- ISBN Input -->
              <div class="flex flex-col w-full">
                <label
                  id="isbn-label"
                  for="isbn"
                  class="font-medium rounded-sm text-gray-600"
                >
                  ISBN
                </label>
                <input
                  id="isbn"
                  v-model="book.isbn"
                  type="text"
                  placeholder="ISBN"
                  class="input input-bordered w-full"
                />
              </div>

              <!-- SKU Input -->
              <div class="flex flex-col w-full">
                <label
                  id="sku-label"
                  for="sku"
                  class="font-medium text-gray-600"
                >
                  SKU
                </label>
                <input
                  id="sku"
                  v-model="book.sku"
                  type="text"
                  required
                  class="input input-bordered w-full"
                  placeholder="SKU"
                />
              </div>
            </div>

            <!-- Pages and Language Inputs -->
            <div class="flex gap-5 justify-around">
              <!-- Pages Input -->
              <div class="flex flex-col w-full">
                <label
                  id="pages-label"
                  for="pages"
                  class="font-medium rounded-sm text-gray-600"
                >
                  Pages
                </label>
                <input
                  id="pages"
                  v-model="book.pages"
                  type="number"
                  placeholder="Pages"
                  class="input input-bordered w-full"
                />
              </div>

              <!-- Language Input -->
              <div class="flex flex-col w-full">
                <label
                  id="language-label"
                  for="language"
                  class="font-medium text-gray-600"
                >
                  Language
                </label>
                <input
                  id="language"
                  v-model="book.language"
                  type="text"
                  required
                  class="input input-bordered w-full"
                  placeholder="Language"
                />
              </div>
            </div>

            <!-- Stock and Categories Inputs -->
            <div class="flex gap-5 justify-around">
              <!-- Stock Input -->
              <div class="flex flex-col w-full">
                <label
                  id="stock-label"
                  for="stock"
                  class="font-medium rounded-sm text-gray-600"
                >
                  Stock
                </label>
                <input
                  id="stock"
                  v-model="book.stock"
                  type="number"
                  placeholder="Stock"
                  class="input input-bordered w-full"
                />
              </div>
            </div>

            <!-- Categories Edit -->
            <!-- <div class="flex flex-col w-full">
              <label
                for="categories"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Categories
              </label>
              <select
                id="categories"
                v-model="edit_id_category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  :key="cat.category.id"
                  v-for="cat in book.categories"
                  :value="cat.category.id"
                >
                  {{ cat.category.name }}
                </option>
              </select>
            </div> -->

            <!-- categories input -->
            <div v-show="!id" class="flex flex-col w-full">
              <label
                for="categories"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Categories
              </label>
              <select
                id="categories"
                v-model="id_category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option :key="cat.id" v-for="cat in categories" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Authors Input -->

            <div v-show="!id" class="flex flex-col w-full">
              <label
                for="authors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Authors
              </label>
              <select
                id="authors"
                v-model="id_author"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option :key="x.id" v-for="x in authorz" :value="x.id">
                  {{ x.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col w-full">
              <label
                id="description-label"
                for="description"
                class="font-medium text-gray-600"
                >Description</label
              >
              <textarea
                id="description"
                v-model="book.description"
                placeholder="Desc"
                class="textarea textarea-bordered textarea-lg h-96 w-full"
              >
              </textarea>
            </div>

            <div class="flex justify-end col-start-1 col-span-3">
              <button
                id="submit"
                type="submit"
                class="btn bg-success text-white py-3 px-6 mx-auto"
                v-show="id"
              >
                Edit
              </button>
              <button
                id="submit"
                type="submit"
                v-show="!id"
                class="btn bg-success text-white py-3 px-6 mx-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
