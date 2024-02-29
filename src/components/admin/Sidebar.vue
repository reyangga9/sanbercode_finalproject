<script lang="ts" setup></script>
<template>
  <label for="drawer" class="drawer-overlay" aria-label="Close menu"></label>
  <!-- <aside
    id="default-sidebar"
    class="top-0 left-0 z-40 w-64 fixed h-screen transition-transform -translate-x-full sm:translate-x-0"
   
    aria-label="Sidebar"
  > -->
  <aside class="bg-blue-600 min-h-screen h-full w-64">
    <div class="h-full overflow-y-autop">
      <div
        class="text-center bg-warning text-2xl border-b-4 py-6 border-gray-700 w-full"
      >
        General
      </div>

      <ul class="space-y-2 px-3 py-4 font-medium">
        <li>
          <router-link
            to="/admin/dashboard"
            class="flex items-center text-xl p-2 text-gray-200 hover:text-black rounded-lg hover:bg-warning group"
          >
            <svg
              class="w-5 h-5 text-black transition duration-75 group-hover:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path
                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
              />
              <path
                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
              />
            </svg>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/admin/books"
            class="flex items-center text-xl p-2 text-gray-200 hover:text-black rounded-lg dark:text-white hover:bg-warning dark:hover:bg-gray-700 group"
          >
            <img
              src="https://www.svgrepo.com/show/104788/book.svg"
              width="20px"
            />
            <span class="flex-1 ms-3 whitespace-nowrap">Books</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link
            to="/admin/transactions"
            class="flex items-center text-xl p-2 text-gray-200 hover:text-black rounded-lg hover:bg-warning group"
          >
            <svg
              class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></rect>
                <path
                  d="M3 10H20.5"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M7 15H9"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Transaction</span>
          </router-link>
        </li>
           <li>
          <router-link
            to="/admin/users"
            class="flex items-center text-xl p-2 text-gray-200 hover:text-black dark:text-white rounded-lg hover:bg-warning dark:hover:bg-gray-700 group"
          >
            <img
              src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
              width="20px"
            />

            <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
          </router-link>
        </li> -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
