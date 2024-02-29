import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { API_URL } from "../utils";
import axios from "axios";
import { useRouter } from "vue-router";
import Toast from "../utils/Toast";

export const useAuthStore = defineStore("auth", () => {
  const user: any = ref<object | null>(
    JSON.parse(localStorage.getItem("user")!)!
  );
  const router = useRouter();
  const config = computed(() => ({
    headers: {
      Authorization: `Bearer ${user.value.token}`,
      "Content-Type": "application/json",
    },
  }));

  const onLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (data.status === "success") {
        Toast({ icon: "success", text: data.message });
        user.value = data.data;
        localStorage.setItem("user", JSON.stringify(user.value));
        return { status: "success" };
      }
    } catch (error) {
      Toast({ icon: "error", text: "Login Failed. Pleas try again." });
    }
  };

  const onLogOut = () => {
    Toast({ icon: "info", text: "Logout Successfully" });
    localStorage.removeItem("user");
    user.value = null;
    setTimeout(() => {
      router.replace("/"); // Use router.replace instead of router.push
      location.reload(); // Refresh the page
    }, 2000);
  };

  return { onLogin, user, onLogOut, config };
});
