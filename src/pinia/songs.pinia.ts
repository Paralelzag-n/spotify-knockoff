import { defineStore } from "pinia";
import { ISong, ISongState } from "../ts/pinia/songs.types";

export const useSongStore = defineStore("playlists", {
  state: (): ISongState => ({
    songs: [
      {
        id: "1",
        name: "Suck a nigga dick",
        thumbnail:
          "https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "3", "6"],
      },
      {
        id: "2",
        name: "Hell nah",
        thumbnail:
          "https://i1.sndcdn.com/artworks-zrXmAkcpnAgvp01C-B9Zohw-t500x500.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "4"],
      },
      {
        id: "3",
        name: "Lofi Beat",
        thumbnail:
          "https://pics.craiyon.com/2023-10-16/13ee9c1c9d7f45688dc945024fca423a.webp",
        author: "Unknown",
        playlistId: ["1", "2", "8", "7"],
      },
      {
        id: "4",
        name: "Phonk",
        thumbnail:
          "https://cdns-images.dzcdn.net/images/cover/63b133dc01108ad55426a16e08ad7746/264x264.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "3"],
      },
      {
        id: "5",
        name: "K-Pop Vibes",
        thumbnail:
          "https://i1.sndcdn.com/artworks-oIHfSPs2SgbwxhUn-Yi2Kag-t500x500.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8"],
      },
      {
        id: "6",
        name: "Tangelo",
        thumbnail:
          "https://i1.sndcdn.com/artworks-NtzLfGlZKuHRHQeo-cIPFIw-t500x500.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8"],
      },
      {
        id: "7",
        name: "Angel in the dark",
        thumbnail:
          "https://media1.tenor.com/m/x8TEZ2nemjMAAAAC/waking-up-cat.gif",
        author: "Unknown",
        playlistId: ["1", "2", "8"],
      },
      {
        id: "8",
        name: "Green noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "7"],
      },
      {
        id: "9",
        name: "blue noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "7"],
      },
      {
        id: "10",
        name: "pink noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "7"],
      },
      {
        id: "11",
        name: "hazel noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["1", "2", "8", "7"],
      },
      {
        id: "12",
        name: "violet noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["3", "2", "4", "6"],
      },
      {
        id: "13",
        name: "red noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["5", "4", "8", "6"],
      },
      {
        id: "14",
        name: "yellow noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["4", "2", "5", "7"],
      },
      {
        id: "15",
        name: "orange noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["3", "2", "6", "7"],
      },
      {
        id: "16",
        name: "peach noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["4", "8", "2", "5"],
      },
      {
        id: "17",
        name: "strawberry noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["6", "2", "3", "7"],
      },
      {
        id: "18",
        name: "samsung noise",
        thumbnail:
          "https://i.pinimg.com/736x/c6/25/90/c62590c1756680060e7c38011cd704b5.jpg",
        author: "Unknown",
        playlistId: ["4", "5", "8", "7"],
      },
    ],
  }),

  getters: {
    getSongById: (state: ISongState) => {
      return (songId: string) =>
        state.songs.find((song: ISong) => song.id === songId);
    },
    getAllSongs: (state: ISongState) => {
      return state.songs;
    },
    getSongByPlaylistId: (state: ISongState) => {
      return (playlistId: string) =>
        state.songs.find((song: ISong) => song.playlistId.includes(playlistId));
    },
  },
});
