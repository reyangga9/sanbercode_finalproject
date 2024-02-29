<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";
import { ref, watch, onMounted } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const cartStore = useCartStore();

const totalCart: any = ref(0);
onMounted(() => {
  if (user?.value?.role === "USER") {
    watch(
      () => cartStore.carts,
      (newValue) => {
        totalCart.value = newValue.length;
      }
    );
  } else {
    return;
  }
});
</script>

<template>
  <header class="flex-row sticky top-0 z-10">
    <p
      class="bg-blue-100 flex-1 text-right pr-[200px] pl-[200px] py-1 font-bold cursor-pointer"
    >
      Bantuan

      <i class="fas fa-question-circle ml-3"></i>
    </p>

    <section class="pl-[200px] pr-[200px] shadow">
      <div class="navbar bg-base-100 flex g-3 justify-between align-middle">
        <div class="w-[20%]">
          <h3
            class="text-3xl font-semibold text-blue-800 cursor-pointer"
            @click="router.push('/')"
          >
            Book Store
          </h3>
        </div>
        <div class="w-[60%]">
          <div class="navbar-center hidden lg:flex mr-5 cursor-pointer">
            <div
              @click="router.push('/products')"
              class="text-xl text-blue-900 font-bold"
            >
              Kategori
            </div>
          </div>

          <label class="input input-bordered flex items-center gap-2 w-[100%]">
            <input
              type="text"
              class="grow"
              placeholder="Cari Produk, Judul BUku, Penulis"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div class="w-[20%] flex justify-end">
          <RouterLink to="/user/carts" class="text-xl mr-4 relative">
            <div class="flex gap-2">
              <span id="cart-number ">{{ totalCart }}</span>
              <i class="fas fa-shopping-cart text-xl"></i>
            </div>
          </RouterLink>
          <div v-if="user" class="dropdown dropdown-bottom">
            <div tabindex="0" role="button" class="p-2 m-1">
              <span class="text-xl mr-2">{{ user.name.split(" ")[0] }}</span>
              <i class="fas fa-user text-xl"></i>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <!-- <li>
                <RouterLink to="/profile">Profil</RouterLink>
              </li>
              <li>
                <RouterLink to="/dashboard">Dashboard</RouterLink>
              </li> -->
              <li>
                <RouterLink to="/user/transactions">Transaction</RouterLink>
              </li>
              <li>
                <button @click="authStore.onLogOut" class="btn bg-gray-500">
                  Log Out
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </li>
            </ul>
          </div>
          <RouterLink
            v-else
            to="/login"
            class="text-xl ml-3 btn bg-blue-600 text-white"
            >Masuk</RouterLink
          >
        </div>
      </div>
    </section>
  </header>
</template>
