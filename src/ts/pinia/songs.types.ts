export interface ISongState {
  songs: ISong[];
}

export interface ISong {
  id: string;
  name: string;
  thumbnail: string;
  author: string;
  playlistId: string[];
}
