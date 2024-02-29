import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "../views/LandingPageView.vue";
import LoginView from "../views/auth/LoginView.vue";
import DetailBookView from "../views/book/DetailBookView.vue";
import adminRoutes from "./admin";
import authRoutes from "./auth";
import Books from "../views/book/Books.vue";
import userRoutes from "./user";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin.vue";
import MainLayoutGuest from "../layouts/MainLayoutGuest.vue";
import unAuthorized from "../layouts/UnAuthorized.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayoutGuest,
      children: [
        {
          path: "/",
          name: "home",
          component: LandingPageView,
        },
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/products",
          name: "books",
          component: Books,
        },
        {
          path: "/products/:id",
          name: "book-detail",
          component: DetailBookView,
        },
        ...userRoutes,
        ...authRoutes,
      ],
    },
    {
      path: "/unauthorized",
      name: "UnAuthorized",
      component: unAuthorized,
    },

    {
      path: "/admin/",
      meta: { requiresAuth: true, isAdmin: true },
      component: MainLayoutAdmin,
      children: [...adminRoutes],
    },
  ],
});
router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth) {
    const tokenString = localStorage.getItem("user");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      if (to.meta.isAdmin && token.role === "ADMIN") {
        next();
      } else if (!to.meta.isAdmin && token.role !== "ADMIN") {
        next();
      } else {
        router.push("/unauthorized");
      }
    } else {
      // User is not authenticated, redirect to login
      router.push("/login");
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router;
