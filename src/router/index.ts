import { createRouter, createWebHistory } from "vue-router";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

const SignInComponent = () =>
  import("../components/auth/SignInFormComponent.vue");
const SignUpComponent = () =>
  import("../components/auth/SignUpFormComponent.vue");

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
      children: [
        {
          path: "sign-in",
          name: "sign-in",
          component: SignInComponent,
        },
        {
          path: "sign-up",
          name: "sign-up",
          component: SignUpComponent,
        },
      ],
    },
  ],
});

export default router;
