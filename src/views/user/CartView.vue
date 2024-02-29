<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../../stores/cartStore";
import { useTransactionStore } from "../../stores/transactionStore";
import { ref, watch } from "vue";
// import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const cartStore = useCartStore();
const transactionStore = useTransactionStore();
const { carts, couriers, addresses, shipping } = storeToRefs(cartStore);
const { payments } = storeToRefs(transactionStore);

const authStore = useAuthStore();

// Fetch data
if (authStore?.user) {
  cartStore.fetchCourier();
  cartStore.fetchAddress();
  transactionStore.fetchPaymentData();
  console.log(carts.value);
}

// handleData
const removeProduct = (productId: any) => {
  cartStore.removeProductFromCart(productId);
};
// const addProcutCart = (productId: any) => {
//   console.log(productId);
//   cartStore.incrementProduct(productId);
// };

const address: any = ref("");
const courier: any = ref("");
const courierType: any = ref("");
const payment: any = ref("");
const totalPriceBook: any = ref("");
// const priceShipping: any = ref("");

const dialogId = "my_modal_1";

const clickHandle = () => {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement;
  if (dialog) {
    dialog.showModal();
  }
  cartStore.fetchShippingPrice(address.value);
  console.log(shipping.value);
};

const data: any = {
  "29ed1d05-66a5-464d-8386-eddfb27b34dd": ["ECO", "REG", "ONS"],
  "50745371-2a29-4690-bf29-ac2b74c42ba3": ["OKE", "REG"],
  "b94552cd-2baf-4bed-871f-5e4aa970e9d1": ["Pos Reguler"],
  "df08e27c-7374-433f-9a56-cb9cf333cb3b": ["EZ"],
};
watch(carts, (newValue) => {
  if (Array.isArray(newValue)) {
    totalPriceBook.value = newValue.reduce(
      (total, cart) => total + cart.quantity * cart.product.price,
      0
    );
  } else {
    // Jika carts bukan array, misalnya jika hanya ada satu item
    totalPriceBook.value = carts.value.quantity * carts.value.product.price;
  }
});

const formHandleCheckout = (e: any) => {
  e.preventDefault();

  const data = {
    addressId: address.value,
    courierId: courier.value,
    courierService: courierType.value,
    paymentId: payment.value,
  };

  transactionStore.createTransaction(data);
};
</script>

<template>
  <section class="max-w-7xl mx-auto">
    <dialog :id="dialogId" class="modal">
      <div class="modal-box max-w-5xl h-screen">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="flex flex-col gap-5 max-w-5xl">
          <div
            v-for="x in shipping.ongkir"
            class="card card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img :src="x.image" class="p-4 w-24" alt="x.courier" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ x.courier }}</h2>
              <p>Services available</p>
              <div
                v-for="cost in x.cost"
                class="flex flex-col w-full justify-around"
              >
                <p>
                  {{ cost.service }} : Rp.
                  {{ cost.cost[0].value.toLocaleString("id-ID") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>

    <p class="mb-8 text-xl font-bold">
      <i class="fas fa-shopping-cart text-xl mr-5"></i> Shopping Cart
    </p>
    <div class="flex max-w-7xl justify-between">
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
                  <tbody v-for="cart in carts" :key="cart">
                    <tr
                      class="mb-4 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td
                        class="whitespace-nowrap px-6 w-96 py-4 font-medium flex items-center gap-4"
                      >
                        <img :src="cart.product?.thumbnail" class="h-[100px]" />
                        <div class="flex-col">
                          <p class="font-bold mb-3">
                            {{
                              cart.product.name.length > 30
                                ? cart.product.name.slice(0, 30) + "..."
                                : cart.product.name
                            }}
                          </p>
                          <p>
                            Rp
                            {{ cart.product.price.toLocaleString("id-ID") }}
                          </p>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <button
                          class="btn btn-circle btn-sm btn-info"
                          :disabled="cart.quantity <= 1 ? true : false"
                        >
                          -
                        </button>
                        <span class="ml-3 mr-3">{{ cart.quantity }}</span>
                        <button class="btn btn-circle btn-sm btn-info">
                          <!-- @click="addProcutCart(cart.productId)" -->
                          +
                        </button>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <p>
                          Rp
                          {{
                            (cart.quantity * cart.product.price).toLocaleString(
                              "id-ID"
                            )
                          }}
                        </p>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <i
                          class="fas fa-trash-alt cursor-pointer hover:text-red-600 text-2xl"
                          @click="removeProduct(cart.product.id)"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 w-96 rounded-xl p-4">
        <form @submit.prevent="formHandleCheckout">
          <p class="text-center text-2xl font-bold">Payment.</p>
          <div class="flex flex-col w-full mt-4">
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <select
              id="address"
              v-model="address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :key="address.id"
                v-for="address in addresses"
                :value="address.id"
              >
                {{ address.province.name }} : {{ address.street }}
              </option>
            </select>
          </div>

          <div
            class="mx-auto block w-64 p-4 my-8 btn btn-warning"
            @click="clickHandle"
          >
            Check Shipping Price
          </div>
          <div class="flex flex-col w-full mt-4">
            <label
              for="courier"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Courier
            </label>
            <select
              id="courier"
              v-model="courier"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :key="courier.id"
                v-for="courier in couriers"
                :value="courier.id"
              >
                {{ courier.name }}
              </option>
            </select>
            <label
              for="courierType"
              class="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >Tipe</label
            >
            <select
              v-if="courier.length > 0"
              v-model="courierType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                v-for="(option, index) in data[courier]"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <div class="flex flex-col w-full mt-4">
            <label
              for="payment"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Metode Pembayaran
            </label>
            <select
              id="payment"
              v-model="payment"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :key="payment.id"
                v-for="payment in payments"
                :value="payment.id"
              >
                {{ payment.name }} : {{ payment.fee }}
              </option>
            </select>
            <div class="mt-10 mb-10">
              <p>
                Total Buku : Rp {{ totalPriceBook.toLocaleString("id-ID") }}
              </p>
              <!-- <p>Ongkir : Rp {{ totalPriceBook.toLocaleString("id-ID") }}</p> -->
            </div>
            <!-- <div class="mt-10 mb-10">Sub Total :</div> -->
          </div>
          <button
            class="btn btn-outline btn-square block mt-8 btn-success mx-auto w-48"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
