import { createRouter, createWebHistory } from "vue-router";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

// Home partials
const viewHome = () =>
  import("../partials/Main-Partials/HomePartial/TheHomePartial.vue");
const viewArtist = () =>
  import("../partials/Main-Partials/ArtistPartial/TheArtistArtist.vue");
const viewNotifications = () =>
  import(
    "../partials/Main-Partials/NotificationsPartial/TheNotificationsPartial.vue"
  );
const viewPlaylist = () =>
  import("../partials/Main-Partials/PlaylistPartial/ThePlaylistPartial.vue");

const viewPlaylists = () =>
  import(
    "../partials/Main-Partials/PlaylistCollectionPartial/ThePlaylistCollectionPartial.vue"
  );
const viewSearch = () =>
  import("../partials/Main-Partials/SearchPartial/TheSearchPartial.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/",
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
    },
  ],
});

export default router;
