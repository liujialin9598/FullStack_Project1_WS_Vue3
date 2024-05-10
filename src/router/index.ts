import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/pages/Welcome/welcome.vue";
import Simulationone from "@/pages/Workspace/SimulationOne/simulationone.vue";
import simulationtwo from "@/pages/Workspace/SimulationTwo/simulationtwo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "welcome",
      path: "/",
      component: Welcome,
    },
    {
      name: "simulationone",
      path: "/Sone",
      component: Simulationone,
    },
    {
      name: "simulationtwo",
      path: "/Stwo",
      component: simulationtwo,
    },
  ],
});
export default router;
