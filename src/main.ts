import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";

import "sweetalert2/src/sweetalert2.scss";

// const app = createApp(App);
// const pinia = createPinia();

// app.use(router);
// pinia.use(({ store }) => {
//   store.$router = markRaw(router);
// });

// app.mount("#app");

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(router);
app.use(pinia);
app.mount("#app");
