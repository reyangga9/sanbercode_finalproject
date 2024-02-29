<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useTransactionStore } from "../../stores/transactionStore";
import Toast from "../../utils/Toast";
import axios from "axios";
import { API_URL } from "../../utils";
import { ref, watch } from "vue";

// REACTIVE
const addressUserN: any = ref("");

// STORE
const transactionStore = useTransactionStore();

// ROUTE DAN PARAMS
const route = useRoute();

const id = route.params.id;
// console.log(id);

// FETCHING
transactionStore.fetchDetailTransaction(id);
const addressUser = async (data: any) => {
  const { districtId, provinceId, subdistrictId } = data;
  try {
    const res = await axios.get(
      `${API_URL}/address?provinceId=${provinceId}&districtId=${districtId}&subdistrictId=${subdistrictId}`
    );
    addressUserN.value = res.data.data;
    console.log(addressUserN.value);
  } catch (error) {
    console.error("Error fetching address data:", error);
  }
};

watch(transactionStore.detailTransaction, (newValue, oldValue) => {
  if (newValue) {
    addressUser(transactionStore.detailTransaction.address);
  }
});
console.log(addressUserN.value);

// HANDLE
const handlePembayaran = () => {
  Toast({ icon: "success", text: "Transaksi Berhasil Dibayar" });
  window.location.href = `${transactionStore.detailTransaction?.payment[0]?.checkoutUrl}`;
};

// console.log(transactionStore.detailTransaction);
// console.log(transactionStore.detailTransaction?.payment[0].checkoutUrl);
</script>

<template>
  <div class="min-h-screen">
    <div class="flex max-w-7xl flex-col mx-auto gap-8 items-center">
      <div class="max-w-7xl w-full p-6 pb-12 border-b-gray-300 border-b-2">
        <h1 class="mb-4 text-2xl font-bold flex items-center gap-4">
          <span> <i class="fa fa-address-card" aria-hidden="true"></i></span
          >Alamat Pengiriman
        </h1>
        <div class="flex">
          <div class="w-[30%]">
            <h2 class="font-semibold">
              {{ transactionStore.detailTransaction?.address?.name }}
            </h2>
            <h3 class="font-semibold">
              {{ transactionStore.detailTransaction?.address?.phone }}
            </h3>
          </div>
          <h1 class="w-[70%]">
            <h1 class="">
              {{ transactionStore.detailTransaction?.address?.street }}
              {{ transactionStore.detailTransaction?.address?.postalCode }}
            </h1>
          </h1>
        </div>
      </div>
      <div class="max-w-7xl w-full p-6">
        <div class="text-2xl font-bold">
          <i class="fas fa-shopping-cart mr-4"></i> Produk dipesan
        </div>
        <div class="p-10">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" class="px-16 w-96 py-4">Books</th>
                        <th scope="col" class="px-6 py-4">Quantity</th>
                        <th scope="col" class="px-6 py-4">Total Price</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="product in transactionStore.detailTransaction
                        ?.details"
                      :key="product?.id"
                    >
                      <tr
                        class="mb-4 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td
                          class="whitespace-nowrap px-6 w-[600px] py-4 font-medium flex items-center gap-4"
                        >
                          <img
                            class="h-[100px]"
                            :src="product?.product?.thumbnail"
                          />
                          <div class="flex-col">
                            <p class="font-bold mb-3">
                              {{
                                product?.product?.name.length > 30
                                  ? product?.product?.name.slice(0, 30) + "..."
                                  : product?.product?.name
                              }}
                            </p>
                            <p class="font-semibold">
                              Rp
                              {{
                                product?.product?.price.toLocaleString("id-ID")
                              }}
                            </p>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <span class="ml-3 mr-3 font-bold">
                            {{ product?.quantity }}
                          </span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <p class="font-bold">
                            Rp
                            {{
                              (
                                product?.quantity * product?.product?.price
                              )?.toLocaleString("id-ID")
                            }}
                          </p>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <h1 class="mb-12 text-2xl font-bold">
            <i class="fas fa-truck mr-4"></i><span>Pengiriman</span>
          </h1>

          <div class="w-full px-10 flex justify-between">
            <!-- Kotak Pertama (40%) -->
            <div class="w-60">
              <img :src="transactionStore.detailTransaction?.courier?.image" />
            </div>

            <!-- Kotak Kedua (60%) -->
            <div class="w-60 pl-16 flex flex-col">
              <div>
                <h1>Shipping Cost :</h1>
                <h1 class="font-bold">
                  Rp.
                  {{
                    transactionStore.detailTransaction?.shippingCost?.toLocaleString(
                      "id-ID"
                    )
                  }}
                </h1>
              </div>
              <div class="mt-4">
                <h1>Subtotal:</h1>
                <h1 class="font-bold">
                  Rp.
                  {{
                    transactionStore.detailTransaction?.total?.toLocaleString(
                      "id-ID"
                    )
                  }}
                </h1>
              </div>
              <div class="mt-8">
                <button @click="handlePembayaran" class="btn btn-warning">
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
