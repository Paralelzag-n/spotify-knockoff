import { createRouter, createWebHistory } from "vue-router";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: homeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: authView,
    },
  ],
});

export default router;
