import { createRouter, createWebHistory } from "vue-router";

const authView = () => import("../views/AuthView.vue");
const homeView = () => import("../views/HomeView.vue");

// Home partials
const homePartial = () =>
  import("../partials/Main-Partials/HomePartial/TheHomePartial.vue");
const homeArtist = () =>
  import("../partials/Main-Partials/ArtistPartial/TheArtistArtist.vue");
const homePlaylist = () =>
  import("../partials/Main-Partials/PlaylistPartial/ThePlaylistPartial.vue");
const searchPlaylist = () =>
  import("../partials/Main-Partials/SearchPartial/TheSearchPartial.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: homeView,
      children: [
        { path: "", name: "homePartial", component: homePartial },
        { path: "artist", name: "homeArtist", component: homeArtist },
        { path: "playlist", name: "homePlaylist", component: homePlaylist },
        { path: "search", name: "searchPlaylist", component: searchPlaylist },
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
