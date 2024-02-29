<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../../stores/authStore'
import { API_URL } from '../../utils'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore);

const showAddAddressForm = ref(false);
const provinces = ref([])
const districts = ref([])
const subDistricts = ref([]);
const userAddress = ref(null);

const toggleForm = () => showAddAddressForm.value = !showAddAddressForm.value

const name = ref('')
const street = ref('')
const postalCode = ref(null)
const phone = ref('')
const subdistrictId = ref<null>(null)
const districtId = ref<null>(null)
const provinceId = ref<null>(null);

const fetchDistrict = async () => {
   const { data } = await axios.get(`${API_URL}/address?provinceId=${provinceId.value}`);
   districts.value = data.data
}

const fetchAddress = async () => {
   const { data } = await axios.get(`${API_URL}/address`);
   provinces.value = data.data;
}

const fetchSubDistrict = async () => {
   const { data } = await axios.get(`${API_URL}/address?provinceId=${provinceId.value}&districtId=${districtId.value}`);
   subDistricts.value = data.data
}

const handleSubmitAddress = async () => {
   const { data } = await axios.post(`${API_URL}/address/user`, {
      name: name.value,
      street: street.value,
      provinceId: parseInt(provinceId.value),
      districtId: parseInt(districtId.value),
      subdistrictId: parseInt(subdistrictId.value),
      postalCode: parseInt(postalCode.value),
      phone: phone.value,
   }, {
      headers: {
         'Authorization': `Bearer ${user.value.token}`
      }
   }
   )

   if (data.status === 'success') {
      fetchUserAddress()
      showAddAddressForm.value = false;
   }
}

const fetchUserAddress = async () => {
   const { data } = await axios.get(`${API_URL}/address/user`, { headers: { 'Authorization': `Bearer ${user.value.token}` } })
   userAddress.value = data.data
}

fetchAddress();
fetchUserAddress()
</script>

<template>
   <section class="grid grid-cols-12 pl-[200px] pr-[200px] gap-10">

      <div class="col-span-7 card shadow pb-10 pt-10 pl-5 pr-5">
         <form v-if="showAddAddressForm" class="mt-4" @submit.prevent="handleSubmitAddress">
            <h4 class="text-center text-2xl mb-10">TambaH Alamat Pengiriman</h4>
            <div class="relative z-0 w-full mb-5 group">
               <input type="text" v-model="name" id="floating_repeat_password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " required />
               <label for="floating_repeat_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
               <div class="relative z-0 w-full mb-5 group">
                  <input type="text" v-model="phone" name="floating_phone" id="floating_phone"
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required />
                  <label for="floating_phone"
                     class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nomor
                     HP</label>
               </div>
               <div class="relative z-0 w-full mb-5 group">
                  <input type="tel" v-model="postalCode" name="floating_phone" id="floating_phone"
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required />
                  <label for="floating_phone"
                     class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kode
                     Pos</label>
               </div>
            </div>

            <div class="grid">
               <div class="relative z-0 w-full mb-5 group">
                  <input type="text" v-model="street" name="floating_phone" id="floating_phone"
                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required />
                  <label for="floating_phone"
                     class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Alamat
                     Jalan</label>
               </div>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6 mb-6">
               <div>
                  <label class="text-sm mb-3">Provinsi</label>
                  <select class="select select-bordered select-sm w-full max-w-xs" @change="fetchDistrict"
                     v-model="provinceId">
                     <option disabled selected>-- Pilih Provinsi --</option>
                     <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}
                     </option>
                  </select>
               </div>

               <div>
                  <label class="text-sm mb-3">Kabupaten/Kota</label>
                  <select class="select select-bordered select-sm w-full max-w-xs" v-model="districtId"
                     @change="fetchSubDistrict">
                     <option disabled selected>-- Pilih Sub Provinsi</option>
                     <option v-if="districts.length" v-for="district in districts" :value="district.id" :key="district.id">
                        {{ district.name }}
                     </option>
                  </select>
               </div>
               <div>
                  <label class="text-sm mb-3">Kecamatan/Kelurahan</label>
                  <select class="select select-bordered select-sm w-full max-w-xs" v-model="subdistrictId">
                     <option disabled selected>-- Pilih Kecamatan atau Kabupaten --</option>
                     <option v-if="subDistricts.length" v-for="subDistrict in subDistricts" :key="subDistrict.id"
                        :value="subDistrict.id">{{ subDistrict.name }}</option>
                  </select>
               </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
               <button type="button" class="btn btn-square w-full" @click="toggleForm">Cancel</button>
               <button type="submit" class="btn btn-square w-full">Submit</button>
            </div>
         </form>
         <div v-else>
            <p>Alamat tujuan pengiriman</p>
            <p>{{ userAddress }}</p>
            <button class="btn btn-outline btn-secondary w-56 mt-10" @click="toggleForm">Buat Alamat
               Pengiriman</button>
         </div>
      </div>

      <div class="col-span-5 card shadow">
         <h4>Rincian Belanja</h4>
      </div>
   </section>
</template>