import CartView from "../views/user/CartView.vue";
import Transaction from "../views/user/Transaction.vue";
import DetailTransaction from "../views/user/DetailTransaction.vue";

const userRoutes = [
  {
    path: "/user/carts",
    name: "carts",
    meta: { requiresAuth: true },
    component: CartView,
  },
  {
    path: "/user/transactions",
    name: "transactions",
    meta: { requiresAuth: true },
    component: Transaction,
  },
  {
    path: "/user/transactions/:id",
    name: "userDetailTransaction",
    meta: { requiresAuth: true },
    component: DetailTransaction,
  },
];

export default userRoutes;
