import "./assets/main.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import { createGtm } from "@gtm-support/vue-gtm";

import router from "./router";

const app = createApp(App);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(router);
app.use(
  createGtm({
    id: "GTM-PTPXKXTV",
    vueRouter: router,
  })
);
app.mount("#app");
