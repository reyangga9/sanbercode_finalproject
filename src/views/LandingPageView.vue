<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import BookList from "../components/BookList.vue";
// import { useAuthStore } from "../stores/authStore";
import { useBookStore } from "../stores/bookStore";

const router = useRouter();
// const authStore = useAuthStore();
const bookStore = useBookStore();
const { books, booksFiction, booksBiografi } = storeToRefs(bookStore);

const limitBook = computed(() => books.value.slice(0, 4));

bookStore.fetchBooks();
bookStore.fetchBooksFiction();
bookStore.fetchBooksBiografi();
</script>

<template>
  <section class="pl-[200px] pr-[200px] flex gap-5">
    <div class="w-[60%] relative">
      <div class="carousel w-full h-[400px]">
        <div id="slide1" class="carousel-item relative w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            class="w-full"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide4" class="btn btn-circle">❮</a>
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            class="w-full"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide1" class="btn btn-circle">❮</a>
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
            class="w-full"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide2" class="btn btn-circle">❮</a>
            <a href="#slide4" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" class="carousel-item relative w-full">
          <img
            src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            class="w-full"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
          >
            <a href="#slide3" class="btn btn-circle">❮</a>
            <a href="#slide1" class="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      <div class="flex justify-center w-full py-2 gap-2 absolute bottom-[10px]">
        <a href="#slide1" class="btn btn-circle btn-xs"></a>
        <a href="#slide2" class="btn btn-circle btn-xs"></a>
        <a href="#slide3" class="btn btn-circle btn-xs"></a>
        <a href="#slide4" class="btn btn-circle btn-xs"></a>
      </div>
    </div>

    <div class="w-[40%] flex flex-col gap-5 h-[400px]">
      <div class="h-[200px]">
        <img
          src="https://cdn.gramedia.com/uploads/marketing/Gramedia.com_Pre-Order_Majalah_Bobo_Edisi_Koleksi_Ketiga_Trilogi_Storefront__wauto_h164.jpg"
          class="h-full"
        />
      </div>
      <div class="h-[200px]">
        <img
          src="https://cdn.gramedia.com/uploads/marketing/Gramedia.com_Pre-Order_Majalah_Bobo_Edisi_Koleksi_Ketiga_Trilogi_Storefront__wauto_h164.jpg"
          class="h-full"
        />
      </div>
    </div>
  </section>

  <section class="pl-[200px] pr-[200px] mt-5 flex gap-6 justify-between">
    <div class="flex flex-col w-[100px] justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">Buku Baru Andalan</p>
    </div>
    <div class="flex flex-col w-[100px] align-middle justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">Buku Pilihan</p>
    </div>
    <div class="flex flex-col w-[100px] align-middle justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">International Books</p>
    </div>
    <div class="flex flex-col w-[100px] align-middle justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">Bookstore Academy</p>
    </div>
    <div class="flex flex-col w-[100px] align-middle justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">Buku On Demands</p>
    </div>
    <div class="flex flex-col w-[100px] align-middle justify-center">
      <img
        src="https://cdn.gramedia.com/uploads/highlighted_menu/Icon_category_Buku_Baru__w100_hauto.png"
        class="h-[100px]"
      />
      <p class="text-center text-[18px] text-gray-400">Non Books</p>
    </div>
  </section>

  <section class="pl-[200px] pr-[200px] mt-5">
    <div class="flex justify-between">
      <h1 class="text-2xl mb-5 text-black">Rekomendasi Bookstore Untukmu</h1>
      <p
        @click="router.push('/products')"
        class="cursor-pointer text-blue-700 text-xl font-bold"
      >
        Lihat semua
      </p>
    </div>
    <BookList :books="limitBook" />
  </section>

  <div class="pl-[200px] pr-[200px] mt-16 mb-10">
    <hr />
  </div>

  <section class="pl-[200px] pr-[200px]">
    <div class="flex justify-between">
      <h1 class="text-2xl mb-5 text-black">Buku Biografi terpopuler</h1>
      <p
        @click="router.push({ path: '/products', query: { q: 'biografi' } })"
        class="cursor-pointer text-blue-700 text-xl font-bold"
      >
        Lihat semua
      </p>
    </div>
    <BookList :books="booksBiografi" />
  </section>

  <div class="pl-[200px] pr-[200px] mt-16 mb-10">
    <hr />
  </div>

  <section class="pl-[200px] pr-[200px]">
    <div class="flex justify-between">
      <h1 class="text-2xl mb-5 text-black">Fiksi Terfavorit</h1>
      <p class="cursor-pointer text-blue-700 text-xl font-bold">Lihat semua</p>
    </div>
    <BookList :books="booksFiction" />
  </section>
</template>

<style scoped>
#cart-number {
  background-color: "red";
}
</style>
