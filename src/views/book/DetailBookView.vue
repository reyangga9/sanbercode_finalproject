<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useBookStore } from "../../stores/bookStore";
import { useCartStore } from "../../stores/cartStore";
import { ref } from "vue";

import { useAuthStore } from "../../stores/authStore";

import Toast from "../../utils/Toast";

const bookStore = useBookStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const { book } = storeToRefs(bookStore);

const total: any = ref(0);

bookStore.fetchBook(route.params.id);

const addCart = () => {
  if (total.value === 0 || total.value <= 0) {
    Toast({ icon: "error", text: "Buku gagal ditambahkan" });
    return;
  }
  cartStore.addCart(book.value.id, total.value);
  Toast({ icon: "success", text: "Buku berhasil ditambahkan" });
  setTimeout(() => {
    router.push("/user/carts").then(() => {
      location.reload(); // Menggunakan location.reload() untuk memperbarui halaman
    });
  }, 2000);
};
</script>

<template>
  <section class="grid grid-cols-3 pl-[200px] pr-[200px] h-screen">
    <div class="shadow-sm col-span-1">
      <img :src="book?.images[0].url" class="hero w-full" />
      <div v-if="authStore?.user" class="flex flex-row justify-end gap-5 mt-6">
        <div class="flex gap-5 items-center w-52">
          <button
            @click="total--"
            class="btn"
            tabindex="-1"
            role="button"
            aria-disabled="true"
            :disabled="total <= 0"
          >
            -
          </button>

          <h1 class="text-4xl">{{ total }}</h1>
          <button @click="total++" class="btn">+</button>
        </div>
        <button
          class="btn w-52 btn-outline btn-success btn-square"
          @click="addCart"
        >
          Add to cart
        </button>
      </div>
    </div>

    <div class="col-span-2 pl-10 pr-10 overflow-y-auto">
      <span
        class="text-gray-400 text-xl block mb-3"
        v-for="author in book?.authors"
        >{{ author?.author.name }}</span
      >
      <h2 class="text-3xl text-gray-800 font-semibold mb-3">
        {{ book?.name }}
      </h2>
      <div class="divider divider-neutral"></div>
      <h2 class="text-xl text-gray-900 mb-4">Deskripsi</h2>
      <p class="leading-7 text-justify mb-6">{{ book?.description }}</p>
      <h2 class="text-xl text-black mb-4">Detail Produk</h2>

      <section class="grid grid-cols-3 gap-3">
        <div>
          <p class="text-gray-600 font-semibold">Jumlah halaman</p>
          <p>{{ book?.pages }}</p>
        </div>
        <div>
          <p>Tanggal Terbit</p>
          <p>{{ book?.publishedAt }}</p>
        </div>
        <div>
          <p>ISBN</p>
          <p>{{ book?.isbn }}</p>
        </div>
        <div>
          <p>Bahasa</p>
          <p>{{ book?.language }}</p>
        </div>
        <div>
          <p>Penerbit</p>
          <p>{{ book?.publisher }}</p>
        </div>
        <div>
          <p>Berat</p>
          <p>{{ book?.weight }}</p>
        </div>
        <div>
          <p>Panjang</p>
          <p>{{ book?.height }}</p>
        </div>
      </section>
    </div>
  </section>

  <!-- <Review /> -->
</template>
