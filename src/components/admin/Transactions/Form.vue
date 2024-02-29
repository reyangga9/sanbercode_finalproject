<script setup lang="ts">
import NavDashboard from "../NavDashboard.vue";
</script>

<template>
  <NavDashboard />

  <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    <div>
      <div class="grid grid-flow-col auto-row grid-cols-5">
        <header
          class="flex flex-col col-start-2 col-span-3 p-10 bg-gray-100 text-center"
        >
          <h1 id="title" class="mb-2 text-4xl">Form Add Transaction</h1>
        </header>
        <section
          class="bg-base-300 col-start-2 col-span-3 mt-10 rounded-sm shadow"
        >
          <form id="survey-form" class="flex flex-col gap-6 p-5 md:p-10">
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
                  placeholder="Type here"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="flex flex-col w-full">
                <label
                  id="email-label"
                  for="email"
                  class="font-medium text-gray-600"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  required
                  class="input input-bordered w-full"
                  placeholder="john.doe@email.com"
                />
              </div>
            </div>
            <div class="flex flex-col w-full">
              <label
                id="email-label"
                for="email"
                class="font-medium text-gray-600"
                >Email</label
              >
              <input
                id="email"
                type="email"
                required
                class="input input-bordered w-full"
                placeholder="john.doe@email.com"
              />
            </div>

            <div class="flex justify-end col-start-1 col-span-3">
              <button
                id="submit"
                class="font-medium bg-gray-100 hover:bg-gray-50 py-3 px-6 rounded-md"
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
