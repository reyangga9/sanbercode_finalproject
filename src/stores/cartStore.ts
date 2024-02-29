import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./authStore";

const API_URL = import.meta.env.VITE_API_URL;

export const useCartStore = defineStore("cart", () => {
  const carts: any = ref([]);
  const authStore = useAuthStore();
  const couriers: any = ref([]);
  const shipping: any = ref([]);

  const { user } = storeToRefs(authStore);
  const addresses: any = ref([]);

  const fetchShippingPrice = async (id: any) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/shipping/cost?addressId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        }
      );

      shipping.value = data.data;
      console.log(shipping.value);
    } catch (error) {
      console.error("Error fetching Shipping:", error);
      throw error;
    }
  };

  const fetchAddress = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/address/user`, {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      });

      addresses.value = data.data;
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  };

  const fetchCourier = async () => {
    const { data } = await axios.get(`${API_URL}/shipping/couriers`);
    couriers.value = data.data;
  };

  const fetchCarts = async () => {
    const { data } = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${user.value.token}` },
    });
    carts.value = data.data;
  };

  const addCart = async (productId: any, quantity: any) => {
    await axios.post(
      `${API_URL}/cart`,
      { productId: productId, quantity: quantity },
      { headers: { Authorization: `Bearer ${user.value.token}` } }
    );
  };

  const removeProductFromCart = async (test: any) => {
    try {
      const body = {
        productId: test,
        quantity: 0,
      };

      await axios.put(`${API_URL}/cart/`, {
        body,
        headers: { Authorization: `Bearer ${user.value.token}` },
      });

      console.log("Data berhasil terhapus");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // const incrementProduct = async (productId: any) => {};

  return {
    carts,
    addCart,
    fetchCarts,
    // incrementProduct,
    removeProductFromCart,
    fetchCourier,
    couriers,
    fetchAddress,
    addresses,
    shipping,
    fetchShippingPrice,
  };
});
