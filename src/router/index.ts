import { createRouter, createWebHistory } from "vue-router";
import Formm1s1 from "@/pages/Simulation1/m1s1/formm1s1.vue";
import Formm2s1 from "@/pages/Simulation1/m2s1/formm2s1.vue";
import Formm1s2 from "@/pages/Simulation1/m1s2/formm1s2.vue";
import Formm2s2 from "../pages/Simulation1/m2s2/formm2s2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "m1s1",
      path: "/m1s1",
      component: Formm1s1,
    },
    {
      name: "m1s2",
      path: "/m1s2",
      component: Formm1s2,
    },
    {
      name: "m2s1",
      path: "/m2s1",
      component: Formm2s1,
    },
    {
      name: "m2s2",
      path: "/m2s2",
      component: Formm2s2,
    },
  ],
});
export default router;
