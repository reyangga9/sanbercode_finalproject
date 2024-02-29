import RegisterView from "../views/auth/RegisterView.vue";
import LoginView from '../views/auth/LoginView.vue'

const authRoutes = [
   {
      path: "/register",
      name: "register",
      component: RegisterView,
   },
   {
      path: "/login",
      name: "login",
      component: LoginView,
   },
]

export default authRoutes;
