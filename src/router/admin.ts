// adminRoutes.js
import Dashboard from "../views/admin/Dashboard.vue";
// import Login from "../views/admin/Login.vue";
import Books from "../views/admin/Books.vue";
import Transactions from "../views/admin/Transaction.vue";
import Users from "../views/admin/User.vue";
import Profile from "../views/admin/Profile.vue";
import FormBook from "../components/admin/Books/Form.vue";
import DetailBook from "../components/admin/Books/DetailBook.vue";
import FormTransaction from "../components/admin/Transactions/Form.vue";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    name: "Admindashboard",
    component: Dashboard,
  },
  // {
  //   path: "/admin/login",
  //   name: "login",
  //   component: Login,
  // },
  {
    path: "/admin/profile",
    name: "Adminprofile",
    component: Profile,
  },
  {
    path: "/admin/books",
    name: "Adminbooks",
    component: Books,
  },
  {
    path: "/admin/books/create",
    name: "Adminformbook",
    component: FormBook,
  },
  {
    path: "/admin/books/edit/:id",
    name: "Adminformbookedit",
    component: FormBook,
  },
  {
    path: "/admin/books/detail/:id",
    name: "Admindetailbook",
    component: DetailBook,
  },
  // {
  //   path: "/admin/transactions",
  //   name: "Admintransactions",
  //   component: Transactions,
  // },
  // {
  //   path: "/admin/transactions/create",
  //   name: "Adminformtransaction",
  //   component: FormTransaction,
  // },
  // {
  //   path: "/admin/users",
  //   name: "Adminusers",
  //   component: Users,
  // },
];

export default adminRoutes;
