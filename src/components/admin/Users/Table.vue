<script setup lang="ts">
import { ref, computed, Ref } from "vue";

interface User {
  // Define your book properties here

  id: number;
  photo: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  is_verified: string;

  // Add more properties as needed
}
const initial_users: User[] = [
  {
    id: 1,
    photo: "https://example.com/photos/123456789.jpg",
    name: "John Doe",
    role: "admin",
    phone: "+1234567890",
    email: "john.doe@example.com",
    is_verified: "Yes",
  },
  {
    id: 2,
    photo: "https://example.com/photos/987654321.jpg",
    name: "Jane Smith",
    role: "user",
    phone: "+1987654321",
    email: "jane.smith@example.com",
    is_verified: "No",
  },
  {
    id: 3,
    photo: "https://example.com/photos/456789123.jpg",
    name: "Alice Johnson",
    role: "admin",
    phone: "+1122334455",
    email: "alice.johnson@example.com",
    is_verified: "Yes",
  },
  {
    id: 4,
    photo: "https://example.com/photos/789123456.jpg",
    name: "Bob Anderson",
    role: "user",
    phone: "+9988776655",
    email: "bob.anderson@example.com",
    is_verified: "No",
  },
  {
    id: 5,
    photo: "https://example.com/photos/321654987.jpg",
    name: "Emily Brown",
    role: "admin",
    phone: "+5544332211",
    email: "emily.brown@example.com",
    is_verified: "Yes",
  },
  {
    id: 6,
    photo: "https://example.com/photos/654987321.jpg",
    name: "Michael Taylor",
    role: "user",
    phone: "+6677889900",
    email: "michael.taylor@example.com",
    is_verified: "No",
  },
];

console.log(initial_users);

const users: Ref<User[]> = ref(initial_users);

const currentPage: Ref<number> = ref(1);
const pageSize: number = 4;

const totalPages: Ref<number> = computed(() =>
  Math.ceil(users.value.length / pageSize)
);

const paginatedUsers: Ref<User[]> = computed(() => {
  const startIndex: number = (currentPage.value - 1) * pageSize;
  const endIndex: number = startIndex + pageSize;
  console.log(currentPage.value);
  return users.value.slice(startIndex, endIndex);
});

const nextPage: () => void = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage: () => void = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div
    class="relative overflow-auto shadow-md flex flex-1 flex-col md:flex-row lg:flex-row mx-2"
  >
    <div class="mb-2 border-solid border-gray-300 rounded border shadow-sm">
      <div
        class="bg-gray-200 text-accent-content font-bold text-lg px-2 py-3 border-solid border-gray-200 border-b"
      >
        Users
      </div>
      <div class="p-5">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-100 border-collapse border border-gray-200 dark:border-gray-700"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
          >
            <tr>
              <th
                scope="col"
                class="px-2 py-3 border text-center border-gray-200 dark:border-gray-700"
              >
                Id
              </th>
              <th
                scope="col"
                class="px-6 w-64 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                photo
              </th>
              <th
                scope="col"
                class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                name
              </th>
              <th
                scope="col"
                class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                role
              </th>
              <th
                scope="col"
                class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                Phone
              </th>
              <th
                scope="col"
                class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                is_verified
              </th>

              <th
                scope="col"
                class="px-6 py-3 w-48 border text-center text-accent-content font-bold border-gray-200 dark:border-gray-700"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:text-gray-100 dark:bg-gray-500 dark:border-gray-700"
              v-for="(item, index) in paginatedUsers"
              :key="index"
            >
              <th
                scope="row"
                class="px-2 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white border border-gray-200 dark:border-gray-700"
              >
                {{ item.id }}
              </th>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700 mx-auto"
              >
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
              </td>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700"
              >
                {{ item.name }}
              </td>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700"
              >
                {{ item.role }}
              </td>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700"
              >
                {{ item.phone }}
              </td>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700"
              >
                {{ item.email }}
              </td>
              <td
                class="px-6 text-accent-content py-4 border text-center text-lg border-gray-200 dark:border-gray-700"
              >
                {{ item.is_verified }}
              </td>

              <td
                class="px-6 flex py-4 items-center text-center flex-row text-lg"
              >
                <button type="button" class="btn w-16 mr-3 btn-info">
                  Edit
                </button>
                <button type="button" class="btn w-16 btn-error">Delete</button>
              </td>
            </tr>
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
  </div>
</template>

<script lang="ts">
export default {
  name: "TableUsers",
};
</script>
