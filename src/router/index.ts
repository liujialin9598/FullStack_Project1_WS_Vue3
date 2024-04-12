import M1S1 from "@/pages/Simulation1/m1s1/M1S1.vue";
import M1S2 from "@/pages/Simulation1/M1S2.vue";
import M2S1 from "@/pages/Simulation1/M2S1.vue";
import M2S2 from "@/pages/Simulation1/M2S2.vue";

import { createRouter, createWebHistory } from "vue-router";
import Formm1s1 from "@/pages/Simulation1/m1s1/formm1s1.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/m1s1",
      component: Formm1s1,
      children: [
        {
          path: "result",
          component: M1S1,
        },
      ],
    },
    {
      path: "/m1s2",
      component: M1S2,
    },
    {
      path: "/m2s1",
      component: M2S1,
    },
    {
      path: "/m2s2",
      component: M2S2,
    },
  ],
});
export default router;
