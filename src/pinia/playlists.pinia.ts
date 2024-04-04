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
        thumbnailAverageColor: "#5747a9",
        owner: "User",
      },
      {
        id: "2",
        name: "Your top songs 2023",
        thumbnail:
          "https://i1.sndcdn.com/artworks-zrXmAkcpnAgvp01C-B9Zohw-t500x500.jpg",
        thumbnailAverageColor: "#afb1fe",
        owner: "User",
      },
      {
        id: "3",
        name: "Lofi Japan",
        thumbnail:
          "https://pics.craiyon.com/2023-10-16/13ee9c1c9d7f45688dc945024fca423a.webp",
        thumbnailAverageColor: "#077eaa",
        owner: "User",
      },
      {
        id: "4",
        name: "Phonk Brazil",
        thumbnail:
          "https://cdns-images.dzcdn.net/images/cover/63b133dc01108ad55426a16e08ad7746/264x264.jpg",
        thumbnailAverageColor: "#ed34f3",
        owner: "User",
      },
      {
        id: "5",
        name: "K-Pop Vibes",
        thumbnail:
          "https://i1.sndcdn.com/artworks-oIHfSPs2SgbwxhUn-Yi2Kag-t500x500.jpg",
        thumbnailAverageColor: "#f5f6f4",
        owner: "User",
      },
      {
        id: "6",
        name: "Real...",
        thumbnail:
          "https://i1.sndcdn.com/artworks-NtzLfGlZKuHRHQeo-cIPFIw-t500x500.jpg",
        thumbnailAverageColor: "#5c0348",
        owner: "User",
      },
      {
        id: "7",
        name: "3 AM Music",
        thumbnail:
          "https://us-tuna-sounds-images.voicemod.net/67fe01e4-a5bc-4ef6-a37e-526dfac29fd9-1678917807993.jpeg",
        thumbnailAverageColor: "#7e7846",
        owner: "User",
      },
      {
        id: "8",
        name: "Workout Mix",
        thumbnail:
          "https://images.nightcafe.studio/jobs/fvnNsfeMVtTqcHwGIoyX/fvnNsfeMVtTqcHwGIoyX--1--85xo1.jpg?tr=w-1600,c-at_max",
        thumbnailAverageColor: "#8f9b7c",
        owner: "User",
      },
    ],
  }),

  getters: {
    getPlaylistById:
      (state: IPlaylistState) =>
      (playlistId: string): IPlaylist | null => {
        return (
          state.playlists.find(
            (playlist: IPlaylist) => playlist.id === playlistId,
          ) ?? null
        );
      },
    getAllPlaylists: (state: IPlaylistState): IPlaylist[] => {
      return state.playlists;
    },
  },
});
