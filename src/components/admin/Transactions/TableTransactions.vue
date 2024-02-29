<script setup lang="ts">
import axios from "axios";
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/authStore";
import { storeToRefs } from "pinia";
import { API_URL } from "../../../utils";
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const router = useRouter();
const idNow: Ref<number> = ref(1);

const nextPage: () => void = () => {
  idNow.value++;
  // fetchTransactions(idNow.value);
};

const previousPage: () => void = () => {
  if (idNow.value > 1) {
    idNow.value--;
    // fetchTransactions(idNow.value);
  }
};

const handleJumpDetail: (id: string) => void = (id) => {
  router.push(`/admin/books/detail/${id}`);
};

const handleJumpEdit: (id: number) => void = (id) => {
  router.push(`/admin/books/edit/${id}`);
};
function formatPrice(price: number) {
  // Convert the price to a number
  price = Number(price);

  // Check if the price is greater than or equal to 1000
  if (price >= 1000) {
    // Convert the price to a string and add separators
    return "Rp " + price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  } else {
    // Return the price with the currency symbol
    return "Rp " + price.toFixed(0);
  }
}
</script>

<template>
  <div
    class="mb-2 border-solid bg-white border-gray-300 rounded border shadow-sm"
  >
    <div
      class="text-accent-content font-bold text-lg p-8 border-solid border-gray-200 border-b"
    >
      Table Transaction
    </div>
    <div
      class="p-5 relative overflow-auto flex flex-1 flex-col md:flex-row lg:flex-row mx-2"
    >
      <table class="table">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th
              scope="col"
              class="px-2 py-3 border text-center border-gray-200 dark:border-gray-700"
            >
              user
            </th>
            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Courier
            </th>
            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Address Id
            </th>

            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Total
            </th>
            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Shipping Cost
            </th>

            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Status
            </th>

            <th
              scope="col"
              class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr
            class="bg-white border-b dark:text-gray-100 dark:bg-gray-500 dark:border-gray-700"
            v-for="(item, index) in books"
            :key="index"
          >
            <th
              scope="row"
              class="px-2 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white border border-gray-200 dark:border-gray-700"
            >
              <div class="avatar">
                <div class="w-12">
                  <img :src="item.thumbnail" :alt="item.name" />
                </div>
              </div>
            </th>
            <td
              class="px-4 py-3 text-accent-content border text-center text-sm border-gray-200 dark:border-gray-700"
            >
              {{
                item.name.length > 30
                  ? item.name.slice(0, 30) + "..."
                  : item.name
              }}
            </td>
            <td
              class="px-4 py-3 text-accent-content border text-center text-sm border-gray-200 dark:border-gray-700"
            >
              {{ formatPrice(item.price) }}
            </td>

            <td
              class="px-4 py-3 text-accent-content border text-center text-sm border-gray-200 dark:border-gray-700"
            >
              {{ item.stock }}
            </td>
            <td
              class="px-4 py-3 text-accent-content border text-center text-sm border-gray-200 dark:border-gray-700"
            >
              {{ item.language }}
            </td>

            <td
              class="px-4 py-3 text-accent-content border text-center text-sm border-gray-200 dark:border-gray-700"
            >
              {{ item.publisher }}
            </td>

            <td class="px-6 flex item-scenter gap-3 py-4 text-center text-lg">
              <button
                type="button"
                @click="handleJumpDetail(item.slug)"
                class="btn btn-square flex-row w-12"
              >
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 442.04 442.04"
                  xml:space="preserve"
                  width="30px"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path
                          d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"
                        ></path>
                      </g>
                      <g>
                        <path
                          d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"
                        ></path>
                      </g>
                      <g>
                        <path
                          d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
              <button type="button" class="btn w-12 btn-square btn-info">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </button>
              <button type="button" class="btn w-12 btn-square btn-error">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M19 9H22M19 14H22M19 19H21M16 6L15.1991 18.0129C15.129 19.065 15.0939 19.5911 14.8667 19.99C14.6666 20.3412 14.3648 20.6235 14.0011 20.7998C13.588 21 13.0607 21 12.0062 21H7.99377C6.93927 21 6.41202 21 5.99889 20.7998C5.63517 20.6235 5.33339 20.3412 5.13332 19.99C4.90607 19.5911 4.871 19.065 4.80086 18.0129L4 6M2 6H18M14 6L13.7294 5.18807C13.4671 4.40125 13.3359 4.00784 13.0927 3.71698C12.8779 3.46013 12.6021 3.26132 12.2905 3.13878C11.9376 3 11.523 3 10.6936 3H9.30643C8.47705 3 8.06236 3 7.70951 3.13878C7.39792 3.26132 7.12208 3.46013 6.90729 3.71698C6.66405 4.00784 6.53292 4.40125 6.27064 5.18807L6 6M12 10V17M8 10L7.99995 16.9998"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </button>
            </td>
          </tr> -->
        </tbody>
        <!-- <tbody v-else>
        <tr>
          <td
            colspan="7"
            class="px-2 py-4 font-medium text-center text-gray-900 whitespace-nowrap bg-white border dark:text-black dark:bg-gray-300 border-gray-200 dark:border-gray-700"
          >
            Data tidak tersedia.
          </td>
        </tr>
      </tbody> -->
      </table>
    </div>
    <div class="p-5 join flex mx-auto max-w-sm justify-center gap-4 w-full">
      <button @click="previousPage" class="join-item btn btn-outline w-36">
        Previous page
      </button>
      <button @click="nextPage" class="join-item btn btn-outline w-36">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TableBooks",
};
</script>
