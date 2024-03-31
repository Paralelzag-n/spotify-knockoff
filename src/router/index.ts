import { createRouter, createWebHistory } from "vue-router";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

// Auth Forms
const SignInForm = () => import("../components/auth/SignInFormComponent.vue");
const SignOutForm = () => import("../components/auth/SignOutFormComponent.vue");
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
const viewSearch = () =>
  import("../partials/Main-Partials/TheSearchPartial.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
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
        { path: "search", name: "search", component: viewSearch },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: authView,
      children: [
        { path: "sign-in", name: "sign-in", component: SignInForm },
        { path: "sign-out", name: "sign-out", component: SignOutForm },
      ],
    },
  ],
});

export default router;
