import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/pages/Welcome/welcome.vue";
import Simulationone from "@/pages/Workspace/SimulationOne/simulationone.vue";
import simulationtwo from "@/pages/Workspace/SimulationTwo/simulationtwo.vue";
import login from "@/pages/login/login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
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
    {
      name: "Login",
      path: "/Login",
      component: login,
    },
  ],
});

// 设置路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = checkIfUserIsLoggedIn(); // 这是一个用来检查用户是否已登录的函数，你需要根据你的实际情况来实现它

  if (to.name !== "Login" && !isLoggedIn) {
    // 如果用户未登录且不是访问登录页，则重定向到登录页
    next({ name: "Login" });
  } else {
    // 否则，允许访问
    next();
  }
});

function checkIfUserIsLoggedIn() {
  // 检查本地存储中是否存在用户信息或者其他标志来判断用户是否已经登录
  const userData = localStorage.getItem("isLoggedIn");

  // 如果本地存储中存在用户信息，则认为用户已经登录
  return userData !== null;
}

export default router;
