export interface IPlaylistState {
  playlists: IPlaylist[];
}

export interface IPlaylist {
  id: string;
  name: string;
  thumbnail: string;
  owner: string;
}
