import { defineStore } from "pinia";
import { IPlaylist, IPlaylistState } from "../ts/pinia/playlist.types.ts";

export const usePlaylistsStore = defineStore("playlists", {
  state: (): IPlaylistState => ({
    playlists: [
      {
        id: "1",
        name: "Liked songs",
        thumbnail:
          "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg",
        owner: "User",
      },
      {
        id: "2",
        name: "Your top songs 2023",
        thumbnail:
          "https://i1.sndcdn.com/artworks-zrXmAkcpnAgvp01C-B9Zohw-t500x500.jpg",
        owner: "User",
      },
      {
        id: "3",
        name: "Lofi Japan",
        thumbnail:
          "https://pics.craiyon.com/2023-10-16/13ee9c1c9d7f45688dc945024fca423a.webp",
        owner: "User",
      },
      {
        id: "4",
        name: "Phonk Brazil",
        thumbnail:
          "https://cdns-images.dzcdn.net/images/cover/63b133dc01108ad55426a16e08ad7746/264x264.jpg",
        owner: "User",
      },
      {
        id: "5",
        name: "K-Pop Vibes",
        thumbnail:
          "https://i1.sndcdn.com/artworks-oIHfSPs2SgbwxhUn-Yi2Kag-t500x500.jpg",
        owner: "User",
      },
      {
        id: "6",
        name: "Real...",
        thumbnail:
          "https://i1.sndcdn.com/artworks-NtzLfGlZKuHRHQeo-cIPFIw-t500x500.jpg",
        owner: "User",
      },
      {
        id: "7",
        name: "3 AM Music",
        thumbnail:
          "https://media1.tenor.com/m/x8TEZ2nemjMAAAAC/waking-up-cat.gif",
        owner: "User",
      },
      {
        id: "8",
        name: "Workout Mix",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        owner: "User",
      },
    ],
  }),

  getters: {
    getPlaylistById: (state: IPlaylistState) => {
      return (playlistId: string) =>
        state.playlists.find(
          (playlist: IPlaylist) => playlist.id === playlistId,
        );
    },
    getAllPlaylists: (state: IPlaylistState) => {
      return state.playlists;
    },
  },
});
