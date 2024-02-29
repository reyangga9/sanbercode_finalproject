import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./authStore";
import Toast from "../utils/Toast";
import { useRouter } from "vue-router";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_PAYMENT = import.meta.env.VITE_API_PAYMENT;

export const useTransactionStore = defineStore("transactions", () => {
  const router = useRouter();
  const transactions: any = ref([]);
  const payments: any = ref([]);
  const detailTransaction: any = ref("");
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  const fetchTransactions = async () => {
    const { data } = await axios.get(`${API_URL}/transaction`, {
      headers: { Authorization: `Bearer ${user.value.token}` },
    });
    transactions.value = data.data;
    console.log(transactions.value);
  };

  const fetchPaymentData = async () => {
    try {
      const { data } = await axios.get(`${API_URL_PAYMENT}/payment/channel`);
      payments.value = data.data.filter(
        (payment: any) => payment.status === "ON"
      );
      // console.log(payments.value);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetailTransaction = async (id: any) => {
    try {
      const res = await axios.get(`${API_URL}/transaction/${id}`, {
        headers: { Authorization: `Bearer ${user.value.token}` },
      });

      detailTransaction.value = res.data.data;
      console.log(detailTransaction.value);
    } catch (error) {
      console.log(error);
    }
  };

  const createTransaction = async (transaction: any) => {
    const { addressId, paymentId, courierId, courierService } = transaction;

    try {
      await axios.post(
        `${API_URL}/transaction`,
        {
          addressId,
          paymentId,
          courierId,
          courierService,
        },
        {
          headers: { Authorization: `Bearer ${user.value.token}` },
        }
      );
      Toast({ icon: "success", text: "Transaksi berhasil ditambahkan " });
      setTimeout(() => {
        router.push("/user/transactions").then(() => {
          setTimeout(() => {
            location.reload(); // Menggunakan location.reload() untuk memperbarui halaman
          }, 1000);
        });
      }, 2000);
    } catch (error) {
      Toast({ icon: "error", text: "Transaksi gagal ditambahkan " });
      console.log(error);
    }
  };

  return {
    transactions,
    createTransaction,
    fetchTransactions,
    payments,
    fetchPaymentData,
    fetchDetailTransaction,
    detailTransaction,
  };
});
