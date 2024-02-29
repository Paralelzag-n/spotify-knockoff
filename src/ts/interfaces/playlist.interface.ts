import { EMediaCategory } from "../enums/media.enum";

export interface IPlaylist {
  name: string;
  img?: string;
  numOfSongs?: number;
  category: EMediaCategory;
  playing: boolean;
  songs?: string[];
}
