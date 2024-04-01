import { createRouter, createWebHistory } from "vue-router";
import authGuard, { guestGuard } from "../middleware/auth.middleware.ts";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

// Auth Forms
const SignInForm = () => import("../components/auth/SignInFormComponent.vue");
const SignUpForm = () => import("../components/auth/SignUpFormComponent.vue");
// Home partials
const viewHome = () => import("../partials/Main-Partials/TheHomePartial.vue");
const viewArtist = () =>
  import("../partials/Main-Partials/TheArtistArtist.vue");
const viewNotifications = () =>
  import("../partials/Main-Partials/TheNotificationsPartial.vue");
const viewPlaylist = () =>
  import("../partials/Main-Partials/ThePlaylistPartial.vue");
const viewPlaylists = () =>
  import("../partials/Main-Partials/ThePlaylistCollectionPartial.vue");
const viewProfile = () =>
  import("../partials/Main-Partials/TheProfilePartial.vue");
const viewSearch = () =>
  import("../partials/Main-Partials/TheSearchPartial.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      beforeEnter: [authGuard],
      component: homeView,
      children: [
        { path: "home", name: "home", component: viewHome },
        { path: "artist", name: "artist", component: viewArtist },
        {
          path: "notifications",
          name: "notifications",
          component: viewNotifications,
        },
        { path: "playlist/:id", name: "playlist", component: viewPlaylist },
        {
          path: "playlists/:id",
          name: "playlists",
          component: viewPlaylists,
        },
        { path: "profile", name: "profile", component: viewProfile },
        { path: "search", name: "search", component: viewSearch },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: authView,
      beforeEnter: [guestGuard],
      children: [
        { path: "sign-in", name: "sign-in", component: SignInForm },
        { path: "sign-up", name: "sign-up", component: SignUpForm },
      ],
    },
  ],
});

export default router;
